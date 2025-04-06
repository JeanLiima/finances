import { updateDoc } from "firebase/firestore";

import { PAID_STATUS } from "@/constants/paid-status";
import { useTransactionsRef } from "@/hooks/use-transactions-ref";

const usePaidStatus = () => {
	const { transactionsDoc } = useTransactionsRef();

  	const onChangePaidStatus = async (paid: PAID_STATUS, id: string) => {
		try {
			const transactionsRef = transactionsDoc(id);
			if (!transactionsRef) return;
			await updateDoc(transactionsRef, {
				status: paid
			});
		} catch (error) {
			console.log(error);
		}
	};

	return { 
		onChangePaidStatus 
	};
};

export { usePaidStatus };
