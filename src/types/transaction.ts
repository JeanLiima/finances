import { Timestamp } from "firebase/firestore";

import { PAID_STATUS } from "@/constants/paid-status";
import { TRANSACTIONS_TYPES } from "@/constants/transaction-types";

type Transaction = {
	id: string;
	description: string;
	amount: number;
	categoryId: string;
	totalAmount: number | null
	status: PAID_STATUS,
	type: TRANSACTIONS_TYPES,
	createdAt: Timestamp,
	yearMonth: string,
	lastUpdatedAt: Timestamp | null,
	groupId: string | null,
	installment: {
		totalInstallment: number,
		currentInstallment: number,
	} | null
}

export type { Transaction }
