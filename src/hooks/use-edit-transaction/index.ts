import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { getDoc, getDocs, Timestamp, updateDoc } from "firebase/firestore";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";

import { EDIT_TRANSACTION, RootStackParamList, TRANSACTIONS } from "@/constants/routes";
import { TRANSACTIONS_TYPES } from "@/constants/transaction-types";
import { Transaction } from "@/types/transaction";

import { useTransactionsRef } from "../use-transactions-ref";
import { useDeleteTransaction } from "../use-delete-transaction";
import { useRegisterTransactions } from "../use-register-transaction";
import { useAnalytics } from "../use-analytics";

import { showTransactionWithInstallmentChangeAlert } from "./mappers/show-transaction-with-installment-change-alert";

type OnEditParams = {
	id: string;
	newPayload: Partial<Transaction>;
	oldPayload: Transaction;
	isIsolatedEdit?: boolean;
	shouldRedistributeValue?: boolean;
}

const useEditTransactions = () => {
	const [description, setDescription] = useState<string>('');
	const [amount, setAmount] = useState<string>('');
	const [type, setType] = useState<TRANSACTIONS_TYPES>(TRANSACTIONS_TYPES.EXPENSE);
	const [totalInstallment, setTotalInstallment] = useState<string | null>(null);
	const [restOfData, setRestOfData] = useState<Transaction | null>(null);

	const [isLoadingEdit, setIsLoadingEdit] = useState<boolean>(true);
	const [isLoadingSubmitting, setIsLoadingSubmitting] = useState<boolean>(false);

	const { transactionsDoc, transactionsQuery } = useTransactionsRef();
	const { onDelete } = useDeleteTransaction();
	const { onUpdateAnalytics } = useAnalytics();
	const { onRegister } = useRegisterTransactions();
	const { navigate, isFocused } = useNavigation();
	const route = useRoute<RouteProp<RootStackParamList, typeof EDIT_TRANSACTION>>();
	const id = route.params?.id;

	useEffect(() => {
		if(!id) return;
		const transactionsRef = transactionsDoc(id);
		if (!transactionsRef) return;

		let isActive = true;
		setIsLoadingEdit(true);

		const getSpecificTransaction = async () => {
			const docSnap = await getDoc(transactionsRef);
			if (!isActive) return;
	
			if (docSnap.exists()) {
				const data = docSnap.data() as Transaction;
				const { description, amount, installment, type } = data; 
				setDescription(description);
				setAmount(amount.toString());
				setType(type);
				setTotalInstallment(installment?.totalInstallment ? installment.totalInstallment.toString() : null);
				setRestOfData(data);
			} else {
				alert('Documento não encontrado!');
				navigate(TRANSACTIONS as never);
			}
			setIsLoadingEdit(false);
		};

		getSpecificTransaction();

		return () => {
			isActive = false;
		};
	}, [id, isFocused]);

	const onCleanUp = () => {
		setDescription('');
		setAmount('');
		setType(TRANSACTIONS_TYPES.EXPENSE);
		setTotalInstallment('');
		setRestOfData(null);
	};

	const onEdit = async ({
		id, 
		newPayload, 
		oldPayload,
		isIsolatedEdit = false,
		shouldRedistributeValue = false
	}: OnEditParams) => {
		const transactionsRef = transactionsDoc(id);
		if (!transactionsRef) return;

		setIsLoadingSubmitting(true);

		try {
			const { 
				installment, 
				groupId,
			} = newPayload;

			const hasGroupId = !!groupId;
			const hasInstallment = !!installment?.totalInstallment && Number(installment.totalInstallment) > 1;

			if (isIsolatedEdit  || (!hasGroupId && !hasInstallment)) {
				await onUpdateAnalytics(
					{
						amount: oldPayload.amount,
						yearMonth: oldPayload.yearMonth,
						type: oldPayload.type,
						status: oldPayload.status,
					},
					{
						amount: newPayload.amount ?? oldPayload.amount,
						yearMonth: newPayload.yearMonth ?? oldPayload.yearMonth,
						type: newPayload.type ?? oldPayload.type,
						status: newPayload.status ?? oldPayload.status,
					}
				);

				await updateDoc(transactionsRef, {
					...newPayload,
					totalInstallment: null,
					currentInstallment: null,
					groupId: null
				});
				navigate(TRANSACTIONS as never);
				return;
			} else {
				let originalYearMonth = newPayload.yearMonth;
				let originalCreatedAt = newPayload.createdAt;

				if(hasGroupId) {
					const transactionsWithGroupIdQuery = transactionsQuery(
						[["groupId", "==", newPayload.groupId]],
						[["yearMonth", "asc"]],
						1
					);
					if(!transactionsWithGroupIdQuery) return;
					const snapshot = await getDocs(transactionsWithGroupIdQuery);
					if (snapshot.empty) return;
					
					const firstOriginalData = snapshot.docs[0].data();
					originalYearMonth = firstOriginalData.yearMonth;
					originalCreatedAt = firstOriginalData.createdAt;
				}

				const amount = shouldRedistributeValue 
					? newPayload.amount ?? 0 
					: newPayload.totalAmount ?? 0;

				await onDelete(oldPayload);
				await onRegister({
					...newPayload,
					amount,
					totalAmount: amount,
					installment: hasInstallment ? {
						totalInstallment: Number(newPayload.installment?.totalInstallment),
						currentInstallment: 0
					} : null,
					yearMonth: originalYearMonth,
					createdAt: originalCreatedAt,
					groupId: hasGroupId ? newPayload.groupId : null,
				});
			}

			onCleanUp();
			navigate(TRANSACTIONS as never);
		} catch (error) {
			console.error(error);
		} finally {
			setIsLoadingSubmitting(false);
		}
	};

	const onSelectEditType = async () => {
		if(!id || !restOfData) return;

		const newPayload: Partial<Transaction> = {
			description,
			amount: Number(amount),
			type,
			installment: {
				totalInstallment: Number(totalInstallment),
				currentInstallment: 0
			},
			lastUpdatedAt: Timestamp.fromDate(new Date()),
			totalAmount: restOfData.totalAmount,
			yearMonth: restOfData.yearMonth,
			createdAt: restOfData.createdAt,
			groupId: restOfData.groupId
		};

		if (!restOfData.groupId) {
			await onEdit({ 
				id, 
				newPayload, 
				oldPayload: restOfData
			});
			return;
		};

		showTransactionWithInstallmentChangeAlert({
			id,
			newPayload,
			originalTransaction: restOfData,
			onEdit
		});
	};

	const onConfirmeEdit = () => {
		if(description === '' || isNaN(parseFloat(amount))) {
			Alert.alert(
				"Atenção",
				"Preencha todos os campos antes de cadastrar.",
				[{
					text: "OK"
				}],
				{ cancelable: false }
			);
			return;
		}

		onSelectEditType();
	};

	const handleAmount = (newAmount: string) => {
		const formattedAmount = newAmount.replace(',', '.');

		if (formattedAmount?.split('.')[0]?.length > 14) return;
		if (formattedAmount?.split('.')[1]?.length > 2) return;

		setAmount(formattedAmount);
	};

	return {
		description,
		amount,
		type,
		totalInstallment,
		onChangeDescription: setDescription,
		onChangeAmount: handleAmount,
		onChangeType: setType,
		onChangeTotalInstallment: setTotalInstallment,
		onConfirmeEdit,
		isLoadingEdit,
		isLoadingSubmitting,
	}
};

export { useEditTransactions };
