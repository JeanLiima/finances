import { useState } from "react";
import { View } from "react-native";

import { CategoryAllocation } from "./components/categories-allocation";
import { CategoriesSelection } from "./components/categories-selections";

import { styles } from "./styles";

const mockCategories = [
	{ id: "1", name: "Alimentação", percentage: 0 },
	{ id: "2", name: "Transporte", percentage: 0 },
	{ id: "3", name: "Lazer", percentage: 0 },
];

const Categories = () => {
	const [selectedIds, setSelectedIds] = useState<string[]>([]);
	const [currentStep, setCurrentStep] = useState<1 | 2>(1);

	const handleNextStep = (newSelectedIds: string[]) => {
		setSelectedIds(newSelectedIds);
		setCurrentStep(2);
	};

	const selectedCategories = mockCategories.filter((cat) => selectedIds.includes(cat.id));

	return (
		<View style={styles.container}>
			{currentStep === 1 ? (
				<CategoriesSelection 
					categories={mockCategories}
					onNext={handleNextStep}
				/>
			) : (
				<CategoryAllocation
					selectedCategories={selectedCategories}
					onBack={() => setCurrentStep(1)}
				/>
			)}
		</View>
	);
};

export { Categories };
