import { Text, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

import { styles } from "./styles";

type CategoryCardProps = {
	category: { id: string; name: string };
	checked: boolean;
	onToggle: (id: string) => void;
};

const CategoryCard = ({ category, checked, onToggle }: CategoryCardProps) => {
	return (
		<TouchableOpacity style={styles.card} onPress={() => onToggle(category.id)}>
			<Text style={styles.label}>{category.name}</Text>
			<Feather
				name={checked ? "check-square" : "square"}
				size={24}
				color="#3b3dbf"
			/>
		</TouchableOpacity>
	);
};

export { CategoryCard };
