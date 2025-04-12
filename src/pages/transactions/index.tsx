import { useState } from "react";
import { View } from "react-native";

import { EmptyTransactionState } from "@/components/empty-transaction-state";
import { MonthlyCarousel } from "@/components/monthly-carousel";
import { TransactionsFooterButtons } from "@/components/transactions-footer-buttons";
import { Loading } from "@/components/loading";
import { Transaction } from "@/types/transaction";
import { useTransactions } from "@/hooks/use-transactions";

import { HeaderList } from "./components/header-list";
import { DetailsModal } from "./components/details-modal";
import { TransactionsList } from "./components/transactions-list";

import { styles } from "./styles";

const Transactions = () => {
	const [transaction, setTransaction] = useState<Transaction | null>(null);

	const {
		isLoadingTransactions,
		transactions, 
		onEdit,
		onSort,
		onSelectYearMonth,
		selectedYearMonth
	} = useTransactions();

	const hasTransactions = transactions.length > 0;

	if (isLoadingTransactions) {
		return (
			<Loading />
		);
	}

	return (
		<View style={styles.container}>
			<MonthlyCarousel onSelect={onSelectYearMonth}/>
			{hasTransactions ? ( 
				<>
					<HeaderList onSort={onSort} />
					<TransactionsList 
						transactions={transactions} 
						onViewDetails={setTransaction}
						onEdit={onEdit}
					/>
				</>
			) : (
				<EmptyTransactionState />
			)}
			<TransactionsFooterButtons yearMonth={selectedYearMonth} onlyAddButton={!hasTransactions} />
			<DetailsModal 
				data={transaction} 
				onClose={() => setTransaction(null)}
			/>
		</View>
	)
};

export { Transactions };
