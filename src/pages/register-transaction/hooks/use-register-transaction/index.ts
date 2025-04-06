import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { addDoc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";

import { TRANSACTIONS } from "@/constants/routes";
import { PAID } from "@/constants/paid-status";
import { useTransactionsRef } from "@/hooks/use-transactions-ref";
import { TRANSACTIONS_TYPES } from "@/constants/transaction-types";

const useRegisterTransactions = () => {
	const [description, setDescription] = useState<string>('');
	const [value, setValue] = useState<string>('');
	const [type, setType] = useState<TRANSACTIONS_TYPES>(TRANSACTIONS_TYPES.EXPENSE);
	const [isLoadingRegister, setIsLoadingRegister] = useState<boolean>(false);

	const { transactionsCollection } = useTransactionsRef();
	const { navigate, isFocused } = useNavigation();

	const onCleanUp = () => {
		setDescription('');
		setValue('');
		setType(TRANSACTIONS_TYPES.EXPENSE);
	};

	useEffect(() => {
		onCleanUp();
	}, [isFocused]);

	const onRegister = async () => {
		if(!transactionsCollection) return;
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

		setIsLoadingRegister(true);
		try {
			await addDoc(transactionsCollection, {
				description,
				value: Number(value).toFixed(2),
				status: PAID.UNPAID,
				type,
				createdAt: new Date()
			});
			setIsLoadingRegister(false);
			onCleanUp();
			navigate(TRANSACTIONS as never);
		} catch (error) {
			console.log(error);
			setIsLoadingRegister(false);
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
		onRegister,
		isLoadingRegister
	}
};

export { useRegisterTransactions };
