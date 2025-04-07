import { 
	collection, 
	CollectionReference, 
	doc, 
	DocumentReference, 
	orderBy, 
	query, 
	where, 
	WhereFilterOp 
} from "firebase/firestore";

import { db } from "@/services/firebase-connection";

import { useAuth } from "../auth";

function useTransactionsRef() {
	const { loggedUser } = useAuth();

	const transactionsCollection = loggedUser
		? (collection(db, "users", loggedUser.id, "transactions") as CollectionReference)
		: undefined;

	const transactionsDoc = (id: string) => loggedUser && id
		? (doc(db, "users", loggedUser.id, "transactions", id) as DocumentReference)
		: undefined;

	const transactionsQuery = (
		whereClauses: [string, WhereFilterOp, any][],
		orderClauses: [string, "asc" | "desc"][] = []
		) =>
		loggedUser
			? query(
				collection(db, "users", loggedUser.id, "transactions"),
				...[
				...whereClauses.map((clause) => where(...clause)),
				...orderClauses.map(([field, direction]) => orderBy(field, direction)),
				]
			)
			: undefined;

	return {
		transactionsDoc,
		transactionsQuery,
		transactionsCollection
	}
};

export { useTransactionsRef };
