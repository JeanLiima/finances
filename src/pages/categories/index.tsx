import { useState } from "react";
import { View } from "react-native";

import { Loading } from "@/components/loading";
import { useCategories } from "@/hooks/use-categories";

import { CategoryAllocation } from "./components/categories-allocation";
import { CategoriesSelection } from "./components/categories-selections";

import { CategoriesList } from "./components/categories-list";
import { styles } from "./styles";

const Categories = () => {
	const [selectedIds, setSelectedIds] = useState<string[]>([]);
	const [currentStep, setCurrentStep] = useState<1 | 2>(1);
	const [isEditing, setIsEditing] = useState<boolean>(false);

	const { 
		isLoadingCategories,
		categories,
		onUpdateCategoryPercentages
	} = useCategories();

	const handleNextStep = (newSelectedIds: string[]) => {
		setSelectedIds(newSelectedIds);
		setCurrentStep(2);
	};

	const handleSave = (percentages: Record<string, number>) => {
		onUpdateCategoryPercentages(percentages);
		setIsEditing(false);
		setCurrentStep(1);
	};

	const selectedCategories = categories.filter((cat) => selectedIds.includes(cat.id));

	if (isLoadingCategories) {
		return (
			<Loading />
		);
	}

	if(isEditing) {
		return (
			<View style={styles.container}>
				{currentStep === 1 ? (
					<CategoriesSelection 
						categories={categories}
						onNext={handleNextStep}
						onBack={() => setIsEditing(false)}
					/>
				) : (
					<CategoryAllocation
						selectedCategories={selectedCategories}
						onBack={() => setCurrentStep(1)}
						onSave={handleSave}
					/>
				)}
			</View>
		);
	}

	return (
		<CategoriesList 
			categories={categories} 
			onEdit={() => setIsEditing(true)}
		/>
	);
};

export { Categories };
