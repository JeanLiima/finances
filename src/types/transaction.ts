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
	categoryId?: string;
	totalAmount?: number,
	lastUpdatedAt?: Timestamp,
	groupId?: string,
	installment?: {
		totalInstallment: number,
		currentInstallment: number,
	}
}

export type { Transaction }
