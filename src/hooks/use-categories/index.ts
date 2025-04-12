import { useCallback, useEffect, useState } from "react";
import { doc, getDoc, getDocs, writeBatch } from "firebase/firestore";

import { useCategoriesRef } from "@/hooks/use-categories-ref";
import { Category } from "@/types/category";
import { db } from "@/services/firebase-connection";

const DEFAULT_CATEGORIES = [
	{ name: "Despesas essenciais", percentage: 50 },
	{ name: "Despesas variáveis", percentage: 30 },
	{ name: "Prioridades financeiras", percentage: 20 }
];

const useCategories = () => {
	const [isLoadingCategories, setIsLoadingCategories] = useState<boolean>(true);
	const [categories, setCategories] = useState<Category[]>([]);

	const { categoriesCollection, categoriesDoc } = useCategoriesRef();

	const getCategories = useCallback(async () => {
		if(!categoriesCollection) return;

		setIsLoadingCategories(true);
	  
		const snapshot = await getDocs(categoriesCollection);
	  
		if (snapshot.empty) {
			const batch = writeBatch(db);
		
			DEFAULT_CATEGORIES.forEach((cat) => {
				const newRef = doc(categoriesCollection);
				batch.set(newRef, cat);
			});
		
			await batch.commit();
		
			const newSnapshot = await getDocs(categoriesCollection);
		
			const list = newSnapshot.docs.map((doc) => ({
				id: doc.id,
				...(doc.data() as Omit<Category, "id">),
			}));
		
			setCategories(list);
			setIsLoadingCategories(false);
			return;
		}
	  
		const list = snapshot.docs.map((doc) => ({
			id: doc.id,
			...(doc.data() as Omit<Category, "id">),
		}));
	  
		setCategories(list);
		setIsLoadingCategories(false);
	}, []);

	const getCategoryById = async (id: string): Promise<Category | null> => {
		const categoryRef = categoriesDoc(id);
		if (!categoryRef) return null;
	
		const categorySnap = await getDoc(categoryRef);
	
		if (!categorySnap.exists()) return null;
	
		return {
			id: categorySnap.id,
			...(categorySnap.data() as Omit<Category, "id">),
		};
	};

	const onUpdateCategoryPercentages = async (
		updates: Record<string, number>
	) => {
		const batch = writeBatch(db);
	  
		categories.forEach((category) => {
		  const categoriesRef = categoriesDoc(category.id);
		  if(!categoriesRef) return;
		  const newPercentage = updates[category.id] ?? 0;
		  batch.update(categoriesRef, { percentage: newPercentage });
		});
	  
		await batch.commit();

		getCategories();
	};

	useEffect(() => {
		getCategories();
	}, []);

	return {
		isLoadingCategories,
		categories,
		onUpdateCategoryPercentages,
		getCategoryById,
	}
};

export { useCategories };
