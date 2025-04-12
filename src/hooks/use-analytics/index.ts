import { runTransaction } from "firebase/firestore";

import { Transaction } from "@/types/transaction";
import { db } from "@/services/firebase-connection";

import { useAnalyticsRef } from "../use-analytics-ref";

type AnalyticsData = Pick<Transaction, 'amount' | 'yearMonth' | 'type' | 'status' | 'categoryId'>;
type AnalyticsUpdate = {
	oldData: AnalyticsData;
	newData: AnalyticsData;
};

const useAnalytics = () => {
	const { analyticsDoc } = useAnalyticsRef();
	
	const onDeleteAnalytics = async (
		data: AnalyticsData
	): Promise<void> => {
		const { yearMonth, amount, type, status, categoryId } = data;
		const analyticsRef = analyticsDoc(yearMonth);
		if (!analyticsRef) return;
	
		await runTransaction(db, async (analytics) => {
			const analyticsSnap = await analytics.get(analyticsRef);
	
			if (!analyticsSnap.exists()) return;
	
			const analytic = analyticsSnap.data();
	
			const types = analytic.types || {};
			const statusAgg = analytic.status || {};
			const total = analytic.total || { count: 0, sum: 0 };
			const categoryAgg = analytic.categories || {};
	
			// TYPES
			const newTypes = {
				...types,
				[type]: Math.max((types[type] || 0) - amount, 0),
			};
	
			//STATUS
			const newStatus = {
				...statusAgg,
				[status]: Math.max((statusAgg[status] || 0) - amount, 0),
			};

			// CATEGORIES
			const newCategories = { ...categoryAgg };
			if (categoryId) {
				newCategories[categoryId] = Math.max(
					(categoryAgg[categoryId] || 0) - amount,
					0
				);
			}
	
			//TOTAL
			const newTotal = {
				count: Math.max(total.count - 1, 0),
				sum: Math.max(total.sum - amount, 0),
			};
	
			analytics.set(
				analyticsRef,
				{
					types: newTypes,
					status: newStatus,
					categories: newCategories,
					total: newTotal,
					updatedAt: new Date(),
				},
				{ merge: true }
			);
		});
	};

	const onRegisterAnalytics = async (
		data: AnalyticsData
	): Promise<void> => {
		const { yearMonth, amount, type, status, categoryId  } = data;
		const analyticsRef = analyticsDoc(yearMonth);
		if (!analyticsRef) return;
	
		await runTransaction(db, async (analytics) => {
			const analyticsSnap = await analytics.get(analyticsRef);
	
			const analytic = analyticsSnap.exists() ? analyticsSnap.data() : {};
	
			const types = analytic.types || {};
			const statusAgg = analytic.status || {};
			const total = analytic.total || { count: 0, sum: 0 };
			const categoryAgg = analytic.categories || {};
	
			//TYPES
			const newTypes = {
				...types,
				[type]: (types[type] || 0) + amount,
			};
	
			//STATUS
			const newStatus = {
				...statusAgg,
				[status]: (statusAgg[status] || 0) + amount,
			};
	
			//TOTAL
			const newTotal = {
				count: total.count + 1,
				sum: total.sum + amount,
			};

			//CATEGORIES
			const newCategories = categoryId
			? {
					...categoryAgg,
					[categoryId]: (categoryAgg[categoryId] || 0) + amount,
				}
			: categoryAgg;
	
			analytics.set(
				analyticsRef,
				{
					types: newTypes,
					status: newStatus,
					total: newTotal,
					categories: newCategories,
					updatedAt: new Date(),
				},
				{ merge: true }
			);
		});
	};

	const onUpdateAnalytics = async (
		oldData: AnalyticsData,
		newData: AnalyticsData
	): Promise<void> => {
		const changedMonth = oldData.yearMonth !== newData.yearMonth;
	
		if (changedMonth) {
			await Promise.all([
				onDeleteAnalytics(oldData),
				onRegisterAnalytics(newData),
			]);
		} else {
			const analyticsRef = analyticsDoc(newData.yearMonth);
			if (!analyticsRef) return;
	
			await runTransaction(db, async (analytics) => {
				const analyticsSnap = await analytics.get(analyticsRef);
	
				if (!analyticsSnap.exists()) return;
	
				const analytic = analyticsSnap.data();
				const types = analytic.types || {};
				const statusAgg = analytic.status || {};
				const total = analytic.total || { count: 0, sum: 0 };
				const categoryAgg = analytic.categories || {};
	
				// TYPES
				const newTypes = { ...types };
				if (oldData.type !== newData.type) {
					newTypes[oldData.type] = Math.max((types[oldData.type] || 0) - oldData.amount, 0);
					newTypes[newData.type] = (types[newData.type] || 0) + newData.amount;
				} else {
					newTypes[oldData.type] = Math.max((types[oldData.type] || 0) - oldData.amount + newData.amount, 0);
				}
				
				// STATUS
				const newStatus = { ...statusAgg };
				if (oldData.status !== newData.status) {
					newStatus[oldData.status] = Math.max((statusAgg[oldData.status] || 0) - oldData.amount, 0);
					newStatus[newData.status] = (statusAgg[newData.status] || 0) + newData.amount;
				} else {
					newStatus[oldData.status] = Math.max((statusAgg[oldData.status] || 0) - oldData.amount + newData.amount, 0);
				}

				// CATEGORIES
				const newCategories = { ...categoryAgg };
				if (oldData.categoryId) {
					newCategories[oldData.categoryId] = Math.max(
						(categoryAgg[oldData.categoryId] || 0) - oldData.amount,
						0
					);
				}
				if (newData.categoryId) {
					newCategories[newData.categoryId] = 
						(newCategories[newData.categoryId] || 0) + newData.amount;
				}
	
				// TOTAL
				const newTotal = {
					count: total.count,
					sum: Math.max(total.sum - oldData.amount + newData.amount, 0),
				};
	
				analytics.set(
					analyticsRef,
					{
						types: newTypes,
						status: newStatus,
						categories: newCategories,
						total: newTotal,
						updatedAt: new Date(),
					},
					{ merge: true }
				);
			});
		}
	};

	const onBatchUpdateAnalytics = async (updates: AnalyticsUpdate[]) => {
		const groupedByMonth: Record<string, AnalyticsUpdate[]> = {};
	
		for (const update of updates) {
			const oldMonth = update.oldData.yearMonth;
			const newMonth = update.newData.yearMonth;
	
			if (oldMonth !== newMonth) {
				if (!groupedByMonth[oldMonth]) groupedByMonth[oldMonth] = [];
				if (!groupedByMonth[newMonth]) groupedByMonth[newMonth] = [];
	
				groupedByMonth[oldMonth].push({ oldData: update.oldData, newData: null! });
				groupedByMonth[newMonth].push({ oldData: null!, newData: update.newData });
			} else {
				if (!groupedByMonth[newMonth]) groupedByMonth[newMonth] = [];
				groupedByMonth[newMonth].push(update);
			}
		}
	
		const promises = Object.entries(groupedByMonth).map(async ([yearMonth, updates]) => {
			const analyticsRef = analyticsDoc(yearMonth);
			if (!analyticsRef) return;
	
			await runTransaction(db, async (analytics) => {
				const snapshot = await analytics.get(analyticsRef);
				if (!snapshot.exists()) return;
	
				const data = snapshot.data();
				const types = data.types || {};
				const statusAgg = data.status || {};
				const categoryAgg = data.categories || {};
				const total = data.total || { count: 0, sum: 0 };
	
				for (const { oldData, newData } of updates) {
					if (oldData) {
						if (types[oldData.type]) types[oldData.type] -= oldData.amount;
						if (statusAgg[oldData.status]) statusAgg[oldData.status] -= oldData.amount;
						if (oldData.categoryId && categoryAgg[oldData.categoryId]) {
							categoryAgg[oldData.categoryId] -= oldData.amount;
						}
						total.sum -= oldData.amount;
					}
	
					if (newData) {
						types[newData.type] = (types[newData.type] || 0) + newData.amount;
						statusAgg[newData.status] = (statusAgg[newData.status] || 0) + newData.amount;
						if (newData.categoryId) {
							categoryAgg[newData.categoryId] = (categoryAgg[newData.categoryId] || 0) + newData.amount;
						}
						total.sum += newData.amount;
					}
				}
	
				analytics.set(
					analyticsRef,
					{
						types,
						status: statusAgg,
						categories: categoryAgg,
						total: {
							count: total.count, 
							sum: Math.max(total.sum, 0),
						},
						updatedAt: new Date(),
					},
					{ merge: true }
				);
			});
		});
	
		await Promise.all(promises);
	};

	return {
		onUpdateAnalytics,
		onRegisterAnalytics,
		onDeleteAnalytics,
		onBatchUpdateAnalytics,
	};
};

export { useAnalytics, type AnalyticsData, type AnalyticsUpdate };
