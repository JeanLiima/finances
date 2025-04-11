import { PAID_STATUS } from "@/constants/paid-status"
import { TRANSACTIONS_TYPES } from "@/constants/transaction-types"

type Analytics = {
	status: {
		[PAID_STATUS.PAID]?: number,
		[PAID_STATUS.UNPAID]?: number
	},
	total: {
		count?: number,
		sum?: number,
	},
	categories: Record<string, number>
	types: {
		[TRANSACTIONS_TYPES.EXPENSE]?: number,
		[TRANSACTIONS_TYPES.INCOME]?: number,
	}
}

export type { Analytics };
