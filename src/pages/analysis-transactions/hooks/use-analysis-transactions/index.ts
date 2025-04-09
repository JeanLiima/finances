import { useEffect, useState } from "react";
import { getDocs, query, where } from "firebase/firestore";

import { useTransactionsRef } from "@/hooks/use-transactions-ref";
import { PAID_STATUS } from "@/constants/paid-status";

const useAnalysisTransactions = () => {
	const [totalPaidTransactions, setTotalPaidTransactions] = useState<number>(0);
	const [totalUnpaidTransactions, setTotalUnpaidTransactions] = useState<number>(0);
	const [isLoadingAnalysisTransactions, setIsLoadingAnalysisTransactions] = useState<boolean>(true);

	const { transactionsCollection } = useTransactionsRef()

	useEffect(() => {
		if(!transactionsCollection) return;
		const getTotalTransactionValue = async () => {
			try {
				const q = query(transactionsCollection, where("status", "==", PAID_STATUS.PAID));
				const snapshot = await getDocs(q);
	
				let totalPaid = 0;
				let totalUnpaid = 0;
	
				snapshot.forEach(doc => {
					const data = doc.data();
    				let value = data.value;

					if (typeof value === "string") {
						value = parseFloat(value.replace(/,/g, ''));
					  }
				  
					  const numericValue = Number(value);
				  
					  if (!isNaN(numericValue)) {
						totalPaid += numericValue;
					  }
				});
				setTotalPaidTransactions(totalPaid);
			} catch (error) {
				alert(error);
			}
			setIsLoadingAnalysisTransactions(false);
		};

		getTotalTransactionValue();
	}, []);

	return {
		isLoadingAnalysisTransactions,
		totalUnpaidTransactions,
		totalPaidTransactions
	}
};

export { useAnalysisTransactions };
