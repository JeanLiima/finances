import { Feather } from "@expo/vector-icons";
import { Text, View } from "react-native";

import { TRANSACTIONS_TYPES } from "@/constants/transaction-types";

import { styles } from "./styles";

interface TransactionTypeBadgeProps {
	type: TRANSACTIONS_TYPES
}

const TransactionTypeBadge = ({ type }: TransactionTypeBadgeProps) => {
	const isIncomeType = type === TRANSACTIONS_TYPES.INCOME;

	return (
		<View 
			style={[
				styles.badge,
				{
					borderColor: isIncomeType ? "#12A454" : "#E83F5B",
					backgroundColor: isIncomeType ? "#12A45420" : "#E83F5B20",
				}
			]}
		>
			<Feather
				name={isIncomeType ? "arrow-down-circle" : "arrow-up-circle"} 
				size={20} 
				color={isIncomeType ? "#12A454" : "#E83F5B"} 
			/>
			<Text 
				style={[
					styles.badgeText, 
					{color: isIncomeType ? "#12A454" : "#E83F5B"}
				]}
			>
				{isIncomeType ? "Entrada" : "Saída"}
			</Text>
		</View>
	);
};

export { TransactionTypeBadge };
