import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { getDoc, Timestamp, updateDoc } from "firebase/firestore";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";

import { EDIT_TRANSACTION, RootStackParamList, TRANSACTIONS } from "@/constants/routes";
import { useTransactionsRef } from "@/hooks/use-transactions-ref";
import { TRANSACTIONS_TYPES } from "@/constants/transaction-types";
import { Transaction } from "@/types/transaction";

const useEditTransactions = () => {
	const [description, setDescription] = useState<string>('');
	const [value, setValue] = useState<string>('');
	const [type, setType] = useState<TRANSACTIONS_TYPES>(TRANSACTIONS_TYPES.EXPENSE);
	const [numberOfInstallment, setNumberOfInstallment] = useState<string | null>(null);
	const [isLoadingEdit, setIsLoadingEdit] = useState<boolean>(true);
	const [isLoadingSubmitting, setIsLoadingSubmitting] = useState<boolean>(false);

	const { navigate } = useNavigation();
	const route = useRoute<RouteProp<RootStackParamList, typeof EDIT_TRANSACTION>>();
	const id = route.params?.id;
	const { transactionsDoc } = useTransactionsRef();

	useEffect(() => {
		if(!id) return;
		const transactionsRef = transactionsDoc(id);
		if (!transactionsRef) return;
		setIsLoadingEdit(true);

		const getSpecificTransaction = async () => {
			const docSnap = await getDoc(transactionsRef);
			if (docSnap.exists()) {
				const data = docSnap.data();
				setDescription(data.description);
				setValue(data.value.toString());
				setType(data.type);
				setNumberOfInstallment(data.numberOfInstallment.toString());
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

		if(description === '' || isNaN(parseFloat(value))) {
			Alert.alert(
				"Atenção",
				"Preencha todos os campos antes de cadastrar.",
				[
					{
						text: "OK",
					},
				],
				{ cancelable: false }
			);
			return;
		}
		setIsLoadingSubmitting(true);
	
		try {
			const payload: Omit<Transaction, 'id' | 'status' | 'createdAt' | 'yearMonth'> = {
				description,
				value: Number(Number(value).toFixed(2)),
				type,
				lastUpdatedAt: Timestamp.fromDate(new Date()),
				numberOfInstallment: numberOfInstallment ? Number(numberOfInstallment) : null
			};
			
			await updateDoc(transactionsRef, payload);
			navigate(TRANSACTIONS as never);
		} catch (error) {
			console.error(error);
		}
		setIsLoadingSubmitting(false);
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
		onEdit,
		isLoadingEdit,
		isLoadingSubmitting,
	}
};

export { useEditTransactions };
