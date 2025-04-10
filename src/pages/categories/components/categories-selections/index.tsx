import { useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

import { CategoryCard } from "./components/category-card";

import { styles } from "./styles";

type CategoriesSelectionProps = {
	categories: { id: string; name: string, percentage: number }[];
	onNext: (newSelectedIds: string[]) => void;
};

const CategoriesSelection = ({ 
	categories, 
	onNext,
}: CategoriesSelectionProps) => {
	const [selectedIds, setSelectedIds] = useState<string[]>([]);

	const handleSelectCategory = (id: string) => {
		setSelectedIds((prev) =>
			prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
		);
	};

	return (
		<View style={styles.container}>
		<FlatList
			data={categories}
			keyExtractor={(item) => item.id}
			renderItem={({ item }) => (
				<CategoryCard
					category={item}
					checked={selectedIds.includes(item.id)}
					onToggle={handleSelectCategory}
				/>
			)}
			contentContainerStyle={{ paddingBottom: 16 }}
			ListFooterComponent={<View style={{ height: 140 }} />}
		/>
		<TouchableOpacity
			style={[styles.advanceButton, selectedIds.length === 0 && styles.disabled]}
			onPress={() => onNext(selectedIds)}
			disabled={selectedIds.length === 0}
		>
			<Text style={styles.advanceButtonText}>Avançar</Text>
		</TouchableOpacity>
	</View>
	);
};

export { CategoriesSelection };
