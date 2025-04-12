import { updateDoc } from "firebase/firestore";

import { useTransactionsRef } from "@/hooks/use-transactions-ref";
import { AnalyticsUpdate, useAnalytics } from "@/hooks/use-analytics";
import { Transaction } from "@/types/transaction";
import { PAID_STATUS } from "@/constants/paid-status";

const usePaidStatus = () => {
	const { transactionsDoc } = useTransactionsRef();
	const { onUpdateAnalytics, onBatchUpdateAnalytics } = useAnalytics();

  	const onChangePaidStatus = async (item: Transaction, newStatus: PAID_STATUS) => {
		try {
			const transactionsRef = transactionsDoc(item.id);
			if (!transactionsRef) return;

			await updateDoc(transactionsRef, {
				status: newStatus
			});

			await onUpdateAnalytics(
				{
					amount: item.amount,
					yearMonth: item.yearMonth,
					status: item.status,
					type: item.type,
					categoryId: item.categoryId
				},
				{
					amount: item.amount,
					yearMonth: item.yearMonth,
					status: newStatus,
					type: item.type,
					categoryId: item.categoryId
				}
			);
		} catch (error) {
			console.error(error);
		}
	};

	const onChangePaidStatusBulk = async (
		items: Transaction[],
		newStatus: PAID_STATUS
	) => {
		try {
			const updates: AnalyticsUpdate[] = [];

			await Promise.all(items.map(async (item) => {
				const transactionRef = transactionsDoc(item.id);
				if (!transactionRef) return;
	
				await updateDoc(transactionRef, {
					status: newStatus,
				});

				updates.push({
					oldData: {
						amount: item.amount,
						yearMonth: item.yearMonth,
						status: item.status,
						type: item.type,
						categoryId: item.categoryId,
					},
					newData: {
						amount: item.amount,
						yearMonth: item.yearMonth,
						status: newStatus,
						type: item.type,
						categoryId: item.categoryId,
					},
				});
			}));
	
			await onBatchUpdateAnalytics(updates);
		} catch (error) {
			console.error("Erro ao atualizar status em lote:", error);
		}
	};

	return { 
		onChangePaidStatus,
		onChangePaidStatusBulk
	};
};

export { usePaidStatus };
