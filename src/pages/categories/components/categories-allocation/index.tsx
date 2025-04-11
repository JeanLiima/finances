import { useState } from "react";
import { View, FlatList, Text } from "react-native";

import { Category } from "@/types/category";

import { AllocationCard } from "./components/allocation-card";
import { Footer } from "./components/footer";
import { styles } from "./styles";

type CategoryAllocationProps = {
	selectedCategories: Category[],
	onBack: VoidFunction,
	onSave: (percentages: Record<string, number>) => void
};

const CategoryAllocation = ({ selectedCategories, onBack, onSave }: CategoryAllocationProps) => {
	const [percentages, setPercentages] = useState<Record<string, number>>(
		() => selectedCategories.reduce((acc, cat) => ({ ...acc, [cat.id]: cat.percentage }), {})
	);

	const handleChange = (id: string, amount: number) => {
		setPercentages((prev) => {
			const current = prev[id];
			const newValue = Math.max(0, Math.min(100, current + amount));
			const newTotal =
			Object.values(prev).reduce((sum, val) => sum + val, 0) - current + newValue;
		
			if (newTotal > 100) return prev;
		
			return { ...prev, [id]: newValue };
		});
	};
	  
	const total = Object.values(percentages).reduce((sum, val) => sum + val, 0);

	return (
		<View style={styles.container}>
			<Text style={styles.label}>Selecione as categorias</Text>
			<FlatList
				data={selectedCategories}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => (
					<AllocationCard
						category={item}
						percentage={percentages[item.id]}
						onChange={handleChange}
						disabledAdd={total >= 100 || percentages[item.id] >= 100}
						disabledRemove={percentages[item.id] <= 0}
					/>
				)}
				contentContainerStyle={{ paddingBottom: 16 }}
				ListFooterComponent={<View style={{ height: 140 }} />}
			/>
			<Footer total={total} onBack={onBack} onSave={() => onSave(percentages)} />
		</View>
	);
};

export { CategoryAllocation };
