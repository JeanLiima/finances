import { useEffect, useState } from "react";
import { onSnapshot } from "firebase/firestore";

import { useAnalyticsRef } from "@/hooks/use-analytics-ref";
import { formatYearMonth } from "@/utils/format-to-year-month";
import { Analytics } from "@/types/analytics";

const useAnalysisTransactions = () => {
	const [analytics, setAnalytics] = useState<Analytics | null>(null);
	const [selectedYearMonth, setSelectedYearMonth] = useState<string>(formatYearMonth(new Date()));
	const [isLoadingAnalysisTransactions, setIsLoadingAnalysisTransactions] = useState<boolean>(true);

	const { analyticsDoc } = useAnalyticsRef()

	useEffect(() => {
		const transactionsRef = analyticsDoc(selectedYearMonth);
		if(!transactionsRef) return;

		const unsubscribe = onSnapshot(transactionsRef, (snapshot) => {
			if (!snapshot.exists()) {
				setAnalytics(null);
				setIsLoadingAnalysisTransactions(false);
				return;
			}
	
			const data = snapshot.data() as Analytics;
			setAnalytics(data);
			setIsLoadingAnalysisTransactions(false);
		});
	
		return () => unsubscribe();
	}, [selectedYearMonth]);

	return {
		isLoadingAnalysisTransactions,
		analytics,
		onSelectYearMonth: setSelectedYearMonth,
		selectedYearMonth
	}
};

export { useAnalysisTransactions };
