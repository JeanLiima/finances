import { useEffect, useState } from "react";
import { addDoc, doc, Timestamp } from "firebase/firestore";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";

import { REGISTER_TRANSACTION, RootStackParamList, TRANSACTIONS } from "@/constants/routes";
import { PAID_STATUS } from "@/constants/paid-status";
import { useTransactionsRef } from "@/hooks/use-transactions-ref";
import { TRANSACTIONS_TYPES } from "@/constants/transaction-types";
import { formatYearMonth } from "@/utils/format-to-year-month";
import { Transaction } from "@/types/transaction";

import { useAnalytics } from "../use-analytics";

const useRegisterTransaction = () => {
	const [description, setDescription] = useState<string>('');
	const [amount, setAmount] = useState<string>('');
	const [totalInstallment, setTotalInstallment] = useState<string | undefined>(undefined);
	const [categoryId, setCategoryId] = useState<string | undefined>(undefined);
	const [parentId, setParentId] = useState<string | undefined>(undefined);
	const [type, setType] = useState<TRANSACTIONS_TYPES>(TRANSACTIONS_TYPES.EXPENSE);
	const [isLoadingRegister, setIsLoadingRegister] = useState<boolean>(false);

	const { transactionsCollection } = useTransactionsRef();
	const { onRegisterAnalytics } = useAnalytics()
	const { navigate, isFocused } = useNavigation();
	const route = useRoute<RouteProp<RootStackParamList, typeof REGISTER_TRANSACTION>>();
	const yearMonth = route.params?.yearMonth;

	const onCleanUp = () => {
		setDescription('');
		setAmount('');
		setType(TRANSACTIONS_TYPES.EXPENSE);
		setTotalInstallment(undefined);
		setCategoryId(undefined);
	};

	useEffect(() => {
		onCleanUp();
		return () => onCleanUp();
	}, [isFocused]);

	const onRegister = async (partialPayload: Partial<Transaction>) => {
		if(!transactionsCollection) return;

		setIsLoadingRegister(true);
		try {
			const { 
				yearMonth,
				installment,
				groupId,
				amount,
				type = TRANSACTIONS_TYPES.EXPENSE,
				description = '',
				createdAt = Timestamp.fromDate(new Date()),
				lastUpdatedAt = null,
				categoryId = null,
			} = partialPayload;

			const baseDate = yearMonth
			? new Date(`${yearMonth}-01T00:00:00`)
			: new Date(new Date().getFullYear(), new Date().getMonth(), 1);

			const parsedInstallments = installment?.totalInstallment ? Number(installment.totalInstallment) : 1;
			const parsedGroupId = groupId ?? doc(transactionsCollection).id;
			const hasInstallmentAndGroupId = parsedInstallments > 1;

			for (let i = 0; i < parsedInstallments; i++) {
				const installmentDate = new Date(baseDate.getFullYear(), baseDate.getMonth() + i, 1);

				const parsedAmount = Number(Number(amount).toFixed(2));
				const installmentAmount = Number((parsedAmount / parsedInstallments).toFixed(2));
				const isExpense = type === TRANSACTIONS_TYPES.EXPENSE;

				const payload: Omit<Transaction, 'id'> = {
					...partialPayload,

					description,
					categoryId: isExpense ? categoryId : null,
					type,
					createdAt,
					lastUpdatedAt,
					amount: installmentAmount,
					
					status: PAID_STATUS.UNPAID,
					yearMonth: formatYearMonth(installmentDate),
					totalAmount: hasInstallmentAndGroupId ? parsedAmount : null,
					installment: hasInstallmentAndGroupId ? {
						totalInstallment: parsedInstallments,
						currentInstallment: i + 1,
					} : null,
					groupId: hasInstallmentAndGroupId ? parsedGroupId : null,
				};

				await addDoc(transactionsCollection, payload);
				await onRegisterAnalytics({
					amount: payload.amount,
					yearMonth: payload.yearMonth,
					type: payload.type,
					status: payload.status,
					categoryId: payload?.categoryId
				});
			}

			onCleanUp();
			navigate(TRANSACTIONS as never);
		} catch (error) {
			console.error(error);
		} finally {
			setIsLoadingRegister(false);
		}
	};

	const onConfirmRegister = () => {
		const partialPayload: Partial<Transaction> = {
			description,
			amount: Number(amount),
			categoryId,
			type,
			installment: {
				totalInstallment: Number(totalInstallment),
				currentInstallment: 0
			},
			yearMonth
		};

		onRegister(partialPayload);
	};

	const handleAmount = (newAmount: string) => {
		const formattedAmount = newAmount.replace(',', '.');
		if(formattedAmount?.split('.')[0]?.length > 14) return;
		if(formattedAmount?.split('.')[1]?.length > 2) return;
		setAmount(formattedAmount);
	};

	return {
		description,
		amount,
		type,
		totalInstallment,
		categoryId,
		parentId,
		onChangeDescription: setDescription,
		onChangeAmount: handleAmount,
		onChangeType: setType,
		onChangeTotalInstallment: (id: string) => setTotalInstallment(id),
		onChangeCategory: (id: string) => setCategoryId(id),
		onChangeParentId: setParentId,
		onRegister,
		onConfirmRegister,
		isLoadingRegister
	}
};

export { useRegisterTransaction };
