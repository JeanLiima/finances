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

const useEditTransactions = () => {
	const [description, setDescription] = useState<string>('');
	const [value, setValue] = useState<string>('');
	const [type, setType] = useState<TRANSACTIONS_TYPES>(TRANSACTIONS_TYPES.EXPENSE);
	const [numberOfInstallment, setNumberOfInstallment] = useState<string | null>(null);
	const [groupId, setGroupId] = useState<string | null>(null);

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
				setGroupId(data.groupId);
				setNumberOfInstallment(data.numberOfInstallment ? data.numberOfInstallment.toString() : null);
			} else {
				alert('Documento não encontrado!');
				navigate(TRANSACTIONS as never);
			}
			setIsLoadingEdit(false);
		};
		getSpecificTransaction();
	}, [id]);

	const onEdit = async () => {
		if(!id) return;
		const transactionsRef = transactionsDoc(id);
		if (!transactionsRef) return;

		setIsLoadingSubmitting(true);

		try {
			const payload: Omit<Transaction, 'id' | 'status' | 'createdAt' | 'yearMonth' | 'installmentGroupId' | 'groupId'> = {
				description,
				value: Number(Number(value).toFixed(2)),
				type,
				lastUpdatedAt: Timestamp.fromDate(new Date()),
				numberOfInstallment: numberOfInstallment ? Number(numberOfInstallment) : null,
			};
	
			if (!groupId) {
				await updateDoc(transactionsRef, payload);
				navigate(TRANSACTIONS as never);
				return;
			} else {
				const transactionsWithGroupIdQuery = transactionsQuery(
					[["groupId", "==", groupId]],
					[["yearMonth", "asc"]],
					1
				);
				if(!transactionsWithGroupIdQuery) return;
				const snapshot = await getDocs(transactionsWithGroupIdQuery);
				if (snapshot.empty) return;

				const originalData = snapshot.docs[0].data();
				const originalYearMonth = originalData.yearMonth;
				const originalCreatedAt = originalData.createdAt;

				await onDelete(id, groupId);
				await onRegister({
					...payload,
					yearMonth: originalYearMonth,
					createdAt: originalCreatedAt,
					groupId: groupId,
				});
			}
		} catch (error) {
			console.error(error);
		} finally {
			setIsLoadingSubmitting(false);
		}
	};

	const onSelectEditType = async () => {
		if (!groupId) {
			await onEdit();
			return;
		};

		Alert.alert(
			"Editar transação",
			"Deseja editar apenas esta parcela ou todas as parcelas deste lançamento?",
			[
				{
					text: "Apenas esta",
					onPress: onEdit,
					style: "default",
				},
				{
					text: "Todas",
					onPress: onEdit,
					style: "default",
				},
				{
					text: "Cancelar",
					style: "cancel",
				},
			],
			{ cancelable: true }
		);
	};

	const onConfirmeEdit = () => {
		if(description === '' || isNaN(parseFloat(value))) {
			Alert.alert(
				"Atenção",
				"Preencha todos os campos antes de cadastrar.",
				[{
					text: "OK",
					onPress: onSelectEditType
				}],
				{ cancelable: false }
			);
			return;
		}
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
		numberOfInstallment,
		onChangeDescription: setDescription,
		onChangeValue: handleValue,
		onChangeType: setType,
		onChangeNumberOfInstallment: setNumberOfInstallment,
		onConfirmeEdit,
		isLoadingEdit,
		isLoadingSubmitting,
	}
};

export { useEditTransactions };
