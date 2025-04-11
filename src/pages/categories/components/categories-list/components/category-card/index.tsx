import { Text, View } from "react-native";

import { Category } from "@/types/category";

import { styles } from "./styles";

type CategoryCardProps = {
	category: Category
};

const CategoryCard = ({ category }: CategoryCardProps) => (
	<View style={styles.card} >
		<Text style={styles.label}>{category.name}</Text>
		<Text style={styles.label}>{`${category.percentage}%`}</Text>
	</View>
);

export { CategoryCard };
