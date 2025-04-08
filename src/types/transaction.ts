import { Timestamp } from "firebase/firestore";

import { PAID_STATUS } from "@/constants/paid-status";
import { TRANSACTIONS_TYPES } from "@/constants/transaction-types";

interface Transaction {
	id: string;
	description: string;
	value: number;
	status: PAID_STATUS,
	type: TRANSACTIONS_TYPES,
	createdAt: Timestamp,
	yearMonth: string,
	lastUpdatedAt: Timestamp | null,
	numberOfInstallment: number | null,
	groupId: string | null
}

export type { Transaction }
