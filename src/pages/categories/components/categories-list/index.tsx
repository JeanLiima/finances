import { useMemo, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";

import { Category } from "@/types/category";

import { CategoryCard } from "./components/category-card";
import { NewCategoryCard } from "./components/new-category-card";
import { RegisterCategoryModal } from "./components/register-category-modal";

import { styles } from "./styles";
import { EditCategoryModal } from "./components/edit-category-modal";
import { useCategories } from "@/hooks/use-categories";
import { SwipeListView } from "react-native-swipe-list-view";
import { SwipeOptions } from "@/components/swipe-options";

type CategoriesListProps = {
	categories: Category[],
	onEdit: VoidFunction
};

const CategoriesList = ({ 
	categories,
	onEdit
}: CategoriesListProps) => {
	const [isCategoryToRegisterOpen, setIsCategoryToRegisterOpen] = useState<boolean>(false);
	const [categoryToEdit, setCategoryToEdit] = useState<Category | null>(null);

	const hasLimitOfCategories = useMemo(() => categories.length === 20, []);
	
	const { 
		onEditCategory,
		onRegisterCategory,
		onDeleteCategory
	} = useCategories();

	return (
		<View style={styles.container}>
			<TouchableOpacity
				style={styles.editButton}
				onPress={onEdit}
			>
				<Feather name="edit" size={16} color="#FFF" />
			</TouchableOpacity>
			<SwipeListView
				style={styles.list}
				data={categories}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => <CategoryCard category={item} />}
				renderHiddenItem={({ item }, rowMap) => (
					<SwipeOptions
						itemId={item.id}
						rowMap={rowMap}
						onEdit={() => setCategoryToEdit(item)}
						onDelete={() => onDeleteCategory(item.id)}
					/>
				)}
				ListFooterComponent={!hasLimitOfCategories ? <NewCategoryCard onNew={() => setIsCategoryToRegisterOpen(true)}/> : <></>}
				swipeToOpenPercent={20}
				rightOpenValue={-165}
				disableRightSwipe
				showsVerticalScrollIndicator={false}
			/>
			<EditCategoryModal 
				data={categoryToEdit} 
				onSubmit={onEditCategory}
				onClose={() => setCategoryToEdit(null)}
			/>
			<RegisterCategoryModal 
				isOpen={isCategoryToRegisterOpen}
				onSubmit={onRegisterCategory}
				onClose={() => setIsCategoryToRegisterOpen(false)}
			/>
		</View>
	);
};

export { CategoriesList };
