import { useEffect, useState } from "react";
import { getDoc, getDocs, Timestamp, updateDoc } from "firebase/firestore";
import { NavigationProp, RouteProp, useNavigation, useRoute } from "@react-navigation/native";

import { EDIT_TRANSACTION, RootStackParamList, TRANSACTIONS } from "@/constants/routes";
import { TRANSACTIONS_TYPES } from "@/constants/transaction-types";
import { Transaction } from "@/types/transaction";

import { useTransactionsRef } from "../use-transactions-ref";
import { useDeleteTransaction } from "../use-delete-transaction";
import { useRegisterTransaction } from "../use-register-transaction";
import { useAnalytics } from "../use-analytics";

import { showTransactionWithInstallmentChangeAlert } from "./mappers/show-transaction-with-installment-change-alert";

type OnEditParams = {
	id: string;
	newPayload: Partial<Transaction>;
	oldPayload: Transaction;
	isIsolatedEdit?: boolean;
	shouldRedistributeValue?: boolean;
}

const useEditTransaction = () => {
	const [description, setDescription] = useState<string>('');
	const [amount, setAmount] = useState<string>('');
	const [type, setType] = useState<TRANSACTIONS_TYPES>(TRANSACTIONS_TYPES.EXPENSE);
	const [totalInstallment, setTotalInstallment] = useState<string | undefined>(undefined);
	const [categoryId, setCategoryId] = useState<string | undefined>(undefined);
	const [aggregationId, setAggregationId] = useState<string | undefined>(undefined);
	const [restOfData, setRestOfData] = useState<Transaction | undefined>(undefined);

	const [isLoadingEdit, setIsLoadingEdit] = useState<boolean>(true);
	const [isLoadingSubmitting, setIsLoadingSubmitting] = useState<boolean>(false);

	const { transactionsDoc, transactionsQuery } = useTransactionsRef();
	const { onDelete } = useDeleteTransaction();
	const { onUpdateAnalytics } = useAnalytics();
	const { onRegister } = useRegisterTransaction();
	const { navigate, isFocused } = useNavigation<NavigationProp<RootStackParamList>>();
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
				const { description, amount, installment, type, categoryId, aggregationId } = data; 
				setDescription(description);
				setAmount(amount.toString());
				setType(type);
				setCategoryId(categoryId ?? undefined);
				setAggregationId(aggregationId ?? undefined);
				setTotalInstallment(installment?.totalInstallment.toString());
				setRestOfData(data);
			} else {
				alert('Documento não encontrado!');
				navigate(TRANSACTIONS);
			}
			setIsLoadingEdit(false);
		};
		
		getSpecificTransaction();

		return () => { isActive = false };
	}, [id, isFocused]);

	const onCleanUp = () => {
		setDescription('');
		setAmount('');
		setType(TRANSACTIONS_TYPES.EXPENSE);
		setTotalInstallment(undefined);
		setCategoryId(undefined);
		setRestOfData(undefined);
		setAggregationId(undefined);
	};

	const fetchOriginalTransactionData = async (groupId: string) => {
		const transactionsWithGroupIdQuery = transactionsQuery(
			[["installment.groupId", "==", groupId]],
			[["yearMonth", "asc"]],
			1
		);
		if (!transactionsWithGroupIdQuery) throw new Error("Query not found");

		const snapshot = await getDocs(transactionsWithGroupIdQuery);
		if (snapshot.empty) throw new Error("No transactions found");

		const firstOriginalData = snapshot.docs[0].data();
		return {
			yearMonth: firstOriginalData.yearMonth,
			createdAt: firstOriginalData.createdAt,
		};
	};

	const handleDeleteAndRegister = async (
		newPayload: Partial<Transaction>, 
		oldPayload: Transaction, 
		id: string, 
		hasGroupId: boolean, 
		hasInstallment: boolean, 
		shouldRedistributeValue: boolean
	) => {
		let originalYearMonth = newPayload.yearMonth;
		let originalCreatedAt = newPayload.createdAt;

		if (hasGroupId) {
			const { yearMonth, createdAt } = await fetchOriginalTransactionData(newPayload.installment!.groupId);
			originalYearMonth = yearMonth;
			originalCreatedAt = createdAt;
		}

		const amount = shouldRedistributeValue 
			? newPayload.amount ?? 0 
			: newPayload.totalAmount ?? 0;

		await onDelete({ item: { ...oldPayload, id } });
		await onRegister({
			...newPayload,
			amount,
			totalAmount: amount,
			installment: hasInstallment ? {
				totalInstallment: Number(newPayload.installment?.totalInstallment),
				currentInstallment: 0,
				groupId: newPayload.installment!.groupId,
			} : undefined,
			yearMonth: originalYearMonth,
			createdAt: originalCreatedAt,
		});
	};

	const handleUpdate = async (
		id: string, 
		newPayload: Partial<Transaction>,
		oldPayload: Transaction
	) => {
		const transactionsRef = transactionsDoc(id);
		if (!transactionsRef) return;
		
		await onUpdateAnalytics(
			{
				amount: oldPayload.amount,
				yearMonth: oldPayload.yearMonth,
				type: oldPayload.type,
				status: oldPayload.status,
				categoryId : oldPayload.categoryId
			},
			{
				amount: newPayload.amount ?? oldPayload.amount,
				yearMonth: newPayload.yearMonth ?? oldPayload.yearMonth,
				type: newPayload.type ?? oldPayload.type,
				status: newPayload.status ?? oldPayload.status,
				categoryId : newPayload.categoryId ?? oldPayload.categoryId,
			}
		);

		await updateDoc(transactionsRef, {
			...newPayload,
			installment: null,
			groupId: null
		});
	};

	const onEdit = async ({
		id, 
		newPayload, 
		oldPayload,
		isIsolatedEdit = false,
		shouldRedistributeValue = false
	}: OnEditParams) => {
		setIsLoadingSubmitting(true);

		try {
			const { installment } = newPayload;

			const hasGroupId = !!installment?.groupId;
			const hasTotalInstallment = !!installment?.totalInstallment && Number(installment.totalInstallment) > 1;

			if (isIsolatedEdit || !hasTotalInstallment) {
				await handleUpdate(id, newPayload, oldPayload);
			} else {
				await handleDeleteAndRegister(
					newPayload, 
					oldPayload, 
					id, 
					hasGroupId, 
					hasTotalInstallment, 
					shouldRedistributeValue
				);
			}

			onCleanUp();
			navigate(TRANSACTIONS);
		} catch (error) {
			console.error(error);
		} finally {
			setIsLoadingSubmitting(false);
		}
	};

	const onSelectEditType = async () => {
		if(!id || !restOfData) return;

		const isExpense = type === TRANSACTIONS_TYPES.EXPENSE;
		const newPayload: Partial<Transaction> = {
			description,
			amount: Number(amount),
			type,
			categoryId: isExpense ? categoryId : undefined,
			aggregationId: isExpense ? aggregationId : undefined,
			installment: {
				totalInstallment: Number(totalInstallment),
				currentInstallment: 0,
				groupId: restOfData?.installment?.groupId ?? ''
			},
			lastUpdatedAt: Timestamp.fromDate(new Date()),
			totalAmount: restOfData.totalAmount,
			yearMonth: restOfData.yearMonth,
			createdAt: restOfData.createdAt,
		};

		if (!restOfData.installment?.groupId) {
			await onEdit({ 
				id, 
				newPayload, 
				oldPayload: restOfData,
				shouldRedistributeValue: true
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
		categoryId,
		aggregationId,
		onChangeDescription: setDescription,
		onChangeAmount: handleAmount,
		onChangeType: setType,
		onChangeTotalInstallment: (id: string) => setTotalInstallment(id),
		onChangeCategory: (id: string) => setCategoryId(id),
		onChangeAggregation: (id: string) => setAggregationId(id),
		onConfirmeEdit,
		isLoadingEdit,
		isLoadingSubmitting,
	}
};

export { useEditTransaction };
