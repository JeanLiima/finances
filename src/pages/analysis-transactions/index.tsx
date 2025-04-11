import { 
	ScrollView,
	View
} from "react-native";

import { EmptyTransactionState } from "@/components/empty-transaction-state";
import { MonthlyCarousel } from "@/components/monthly-carousel";
import { AddTransactionFooterButton } from "@/components/add-transaction-footer-button";
import { Loading } from "@/components/loading";
import { useCategories } from "@/hooks/use-categories";

import { StatusCard } from "./components/status-card";
import { TypesCard } from "./components/types-card";
import { TotalCard } from "./components/total-card";
import { CategoriesCard } from "./components/categories-card";
import { useAnalysisTransactions } from "./hooks/use-analysis-transactions";
import { styles } from "./styles";

const TransactionAnalysis = () => {
	const { 
		isLoadingAnalysisTransactions,
		analytics,
		onSelectYearMonth,
		selectedYearMonth
	} = useAnalysisTransactions();

	const { categories } = useCategories();

	const hasAnalytics = !!analytics;

	if (isLoadingAnalysisTransactions) {
		return (
			<Loading />
		);
	}

	return (
		<View style={styles.container}>
			<MonthlyCarousel onSelect={onSelectYearMonth}/>
			{hasAnalytics ? (
				<ScrollView contentContainerStyle={styles.dashboardContainer}>
					<StatusCard analytics={analytics}/>
					<TypesCard analytics={analytics}/>
					<CategoriesCard 
						analytics={analytics}
						categories={categories}
					/>
					<TotalCard analytics={analytics}/>
				</ScrollView>
			) : (
				<EmptyTransactionState />
			)}
			<AddTransactionFooterButton yearMonth={selectedYearMonth} />
		</View>
	);
};

export { TransactionAnalysis };
