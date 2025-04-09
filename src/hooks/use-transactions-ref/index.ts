import { 
	collection, 
	CollectionReference, 
	doc, 
	DocumentReference, 
	limit, 
	orderBy, 
	query, 
	where, 
	WhereFilterOp 
} from "firebase/firestore";

import { db } from "@/services/firebase-connection";

import { useAuth } from "../auth";

const useTransactionsRef = () => {
	const { loggedUser } = useAuth();

	const transactionsCollection = loggedUser
		? (collection(db, "users", loggedUser.id, "transactions") as CollectionReference)
		: undefined;

	const transactionsDoc = (id: string) => loggedUser && id
		? (doc(db, "users", loggedUser.id, "transactions", id) as DocumentReference)
		: undefined;

	const transactionsQuery = (
		whereClauses: [string, WhereFilterOp, any][],
		orderClauses: [string, "asc" | "desc"][] = [],
		limitCount?: number
		) =>
		loggedUser
			? query(
				collection(db, "users", loggedUser.id, "transactions"),
				...[
					...whereClauses.map((clause) => where(...clause)),
					...orderClauses.map(([field, direction]) => orderBy(field, direction)),
					...(limitCount !== undefined ? [limit(limitCount)] : []),
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
