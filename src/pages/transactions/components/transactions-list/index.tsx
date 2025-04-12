import { useMemo } from "react";
import { FlatList } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";

import { Transaction } from "@/types/transaction";
import { useDeleteTransaction } from "@/hooks/use-delete-transaction";

import { SwipeRow } from "./components/swipe-row";
import { AggregationItem } from "./components/aggregation-item";
import { styles } from "./styles";

type ListItem = 
| { type: "aggregation"; aggregationId: string; transactions: Transaction[] }
| { type: "transaction"; transaction: Transaction };

type TransactionsListProps = {
	transactions: Transaction[],
	onViewDetails: (item: Transaction) => void,
	onEdit: (id: string) => void,
}

const TransactionsList = ({ 
	transactions,
	onViewDetails,
	onEdit
}: TransactionsListProps) => {
	const {	onConfirmDelete } = useDeleteTransaction();

	const listItems = useMemo(() => {
		const items: ListItem[] = [];
		const grouped: Record<string, Transaction[]> = {};
	
		transactions.forEach((transaction) => {
			if (transaction.aggregationId) {
				if (!grouped[transaction.aggregationId]) grouped[transaction.aggregationId] = [];
				grouped[transaction.aggregationId].push(transaction);
			} else {
				items.push({ 
					type: "transaction", 
					transaction 
				});
			}
		});
	
		Object.entries(grouped).forEach(([aggregationId, groupedTransactions]) => {
			items.push({
				type: "aggregation",
				aggregationId,
				transactions: groupedTransactions,
			});
		});
	
		return items;
	}, [transactions]);

	return (
		<PanGestureHandler
			activeOffsetY={[-10, 10]}
			activeOffsetX={[-10, 10]}
		>
			<FlatList
				style={styles.list}
				data={listItems}
				keyExtractor={(item) =>
					item.type === "transaction"
						? item.transaction.id
						: `aggregation-${item.aggregationId}`
				}
				renderItem={({ item }) => {
					if (item.type === "transaction") {
						return (
							<SwipeRow
								item={item.transaction}
								onEdit={() => onEdit(item.transaction.id)}
								onDelete={() => onConfirmDelete(item.transaction)}
								onPress={() => onViewDetails(item.transaction)}
							/>
						);
					}

					return (
						<AggregationItem 
							item={item} 
							onEdit={onEdit}
							onDelete={onConfirmDelete}
							onViewDetails={onViewDetails}				
						/>
					);
				}}
				showsVerticalScrollIndicator={false}
			/>
		</PanGestureHandler>
	);
};

export { TransactionsList };
