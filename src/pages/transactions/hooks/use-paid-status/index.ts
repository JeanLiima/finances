import { updateDoc } from "firebase/firestore";

import { useTransactionsRef } from "@/hooks/use-transactions-ref";
import { useAnalytics } from "@/hooks/use-analytics";
import { Transaction } from "@/types/transaction";
import { PAID_STATUS } from "@/constants/paid-status";

const usePaidStatus = () => {
	const { transactionsDoc } = useTransactionsRef();
	const { onUpdateAnalytics } = useAnalytics();

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

	return { 
		onChangePaidStatus 
	};
};

export { usePaidStatus };
