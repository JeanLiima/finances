import { useState } from "react";
import { View, FlatList } from "react-native";

import { AllocationCard } from "./components/allocation-card";
import { Footer } from "./components/footer";
import { styles } from "./styles";

type CategoryAllocationProps = {
	selectedCategories: { id: string; name: string, percentage: number }[];
	onBack: () => void;
};

const CategoryAllocation = ({ selectedCategories, onBack }: CategoryAllocationProps) => {
	const [percentages, setPercentages] = useState(
		selectedCategories.reduce(
			(acc, cat) => ({ ...acc, [cat.id]: 0 }),
			{} as Record<string, number>
		)
	);

	const total = Object.values(percentages).reduce((sum, val) => sum + val, 0);

	const handleChange = (id: string, amount: number) => {
		setPercentages((prev) => {
			const current = prev[id];
			const newValue = Math.max(0, Math.min(100, current + amount));
			const newTotal = total - current + newValue;

			if (newTotal > 100) return prev;

			return { ...prev, [id]: newValue };
		});
	};

	return (
		<View style={styles.container}>
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
			<Footer total={total} onBack={onBack} />
		</View>
	);
};

export { CategoryAllocation };
