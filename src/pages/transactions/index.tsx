import { useState } from "react";
import { SwipeListView } from "react-native-swipe-list-view";
import { View } from "react-native";

import { EmptyTransactionState } from "@/components/empty-transaction-state";
import { MonthlyCarousel } from "@/components/monthly-carousel";
import { TransactionsFooterButtons } from "@/components/transactions-footer-buttons";
import { Loading } from "@/components/loading";
import { Transaction } from "@/types/transaction";
import { useTransactions } from "@/hooks/use-transactions";
import { useDeleteTransaction } from "@/hooks/use-delete-transaction";
import { SwipeOptions } from "@/components/swipe-options";

import { TransactionItem } from "./components/transaction-item";
import { HeaderList } from "./components/header-list";
import { DetailsModal } from "./components/details-modal";

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

	const {	onConfirmDelete } = useDeleteTransaction();

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
					<SwipeListView
						style={styles.list}
						data={transactions}
						keyExtractor={(item) => item.id}
						renderItem={({ item }) => <TransactionItem data={item} onViewDetails={() => setTransaction(item)} />}
						renderHiddenItem={({ item }, rowMap) => (
							<SwipeOptions
								itemId={item.id}
								rowMap={rowMap}
								onEdit={() => onEdit(item.id)}
								onDelete={() => onConfirmDelete(item)}
							/>
						)}
						swipeToOpenPercent={20}
						rightOpenValue={-190}
						leftOpenValue={-80}
						showsVerticalScrollIndicator={false}
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
