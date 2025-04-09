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

const useAnalyticsRef = () => {
	const { loggedUser } = useAuth();

	const analyticsCollection = loggedUser
		? (collection(db, "users", loggedUser.id, "analytics") as CollectionReference)
		: undefined;

	const analyticsDoc = (id: string) => loggedUser && id
		? (doc(db, "users", loggedUser.id, "analytics", id) as DocumentReference)
		: undefined;

	const analyticsQuery = (
		whereClauses: [string, WhereFilterOp, any][],
		orderClauses: [string, "asc" | "desc"][] = [],
		limitCount?: number
		) =>
		loggedUser
			? query(
				collection(db, "users", loggedUser.id, "analytics"),
				...[
					...whereClauses.map((clause) => where(...clause)),
					...orderClauses.map(([field, direction]) => orderBy(field, direction)),
					...(limitCount !== undefined ? [limit(limitCount)] : []),
				]
			)
			: undefined;

	return {
		analyticsDoc,
		analyticsQuery,
		analyticsCollection
	}
};

export { useAnalyticsRef };
