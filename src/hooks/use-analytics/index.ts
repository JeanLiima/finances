import { runTransaction } from "firebase/firestore";

import { Transaction } from "@/types/transaction";
import { db } from "@/services/firebase-connection";

import { useAnalyticsRef } from "../use-analytics-ref";

const useAnalytics = () => {
	const { analyticsDoc } = useAnalyticsRef();

	const onDeleteAnalytics = async (
		data: Pick<Transaction, 'amount' | 'yearMonth' | 'type' | 'status'>
	): Promise<void> => {
		const { yearMonth, amount, type, status } = data;
		const analyticsRef = analyticsDoc(yearMonth);
		if (!analyticsRef) return;
	
		await runTransaction(db, async (analytics) => {
			const analyticsSnap = await analytics.get(analyticsRef);
	
			if (!analyticsSnap.exists()) return;
	
			const analytic = analyticsSnap.data();
	
			const types = analytic.types || {};
			const statusAgg = analytic.status || {};
			const total = analytic.total || { count: 0, sum: 0 };
	
			const newTypes = {
				...types,
				[type]: Math.max((types[type] || 0) - amount, 0),
			};
	
			const newStatus = {
				...statusAgg,
				[status]: Math.max((statusAgg[status] || 0) - amount, 0),
			};
	
			const newTotal = {
				count: Math.max(total.count - 1, 0),
				sum: Math.max(total.sum - amount, 0),
			};
	
			analytics.set(
				analyticsRef,
				{
					types: newTypes,
					status: newStatus,
					total: newTotal,
					updatedAt: new Date(),
				},
				{ merge: true }
			);
		});
	};

	const onRegisterAnalytics = async (
		data: Pick<Transaction, 'amount' | 'yearMonth' | 'type' | 'status'>
	): Promise<void> => {
		const { yearMonth, amount, type, status } = data;
		const analyticsRef = analyticsDoc(yearMonth);
		if (!analyticsRef) return;
	
		await runTransaction(db, async (analytics) => {
			const analyticsSnap = await analytics.get(analyticsRef);
	
			const analytic = analyticsSnap.exists() ? analyticsSnap.data() : {};
	
			const types = analytic.types || {};
			const statusAgg = analytic.status || {};
			const total = analytic.total || { count: 0, sum: 0 };
	
			const newTypes = {
				...types,
				[type]: (types[type] || 0) + amount,
			};
	
			const newStatus = {
				...statusAgg,
				[status]: (statusAgg[status] || 0) + amount,
			};
	
			const newTotal = {
				count: total.count + 1,
				sum: total.sum + amount,
			};
	
			analytics.set(
				analyticsRef,
				{
					types: newTypes,
					status: newStatus,
					total: newTotal,
					updatedAt: new Date(),
				},
				{ merge: true }
			);
		});
	};

	const onUpdateAnalytics = async (
		oldData: Pick<Transaction, 'amount' | 'yearMonth' | 'type' | 'status'>,
		newData: Pick<Transaction, 'amount' | 'yearMonth' | 'type' | 'status'>
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
	
				const newTypes = { ...types };
				if (oldData.type !== newData.type) {
					newTypes[oldData.type] = Math.max((types[oldData.type] || 0) - oldData.amount, 0);
					newTypes[newData.type] = (types[newData.type] || 0) + newData.amount;
				} else {
					newTypes[oldData.type] = Math.max((types[oldData.type] || 0) - oldData.amount + newData.amount, 0);
				}
				
				const newStatus = { ...statusAgg };
				if (oldData.status !== newData.status) {
					newStatus[oldData.status] = Math.max((statusAgg[oldData.status] || 0) - oldData.amount, 0);
					newStatus[newData.status] = (statusAgg[newData.status] || 0) + newData.amount;
				} else {
					newStatus[oldData.status] = Math.max((statusAgg[oldData.status] || 0) - oldData.amount + newData.amount, 0);
				}
	
				const newTotal = {
					count: total.count,
					sum: Math.max(total.sum - oldData.amount + newData.amount, 0),
				};
	
				analytics.set(
					analyticsRef,
					{
						types: newTypes,
						status: newStatus,
						total: newTotal,
						updatedAt: new Date(),
					},
					{ merge: true }
				);
			});
		}
	};

	return {
		onUpdateAnalytics,
		onRegisterAnalytics,
		onDeleteAnalytics
	};
};

export { useAnalytics };
