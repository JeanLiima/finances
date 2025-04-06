import { Text, View } from "react-native";

import { Transaction } from "../../hooks/use-transactions";

import { PaidStatusButton } from "./components/paid-status-button";
import { styles } from "./styles";
import { Feather } from "@expo/vector-icons";
import { TRANSACTIONS_TYPES } from "@/constants/transaction-types";

interface TransactionItemProps {
  data: Transaction
};

const TransactionItem = ({ data }: TransactionItemProps) => {
	const isIncomeType = data.type === TRANSACTIONS_TYPES.INCOME;
	return (
		<View style={styles.container}>
			<PaidStatusButton status={data.status} id={data.id} />
			<Feather 
				style={{ marginRight: 20, left: 15 }}
				name={isIncomeType ? "arrow-down-circle" : "arrow-up-circle"} 
				size={20} 
				color={isIncomeType ? "#12A454" : "#E83F5B"} 
			/>
			<View style={styles.content}>
				<Text style={[styles.item, { flexShrink: 1 }]} numberOfLines={1}>{data.description}</Text>
				<Text style={styles.item}>R$ {data.value.toString().replace('.', ',')}</Text>
			</View>
		</View>
	)
};

export { TransactionItem };
