import { Feather } from "@expo/vector-icons";
import { Text, View } from "react-native";

import { Analytics } from "@/types/analytics";

import { styles } from "./styles";
import { formatCurrency } from "@/utils/format-currency";

interface StatusCardProps {
	analytics: Analytics
}

const StatusCard = ({ analytics }: StatusCardProps) => {
	const formattedStatusPaid = formatCurrency(analytics.status.paid ?? 0);
	const formattedStatusUnpaid = formatCurrency(analytics.status.unpaid ?? 0);

	return (
		<View style={styles.card}>
			<Text style={styles.title}>
				<Feather name="activity" size={16} /> Status de Pagamento
			</Text>
			<View style={styles.row}>
				<View style={styles.iconLabel}>
					<Feather name='check-circle' size={18} color="#4CAF50" />
					<Text style={styles.label}>Pago</Text>
				</View>
				<Text style={styles.value}>R$ {formattedStatusPaid ?? 0}</Text>
			</View>
			<View style={styles.row}>
				<View style={styles.iconLabel}>
					<Feather name='alert-circle' size={18} color="#FFC107" />
					<Text style={styles.label}>Pendente</Text>
				</View>
				<Text style={styles.value}>R$ {formattedStatusUnpaid ?? 0}</Text>
			</View>
		</View>
	);
};

export { StatusCard };
