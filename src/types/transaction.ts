import { Timestamp } from "firebase/firestore";

import { PAID_STATUS } from "@/constants/paid-status";
import { TRANSACTIONS_TYPES } from "@/constants/transaction-types";

type Transaction = {
	id: string;
	description: string;
	amount: number;
	status: PAID_STATUS,
	type: TRANSACTIONS_TYPES,
	createdAt: Timestamp,
	yearMonth: string,
	categoryId: string | null,
	totalAmount: number | null,
	lastUpdatedAt: Timestamp | null,
	aggregationId: string | null,
	installment: {
		groupId: string,
		totalInstallment: number,
		currentInstallment: number,
	} | null
}

export type { Transaction }
