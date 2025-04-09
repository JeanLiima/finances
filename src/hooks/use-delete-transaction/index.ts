import { deleteDoc, getDoc, getDocs } from "firebase/firestore";
import { Alert } from "react-native";

import { useTransactionsRef } from "@/hooks/use-transactions-ref";
import { Transaction } from "@/types/transaction";

import { useAnalytics } from "../use-analytics";

const useDeleteTransaction = () => {
	const { transactionsDoc, transactionsQuery } = useTransactionsRef();
	const { onDeleteAnalytics } = useAnalytics();

	const onDelete = async (item: Transaction) => {
		const transactionsRef = transactionsDoc(item.id);
		if (!transactionsRef) return;

		try {
			if (!item.groupId) {
				const snapshot = await getDoc(transactionsRef);
				if (!snapshot.exists()) return;

				const data = snapshot.data();
				await onDeleteAnalytics({
					amount: data.amount,
					yearMonth: data.yearMonth,
					type: data.type,
					status: data.status,
				});
				return;
			} else {
				const transactionsWithGroupIdQuery = transactionsQuery(
					[["groupId", "==", item.groupId]],
					undefined,
					12
				);
				if(!transactionsWithGroupIdQuery) return;
				const snapshot = await getDocs(transactionsWithGroupIdQuery);

				const batchDeletes = snapshot.docs.map(async (doc) => {
					const data = doc.data() as Transaction;
					await deleteDoc(doc.ref);
					await onDeleteAnalytics({
						amount: data.amount,
						yearMonth: data.yearMonth,
						type: data.type,
						status: data.status,
					});
				});
				await Promise.all(batchDeletes);
			}
		} catch(error) {
			console.error(error);
		}
	};

	const onSelectDeleteType = async (item: Transaction) => {
		if (!item.groupId) {
			await onDelete(item);
			return;
		};
		
		Alert.alert(
			"Excluir transação",
			"Está transação tem vínculo. \n\nDeseja excluir apenas esta parcela ou todas as parcelas deste lançamento?",
			[
				{
					text: "Apenas esta",
					onPress: () => Alert.alert(
						"Atenção",
						"Ao deletar apenas esta parcela ela perderá o vinculo com as demais. \n\nDeseja continuar?",
						[
							{
								text: "Continuar",
								onPress: () => onDelete(item),
								style: "destructive",
							},
							{
								text: "Cancelar",
								style: "cancel",
							},
						]
					),
					style: "destructive",
				},
				{
					text: "Todas",
					onPress:() => onDelete(item),
					style: "destructive",
				},
				{
					text: "Cancelar",
					style: "cancel",
				},
			],
			{ cancelable: true }
		);
	};

	const onConfirmDelete = (item: Transaction) => {
		if(!item.id) return;
		Alert.alert(
			"Excluir transação",
			`Você tem certeza que deseja deletar o registro "${item.description}"?`,
			[
				{
					text: "OK",
					onPress: () => onSelectDeleteType(item),
					style: "destructive",
				},
				{
					text: "Cancelar",
					style: "cancel",
				},
			],
		);
	};

	return {
		onDelete,
		onConfirmDelete
	};
};

export { useDeleteTransaction };
