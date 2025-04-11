import { FlatList, TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";

import { Category } from "@/types/category";

import { CategoryCard } from "./components/category-card";

import { styles } from "./styles";

type CategoriesListProps = {
	categories: Category[],
	onEdit: VoidFunction
};

const CategoriesList = ({ 
	categories,
	onEdit
}: CategoriesListProps) => (
	<View style={styles.container}>
		<TouchableOpacity
			style={styles.editButton}
			onPress={onEdit}
		>
			<Feather name="edit" size={16} color="#3b3dbf" />
		</TouchableOpacity>
		<FlatList
			data={categories}
			keyExtractor={(item) => item.id}
			renderItem={({ item }) => (
				<CategoryCard category={item} />
			)}
			contentContainerStyle={{ paddingBottom: 16 }}
			ListFooterComponent={<View style={{ height: 140 }} />}
		/>
	</View>
);

export { CategoriesList };
