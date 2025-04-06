import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { getDoc, updateDoc } from "firebase/firestore";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";

import { EDIT_TRANSACTION, RootStackParamList, TRANSACTIONS } from "@/constants/routes";
import { useTransactionsRef } from "@/hooks/use-transactions-ref";
import { TRANSACTIONS_TYPES } from "@/constants/transaction-types";

const useEditTransactions = () => {
	const [description, setDescription] = useState<string>('');
	const [value, setValue] = useState<string>('');
	const [type, setType] = useState<TRANSACTIONS_TYPES>(TRANSACTIONS_TYPES.EXPENSE);
	const [isLoadingEdit, setIsLoadingEdit] = useState<boolean>(false);

	const { navigate } = useNavigation();
	const route = useRoute<RouteProp<RootStackParamList, typeof EDIT_TRANSACTION>>();
	const id = route.params?.id;
	const { transactionsDoc } = useTransactionsRef();

	useEffect(() => {
		if(!id) return;
		const transactionsRef = transactionsDoc(id);
		if (!transactionsRef) return;

		const getSpecificTransaction = async () => {
			const docSnap = await getDoc(transactionsRef);
			if (docSnap.exists()) {
				const data = docSnap.data();
				setDescription(data.description);
				setValue(data.value.toString());
				setType(data.type);
			} else {
				alert('Documento não encontrado!');
				navigate(TRANSACTIONS as never);
			}
		};
		getSpecificTransaction();
	}, [id]);

	const onCleanUp = () => {
		setDescription('');
		setValue('');
		setType(TRANSACTIONS_TYPES.EXPENSE);
	};

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
	
		setIsLoadingEdit(true);
		try {
			const payload = {
				description,
				value: Number(value).toFixed(2),
				type
			}
			
			await updateDoc(transactionsRef, payload);
			setIsLoadingEdit(false);
			onCleanUp();
			navigate(TRANSACTIONS as never);
		} catch (error) {
			console.log(error);
			setIsLoadingEdit(false);
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
		onChangeDescription: setDescription,
		onChangeValue: handleValue,
		onChangeType: setType,
		onEdit,
		isLoadingEdit,
	}
};

export { useEditTransactions };
