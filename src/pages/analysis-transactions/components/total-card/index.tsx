import { Feather } from "@expo/vector-icons";
import { Text, View } from "react-native";

import { Analytics } from "@/types/analytics";

import { styles } from "./styles";
import { formatCurrency } from "@/utils/format-currency";

interface TotalCardProps {
	analytics: Analytics
}

const TotalCard = ({ analytics }: TotalCardProps) => {
	const formattedTotalSum = formatCurrency(analytics.total.sum ?? 0);

	return (
		<View style={styles.card}>
			<Text style={styles.title}>
				<Feather name="bar-chart-2" size={16} /> Resumo Geral
			</Text>
			<View style={styles.row}>
				<View style={styles.iconLabel}>
					<Feather name="list" size={18} />
					<Text style={styles.label}>Transações</Text>
				</View>
				<Text style={styles.value}>{analytics.total.count ?? 0}</Text>
			</View>
			<View style={styles.row}>
				<View style={styles.iconLabel}>
					<Feather name="dollar-sign" size={18} />
					<Text style={styles.label}>Total</Text>
				</View>
				<Text style={styles.value}>R$ {formattedTotalSum ?? 0}</Text>
			</View>
		</View>
	);
};

export { TotalCard };
