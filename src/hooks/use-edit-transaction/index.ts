import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { getDoc, getDocs, Timestamp, updateDoc } from "firebase/firestore";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";

import { EDIT_TRANSACTION, RootStackParamList, TRANSACTIONS } from "@/constants/routes";
import { useTransactionsRef } from "@/hooks/use-transactions-ref";
import { TRANSACTIONS_TYPES } from "@/constants/transaction-types";
import { Transaction } from "@/types/transaction";
import { useDeleteTransaction } from "@/hooks/use-delete-transaction";
import { useRegisterTransactions } from "@/hooks/use-register-transaction";

import { showTransactionWithInstallmentChangeAlert } from "./mappers/show-transaction-with-installment-change-alert";

const useEditTransactions = () => {
	const [description, setDescription] = useState<string>('');
	const [value, setValue] = useState<string>('');
	const [type, setType] = useState<TRANSACTIONS_TYPES>(TRANSACTIONS_TYPES.EXPENSE);
	const [totalInstallment, setTotalInstallment] = useState<string | null>(null);
	const [restOfData, setRestOfData] = useState<Transaction | null>(null);

	const [isLoadingEdit, setIsLoadingEdit] = useState<boolean>(true);
	const [isLoadingSubmitting, setIsLoadingSubmitting] = useState<boolean>(false);

	const { transactionsDoc, transactionsQuery } = useTransactionsRef();
	const { onDelete } = useDeleteTransaction();
	const { onRegister } = useRegisterTransactions();
	const { navigate } = useNavigation();
	const route = useRoute<RouteProp<RootStackParamList, typeof EDIT_TRANSACTION>>();
	const id = route.params?.id;

	useEffect(() => {
		if(!id) return;
		const transactionsRef = transactionsDoc(id);
		if (!transactionsRef) return;
		setIsLoadingEdit(true);

		const getSpecificTransaction = async () => {
			const docSnap = await getDoc(transactionsRef);
			if (docSnap.exists()) {
				const data = docSnap.data() as Transaction;
				setDescription(data.description);
				setValue(data.value.toString());
				setType(data.type);
				setTotalInstallment(data.totalInstallment ? data.totalInstallment.toString() : null);
				setRestOfData(data);
			} else {
				alert('Documento não encontrado!');
				navigate(TRANSACTIONS as never);
			}
			setIsLoadingEdit(false);
		};
		getSpecificTransaction();
	}, [id]);

	const onCleanUp = () => {
		setDescription('');
		setValue('');
		setType(TRANSACTIONS_TYPES.EXPENSE);
		setTotalInstallment('');
		setRestOfData(null);
	};

	const onEdit = async (
		id: string, 
		partialPayload: Partial<Transaction>, 
		isIsolatedEdit: boolean = false,
		shouldRedistributeValue: boolean = false
	) => {
		const transactionsRef = transactionsDoc(id);
		if (!transactionsRef) return;

		setIsLoadingSubmitting(true);

		try {
			const hasGroupId = !!partialPayload.groupId;
			const hasInstallment = !!partialPayload.totalInstallment && Number(partialPayload.totalInstallment) > 1;

			if (isIsolatedEdit  || (!hasGroupId && !hasInstallment)) {
				await updateDoc(transactionsRef, {
					...partialPayload,
					totalInstallment: null,
					currentInstallment: null,
					groupId: null
				});
				navigate(TRANSACTIONS as never);
				return;
			} else {
				let originalYearMonth = partialPayload.yearMonth;
				let originalCreatedAt = partialPayload.createdAt;

				if(hasGroupId) {
					const transactionsWithGroupIdQuery = transactionsQuery(
						[["groupId", "==", partialPayload.groupId]],
						[["yearMonth", "asc"]],
						1
					);
					if(!transactionsWithGroupIdQuery) return;
					const snapshot = await getDocs(transactionsWithGroupIdQuery);
					if (snapshot.empty) return;
					
					const originalData = snapshot.docs[0].data();
					originalYearMonth = originalData.yearMonth;
					originalCreatedAt = originalData.createdAt;
				}

				const totalInstallments = Number(partialPayload.totalInstallment) || 1;
				const value = shouldRedistributeValue ? partialPayload.value : ((partialPayload.value ?? 0) * totalInstallments);

				await onDelete(id, partialPayload.groupId);
				await onRegister({
					...partialPayload,
					value,
					totalInstallment: hasInstallment ? Number(partialPayload.totalInstallment) : null,
					yearMonth: originalYearMonth,
					createdAt: originalCreatedAt,
					groupId: hasGroupId ? partialPayload.groupId : null,
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
		if(!id) return;

		const partialPayload: Partial<Transaction> = {
			description,
			value: Number(value),
			type,
			totalInstallment: Number(totalInstallment),
			lastUpdatedAt: Timestamp.fromDate(new Date()),
			yearMonth: restOfData?.yearMonth,
			createdAt: restOfData?.createdAt,
			groupId: restOfData?.groupId
		};

		if (!restOfData?.groupId) {
			await onEdit(id, partialPayload);
			return;
		};

		showTransactionWithInstallmentChangeAlert(
			id,
			partialPayload,
			restOfData,
			onEdit
		);
	};

	const onConfirmeEdit = () => {
		if(description === '' || isNaN(parseFloat(value))) {
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

	const handleValue = (value: string) => {
		const formattedValue = value.replace(',', '.');

		if (formattedValue?.split('.')[0]?.length > 14) return;
		if (formattedValue?.split('.')[1]?.length > 2) return;

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
		onConfirmeEdit,
		isLoadingEdit,
		isLoadingSubmitting,
	}
};

export { useEditTransactions };
