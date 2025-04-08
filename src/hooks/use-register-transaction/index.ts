import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { addDoc, doc, Timestamp } from "firebase/firestore";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";

import { REGISTER_TRANSACTION, RootStackParamList, TRANSACTIONS } from "@/constants/routes";
import { PAID_STATUS } from "@/constants/paid-status";
import { useTransactionsRef } from "@/hooks/use-transactions-ref";
import { TRANSACTIONS_TYPES } from "@/constants/transaction-types";
import { formatYearMonth } from "@/utils/format-to-year-month";
import { Transaction } from "@/types/transaction";

const useRegisterTransactions = () => {
	const [description, setDescription] = useState<string>('');
	const [value, setValue] = useState<string>('');
	const [totalInstallment, setTotalInstallment] = useState<string | null>(null);
	const [type, setType] = useState<TRANSACTIONS_TYPES>(TRANSACTIONS_TYPES.EXPENSE);
	const [isLoadingRegister, setIsLoadingRegister] = useState<boolean>(false);

	const { transactionsCollection } = useTransactionsRef();
	const { navigate, isFocused } = useNavigation();
	const route = useRoute<RouteProp<RootStackParamList, typeof REGISTER_TRANSACTION>>();
	const yearMonth = route.params?.yearMonth;

	const onCleanUp = () => {
		setDescription('');
		setValue('');
		setType(TRANSACTIONS_TYPES.EXPENSE);
		setTotalInstallment('')
	};

	useEffect(() => {
		onCleanUp();
	}, [isFocused]);

	const onRegister = async (partialPayload: Partial<Transaction>) => {
		if(!transactionsCollection) return;

		setIsLoadingRegister(true);
		try {
			const baseDate = partialPayload.yearMonth
			? new Date(`${partialPayload.yearMonth}-01T00:00:00`)
			: new Date(new Date().getFullYear(), new Date().getMonth(), 1);

			const installments = partialPayload.totalInstallment ?? 1;
			const groupId = partialPayload?.groupId || doc(transactionsCollection).id;
			const hasInstallmentAndGroupId = installments > 1;

			for (let i = 0; i < installments; i++) {
				const installmentDate = new Date(baseDate.getFullYear(), baseDate.getMonth() + i, 1);
				console.log({installmentDate});

				const payload: Omit<Transaction, 'id'> = {
					...partialPayload,

					description: partialPayload.description || '',
					value:  partialPayload.value || 0,
					type: partialPayload.type || TRANSACTIONS_TYPES.EXPENSE,
					createdAt: partialPayload.createdAt || Timestamp.fromDate(new Date()),
					lastUpdatedAt: partialPayload.lastUpdatedAt || null,

					status: PAID_STATUS.UNPAID,
					yearMonth: formatYearMonth(installmentDate),
					totalInstallment: hasInstallmentAndGroupId ? installments : null,
					currentInstallment: hasInstallmentAndGroupId ? i + 1 : null,
					groupId: hasInstallmentAndGroupId ? groupId : null,
				};

				await addDoc(transactionsCollection, payload);
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
		if(description === '' || isNaN(parseFloat(value))) {
			Alert.alert(
				"Atenção",
				"Preencha todos os campos antes de cadastrar.",
				[{
					text: "OK",
				}],
				{ cancelable: false }
			);
			return;
		};

		const parsedValue = Number(Number(value).toFixed(2));
		const parsedInstallments = totalInstallment ? Number(totalInstallment) : 1;
		const installmentValue = Number((parsedValue / parsedInstallments).toFixed(2));
		const partialPayload: Partial<Transaction> = {
			description,
			value: installmentValue,
			type,
			totalInstallment: parsedInstallments,
			yearMonth
		};

		onRegister(partialPayload);
	};

	const handleValue = (value: string) => {
		const formattedValue = value.replace(',', '.');
		if(formattedValue?.split('.')[0]?.length > 14) return;
		if(formattedValue?.split('.')[1]?.length > 2) return;
		setValue(formattedValue);
	};

	return {
		description,
		value,
		type,
		totalInstallment,
		onChangeDescription: setDescription,
		onChangeValue: handleValue,
		onChangeType: setType,
		onChangeTotalInstallment: setTotalInstallment,
		onRegister,
		onConfirmRegister,
		isLoadingRegister
	}
};

export { useRegisterTransactions };
