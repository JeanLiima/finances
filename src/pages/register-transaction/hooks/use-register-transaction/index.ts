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
	const [numberOfInstallment, setNumberOfInstallment] = useState<string | null>(null);
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
		setNumberOfInstallment('')
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
				[{
					text: "OK",
				}],
				{ cancelable: false }
			);
			return;
		}

		setIsLoadingRegister(true);
		try {
			
			const baseDate = yearMonth
			? new Date(`${yearMonth}-01T00:00:00`)
			: new Date(new Date().getFullYear(), new Date().getMonth(), 1);
			const installments = numberOfInstallment ? Number(numberOfInstallment) : 1;
			const groupId = installments > 1 ? doc(transactionsCollection).id : null;

			for (let i = 0; i < installments; i++) {
				const installmentDate = new Date(baseDate.getFullYear(), baseDate.getMonth() + i, 1);

				const payload: Omit<Transaction, 'id'> = {
					description,
					value: Number(Number(value).toFixed(2)),
					status: PAID_STATUS.UNPAID,
					type,
					createdAt: Timestamp.fromDate(new Date()),
					yearMonth: formatYearMonth(installmentDate),
					lastUpdatedAt: null,
					numberOfInstallment: installments > 1 ? installments : null,
					groupId: installments > 1 ? groupId : null,
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
		onRegister,
		isLoadingRegister
	}
};

export { useRegisterTransactions };
