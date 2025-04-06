import { useEffect, useRef, useState } from "react";
import { deleteDoc, onSnapshot } from "firebase/firestore";
import { useNavigation, NavigationProp } from "@react-navigation/native";

import { EDIT_TRANSACTION, RootStackParamList } from "@/constants/routes";
import { PAID_STATUS } from "@/constants/paid-status";
import { useTransactionsRef } from "@/hooks/use-transactions-ref";
import { TRANSACTIONS_TYPES } from "@/constants/transaction-types";

interface Transaction {
	id: string;
	description: string;
	value: number;
	status: PAID_STATUS,
	type: TRANSACTIONS_TYPES
}

const useTransactions = () => {
	const [isLoadingTransactions, setIsLoadingTransactions] = useState<boolean>(true);
	const [transactions, setTransactions] = useState<Transaction[]>([]);

	const lastSortColumn = useRef<keyof Transaction | null>(null);
	const lastSortDirection = useRef<'ASC' | 'DESC'>('ASC');

	const { transactionsCollection, transactionsDoc } = useTransactionsRef()
	const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();

	useEffect(() => {
		if(!transactionsCollection) return;

		const unsubscribe = onSnapshot(transactionsCollection, (snapshot) => {
			const lista: Transaction[] = [];

			snapshot.forEach((doc) => {
			lista.push({
				id: doc.id,
				description: doc.data().description,
				value: doc.data().value,
				status: doc.data().status,
				type: doc.data().type,
			});
			});

			setTransactions(lista);
			setIsLoadingTransactions(false);
		});

		return () => unsubscribe();
	}, []);

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

	const parseValue = (val: any) => {
		if (typeof val === "string") {
		  return parseFloat(val.replace(/[^\d,-]/g, "").replace(",", "."));
		}
		return Number(val);
	};
	  
	const onSort = (column: keyof Transaction) => {
		const isSameColumn = lastSortColumn.current === column;
  		const direction = isSameColumn && lastSortDirection.current === 'ASC' ? 'DESC' : 'ASC';
	  
		setTransactions((currentList) => {
		  return [...currentList].sort((a, b) => {
			let valA = a[column];
			let valB = b[column];
	  
			if (column === "value") {
			  valA = parseValue(valA);
			  valB = parseValue(valB);
			}
	  
			const result =
			  typeof valA === "number" && typeof valB === "number"
				? valA - valB
				: String(valA).localeCompare(String(valB));
	  
			return direction === "ASC" ? result : -result;
		  });
		});
	  
		lastSortColumn.current = column;
  		lastSortDirection.current = direction;
	};

	return {
		isLoadingTransactions,
		transactions,
		onDelete,
		onEdit,
		onSort
	}
};

export { 
	useTransactions, 
	type Transaction 
};
