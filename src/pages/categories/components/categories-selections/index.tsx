import { useState } from "react";
import { FlatList, Text, View } from "react-native";

import { Category } from "@/types/category";

import { CategoryCard } from "./components/category-card";
import { styles } from "./styles";
import { Footer } from "./components/footer";

type CategoriesSelectionProps = {
	categories: Category[],
	onNext: (newSelectedIds: string[]) => void,
	onBack: VoidFunction
};

const CategoriesSelection = ({ 
	categories, 
	onNext,
	onBack
}: CategoriesSelectionProps) => {
	const [selectedIds, setSelectedIds] = useState<string[]>([]);

	const handleSelectCategory = (id: string) => {
		setSelectedIds((prev) =>
			prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
		);
	};

	return (
		<View style={styles.container}>
			<Text style={styles.label}>Selecione as categorias</Text>
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
			<Footer 
				isDisabled={selectedIds.length === 0}
				onNext={() => onNext(selectedIds)}
				onBack={onBack}
			/>
		</View>
	);
};

export { CategoriesSelection };
