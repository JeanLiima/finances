import { View, Text } from "react-native";
import { Feather } from "@expo/vector-icons";

import { Analytics } from "@/types/analytics";
import { styles } from "./styles";
import { formatCurrency } from "@/utils/format-currency";
import { Category } from "@/types/category";

interface CategoryCardProps {
	analytics: Analytics;
	categories: Category[]
}

const CategoryCard = ({
	analytics,
	categories,
}: CategoryCardProps) => {
	const totalIncome = analytics.types.income ?? 0;
	console.log(analytics);

	return (
		<View style={styles.card}>
			<Text style={styles.title}><Feather name="pie-chart" size={16} /> Categorias</Text>

			{categories.map(({ id, name, percentage }) => {
				if (percentage === 0) return null;

				const allocated = (percentage / 100) * totalIncome;
				const spent = analytics.categories?.[id] ?? 0;
				const available =  allocated - spent;
				const isDebit = available < 0;

				const formattedAllocated = formatCurrency(allocated);
				const formattedSpent = formatCurrency(spent);
				const formattedAvailable = formatCurrency(available);

				return (
					<View style={styles.subCard} key={id}>
						<View style={styles.subCardHeader}>
							<View style={styles.iconLabel}>
								<Feather name="tag" size={18} color="#2196F3" />
								<Text numberOfLines={1} style={styles.label}>{name}</Text>
							</View>
							<Text style={styles.percentageText}>{percentage}%</Text>
						</View>

						<View style={styles.subCardRow}>
							<Text style={styles.subCardLabel}>Alocado:</Text>
							<Text style={styles.value}>R$ {formattedAllocated ?? 0}</Text>
						</View>

						<View style={styles.subCardRow}>
							<Text style={styles.subCardLabel}>Gasto:</Text>
							<Text style={styles.value}>R$ {formattedSpent ?? 0}</Text>
						</View>
						<View style={styles.subCardRow}>
							<Text style={styles.subCardLabel}>Disponível:</Text>
							<Text 
								style={[
									styles.value,
									{
										color: isDebit ? "#E83F5B" : "#12A454",
									}
								]}
							>
								R$ {formattedAvailable ?? 0}
							</Text>
						</View>
					</View>
				);
			})}
		</View>
	);
};

export { CategoryCard };
