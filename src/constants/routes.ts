const SIGN_IN = 'sign-in';
const SIGN_UP = 'sign-up';
const TRANSACTIONS = 'transactions';
const REGISTER_TRANSACTION = 'register-transaction';
const EDIT_TRANSACTION = 'edit-transaction';
const TRANSACTIONS_ANALYSIS = 'transactions-analysis';
const SETTINGS = 'settings';
const CATEGORIES = 'categories';

type RootStackParamList = {
	[SIGN_IN]: undefined,
	[SIGN_UP]: undefined,
	[TRANSACTIONS]: undefined,
	[TRANSACTIONS_ANALYSIS]: undefined,
	[REGISTER_TRANSACTION]?: { yearMonth?: string },
	[EDIT_TRANSACTION]?: { id?: string },
	[SETTINGS]: undefined,
	[CATEGORIES]: undefined
};

export {
	TRANSACTIONS,
	SIGN_IN,
	SIGN_UP,
	REGISTER_TRANSACTION,
	EDIT_TRANSACTION,
	TRANSACTIONS_ANALYSIS,
	SETTINGS,
	CATEGORIES,
	type RootStackParamList,
};
