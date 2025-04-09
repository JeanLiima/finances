import { Feather, FontAwesome5 } from "@expo/vector-icons";
import { Text, View } from "react-native";

import { Analytics } from "@/types/analytics";

import { styles } from "./styles";
import { formatCurrency } from "@/utils/format-currency";

interface TypesCardProps {
	analytics: Analytics
}

const TypesCard = ({ analytics }: TypesCardProps) => {
	const income = analytics?.types.income ?? 0;
	const expense = analytics?.types.expense ?? 0;
	const total = income + expense;

	const percentIncome = total ? (income / total) * 100 : 0;
	const percentExpense = total ? (expense / total) * 100 : 0;

	const formattedIncome = formatCurrency(income ?? 0);
	const formattedExpense = formatCurrency(expense ?? 0);

	return (
		<View style={styles.card}>
			<Text style={styles.title}>
				<FontAwesome5 name="wallet" size={16} /> Tipos de Transação
			</Text>

			<View style={styles.iconLabel}>
				<Feather name="arrow-down-circle" size={16} color="#4caf50" />
				<Text style={styles.label}>Receita</Text>
			</View>
			<View style={styles.progressBar}>
				<View style={[styles.progressFill, { width: `${percentIncome}%`, backgroundColor: '#4caf50' }]} />
			</View>
			<Text style={styles.value}>R$ {formattedIncome ?? 0}</Text>

			<View style={[styles.iconLabel, { marginTop: 12 }]}>
				<Feather name="arrow-up-circle" size={16} color="#f44336" />
				<Text style={styles.label}>Despesa</Text>
			</View>
			<View style={styles.progressBar}>
				<View style={[styles.progressFill, { width: `${percentExpense}%`, backgroundColor: '#f44336' }]} />
			</View>
			<Text style={styles.value}>R$ {formattedExpense ?? 0}</Text>
		</View>
	);
};

export { TypesCard };
