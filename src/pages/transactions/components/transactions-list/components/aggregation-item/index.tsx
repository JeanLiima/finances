import { useMemo, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { AntDesign } from '@expo/vector-icons';

import { formatCurrency } from "@/utils/format-currency";
import { Transaction } from "@/types/transaction";
import { useAggregations } from "@/hooks/use-aggregations";
import { PAID_STATUS } from "@/constants/paid-status";

import { SwipeRow } from "../swipe-row";
import { PaidStatusButton } from "./components/paid-status-button";
import { styles } from "./styles";

type ListItem = { type: "aggregation"; aggregationId: string; transactions: Transaction[] };

interface AggregationItemProps {
	item: ListItem, 
	onEdit: (id: string) => void,
	onDelete: (item: Transaction) => void,
	onViewDetails: (item: Transaction) => void,
};

const AGGREGATION_ROW_RIGHT_OPEN = -165;

const AggregationItem = ({ item, onEdit, onDelete, onViewDetails }: AggregationItemProps) => {
	const [isChildrenOpen, setIsChildrenOpen] = useState<boolean>(false);
	const  { aggregations } = useAggregations();

	const aggregationMap = useMemo(() => {
		return aggregations.reduce((acc, agg) => {
			acc[agg.id] = agg.name;
			return acc;
		}, {} as Record<string, string>);
	}, [aggregations]);

	const generalStatus = useMemo(() => {
		const unpaidTransactions = item.transactions.filter(transaction => transaction.status === PAID_STATUS.UNPAID);
		if(unpaidTransactions.length === 0) return PAID_STATUS.PAID;
		return PAID_STATUS.UNPAID
	}, [item]);

	const totalAmount = useMemo(() => {
		 return formatCurrency(item.transactions.reduce((sum, transaction) => sum + transaction.amount, 0));
	}, [item]);

	return (
		<View style={styles.aggregationCard}>
			<View style={styles.container}>
				<TouchableOpacity style={styles.dataContent} onPress={() => setIsChildrenOpen(current => !current)}>
					<PaidStatusButton items={item.transactions} status={generalStatus} />
					<View style={styles.textContent}>
						<Text style={[styles.item, { flexShrink: 1 }]} numberOfLines={1}>
							{aggregationMap[item.aggregationId] ?? "Agrupamento"}
						</Text>
						<Text style={[styles.item, {color: "#E83F5B"}]}>R$ -{totalAmount}</Text>
					</View>
					<AntDesign name={isChildrenOpen ? 'down' : 'up'} size={16} color="#000" />
				</TouchableOpacity>
			</View>
			{isChildrenOpen && (
				<View style={styles.aggregationChildren}>
					{item.transactions.map((transaction) => (
						<SwipeRow
							key={transaction.id}
							item={transaction}
							onEdit={() => onEdit(transaction.id)}
							onDelete={() => onDelete(transaction)}
							onPress={() => onViewDetails(transaction)}
							rightOpenValue={AGGREGATION_ROW_RIGHT_OPEN}
						/>
					))}
				</View>
			)}
		</View>
	)
};

export { AggregationItem };
