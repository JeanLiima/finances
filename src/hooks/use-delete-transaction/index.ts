import { deleteDoc, getDocs } from "firebase/firestore";
import { Alert } from "react-native";

import { useTransactionsRef } from "@/hooks/use-transactions-ref";

const useDeleteTransaction = () => {
	const { transactionsDoc, transactionsQuery } = useTransactionsRef();

	const onDelete = async (id: string, groupId?: string | null) => {
		const transactionsRef = transactionsDoc(id);
		if (!transactionsRef) return;

		try {
			if (!groupId) {
				await deleteDoc(transactionsRef);
				return;
			} else {
				const transactionsWithGroupIdQuery = transactionsQuery(
					[["groupId", "==", groupId]],
					undefined,
					12
				);
				if(!transactionsWithGroupIdQuery) return;
				const snapshot = await getDocs(transactionsWithGroupIdQuery);

				const batchDeletes = snapshot.docs.map((doc) => deleteDoc(doc.ref));
				await Promise.all(batchDeletes);
			}
		} catch(error) {
			console.error(error);
		}
	};

	const onSelectDeleteType = async (id: string, groupId: string | null) => {
		if (!groupId) {
			await onDelete(id);
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
								onPress: () => onDelete(id),
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
					onPress:() => onDelete(id, groupId),
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

	const onConfirmDelete = (id: string, groupId: string | null, description: string) => {
		if(!id) return;
		Alert.alert(
			"Excluir transação",
			`Você tem certeza que deseja deletar o registro "${description}"?`,
			[
				{
					text: "OK",
					onPress: () => onSelectDeleteType(id, groupId),
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
