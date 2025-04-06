import { Text, TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";

import { TRANSACTIONS_TYPES } from "@/constants/transaction-types";
import { formatCurrency } from "@/utils/format-currency";

import { Transaction } from "../../hooks/use-transactions";

import { PaidStatusButton } from "./components/paid-status-button";
import { styles } from "./styles";

interface TransactionItemProps {
  data: Transaction,
  onViewDetails: VoidFunction
};

const TransactionItem = ({ data, onViewDetails }: TransactionItemProps) => {
	const isIncomeType = data.type === TRANSACTIONS_TYPES.INCOME;
	const formattedValue = formatCurrency(data.value);

	return (
		<View style={styles.container}>
			<PaidStatusButton status={data.status} id={data.id} />
			<TouchableOpacity style={styles.dataContent} onPress={onViewDetails}>
				<Feather 
					style={{ marginRight: 10, left: 10 }}
					name={isIncomeType ? "arrow-down-circle" : "arrow-up-circle"} 
					size={20} 
					color={isIncomeType ? "#12A454" : "#E83F5B"} 
					/>
				<View style={styles.textContent}>
					<Text style={[styles.item, { flexShrink: 1 }]} numberOfLines={1}>{data.description}</Text>
					<Text style={[styles.item, {color: isIncomeType ? "#12A454" : "#E83F5B"}]}>{!isIncomeType && "-"}R${formattedValue}</Text>
				</View>
			</TouchableOpacity>
		</View>
	)
};

export { TransactionItem };
