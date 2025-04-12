import { useCallback, useEffect, useState } from "react";
import { deleteDoc, doc, getDoc, getDocs, setDoc, updateDoc, writeBatch } from "firebase/firestore";

import { useAggregationsRef } from "@/hooks/use-aggregations-ref";
import { Aggregation } from "@/types/aggregation";
import { db } from "@/services/firebase-connection";

const DEFAULT_AGGREGATIONS = [
	{ name: "Cartão (Nubank)" },
	{ name: "Cartão (Itaú)" }
];

const useAggregations = () => {
	const [isLoadingAggregations, setIsLoadingAggregations] = useState<boolean>(true);
	const [aggregations, setAggregations] = useState<Aggregation[]>([]);

	const { aggregationsCollection, aggregationsDoc } = useAggregationsRef();

	const getAggregations = useCallback(async () => {
		if(!aggregationsCollection) return;

		setIsLoadingAggregations(true);
	  
		const snapshot = await getDocs(aggregationsCollection);
	  
		if (snapshot.empty) {
			const batch = writeBatch(db);
		
			DEFAULT_AGGREGATIONS.forEach((agg) => {
				const newRef = doc(aggregationsCollection);
				batch.set(newRef, agg);
			});
		
			await batch.commit();
		
			const newSnapshot = await getDocs(aggregationsCollection);
		
			const list = newSnapshot.docs.map((doc) => ({
				id: doc.id,
				...(doc.data() as Omit<Aggregation, "id">),
			}));
		
			setAggregations(list);
			setIsLoadingAggregations(false);
			return;
		}
	  
		const list = snapshot.docs.map((doc) => ({
			id: doc.id,
			...(doc.data() as Omit<Aggregation, "id">),
		}));
	  
		setAggregations(list);
		setIsLoadingAggregations(false);
	}, []);

	useEffect(() => {
		getAggregations();
	}, []);

	const getAggregationById = async (id: string): Promise<Aggregation | null> => {
		const aggregationRef = aggregationsDoc(id);
		if (!aggregationRef) return null;
	
		const aggregationSnap = await getDoc(aggregationRef);
	
		if (!aggregationSnap.exists()) return null;
	
		return {
			id: aggregationSnap.id,
			...(aggregationSnap.data() as Omit<Aggregation, "id">),
		};
	};

	const onEditAggregation = async (id: string, newName: string) => {
		const aggregationRef = aggregationsDoc(id);
		if (!aggregationRef) return;
	
		await updateDoc(aggregationRef, { name: newName });
	
		getAggregations();
	};

	const onDeleteAggregation = async (id: string) => {
		const aggregationRef = aggregationsDoc(id);
		if (!aggregationRef) return;
	
		await deleteDoc(aggregationRef);
	
		getAggregations();
	};

	const onRegisterAggregation = async (name: string) => {
		if(!aggregationsCollection) return;
		const newAggregationRef = doc(aggregationsCollection);
		
		await setDoc(newAggregationRef, {
			name
		});
	
		getAggregations();
	};

	return {
		isLoadingAggregations,
		aggregations,
		onEditAggregation,
		onDeleteAggregation,
		getAggregationById,
		onRegisterAggregation
	}
};

export { useAggregations };
