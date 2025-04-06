const SIGN_IN = 'sign-in';
const SIGN_UP = 'sign-up';
const TRANSACTIONS = 'transactions';
const REGISTER_TRANSACTION = 'register-transaction';
const EDIT_TRANSACTION = 'edit-transaction';
const TRANSACTION_DETAILS = 'transaction-details'

type RootStackParamList = {
	[SIGN_IN]: undefined,
	[SIGN_UP]: undefined,
	[TRANSACTIONS]: undefined,
	[REGISTER_TRANSACTION]: undefined,
	[EDIT_TRANSACTION]?: { id?: string },
	[TRANSACTION_DETAILS]?: { id?: string }
};

export {
	TRANSACTIONS,
	SIGN_IN,
	SIGN_UP,
	REGISTER_TRANSACTION,
	EDIT_TRANSACTION,
	TRANSACTION_DETAILS,
	type RootStackParamList,
};
