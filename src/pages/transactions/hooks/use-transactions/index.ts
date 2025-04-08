import { useEffect, useState } from "react";
import { deleteDoc, onSnapshot } from "firebase/firestore";
import { useNavigation, NavigationProp } from "@react-navigation/native";

import { EDIT_TRANSACTION, RootStackParamList } from "@/constants/routes";
import { useTransactionsRef } from "@/hooks/use-transactions-ref";
import { formatYearMonth } from "@/utils/format-to-year-month";
import { Transaction } from "@/types/transaction";

interface OrderBy {
	column: keyof Transaction,
	order: 'asc' | 'desc'
}

const useTransactions = () => {
	const [isLoadingTransactions, setIsLoadingTransactions] = useState<boolean>(true);
	const [transactions, setTransactions] = useState<Transaction[]>([]);
	const [orderBy, setOrderBy] = useState<OrderBy>({
		column: 'createdAt',
		order: 'asc'
	});
	const [selectedYearMonth, setSelectedYearMonth] = useState<string>(formatYearMonth(new Date()));

	const { transactionsQuery, transactionsDoc } = useTransactionsRef()
	const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();

	
	useEffect(() => {
		console.log(orderBy);
		const transactionsWithMonthQuery = transactionsQuery(
			[["yearMonth", "==", selectedYearMonth]],
			[[orderBy.column, orderBy.order]]
		);
		if(!transactionsWithMonthQuery) return;

		const unsubscribe = onSnapshot(
			transactionsWithMonthQuery, 
			(snapshot) => {
				const lista: Transaction[] = [];

				snapshot.forEach((doc) => {
					lista.push({
						id: doc.id,
						...doc.data() as Omit<Transaction, 'id'>,
					});
				});

				setTransactions(lista);
				setIsLoadingTransactions(false);
			}
		);

		return () => unsubscribe();
	}, [selectedYearMonth, orderBy]);

	const onDelete = async (id: string) => {
		const transactionsRef = transactionsDoc(id);
		if (!transactionsRef) return;
		await deleteDoc(transactionsRef);
	};

	const onEdit = async (id: string) => {
		navigate(EDIT_TRANSACTION, {
			id: id,
		} as RootStackParamList[typeof EDIT_TRANSACTION]);
	};
	  
	const onSort = (column: keyof Transaction) => {
		setOrderBy((prev) => {
			if (prev?.column === column) {
				const newOrder = prev.order === "asc" ? "desc" : "asc";
				return { column, order: newOrder };
			}
			return { column, order: "asc" };
		});
	};

	return {
		isLoadingTransactions,
		transactions,
		onDelete,
		onEdit,
		onSort,
		onSelectYearMonth: setSelectedYearMonth,
		selectedYearMonth
	}
};

export { useTransactions };
