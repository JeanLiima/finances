import { PAID_STATUS } from "@/constants/paid-status";
import { TRANSACTIONS_TYPES } from "@/constants/transaction-types";

interface Transaction {
	id: string;
	description: string;
	value: number;
	status: PAID_STATUS,
	type: TRANSACTIONS_TYPES,
	createdAt: Date,
	yearMonth: string,
	lastUpdatedAt: Date | null,
	numberOfInstallment: number | null
}

export type { Transaction }
