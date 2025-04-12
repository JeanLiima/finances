import { 
	collection, 
	doc, 
	limit, 
	orderBy, 
	query, 
	where, 
	WhereFilterOp 
} from "firebase/firestore";

import { db } from "@/services/firebase-connection";

import { useAuth } from "../auth";

const useAggregationsRef = () => {
	const { loggedUser } = useAuth();

	const aggregationsCollection = loggedUser
		? collection(db, "users", loggedUser.id, "aggregations")
		: undefined;

	const aggregationsDoc = (aggregationId: string) => loggedUser
		? doc(db, "users", loggedUser.id, "aggregations", aggregationId)
		: undefined;

	const aggregationsQuery = (
		whereClauses: [string, WhereFilterOp, any][],
		orderClauses: [string, "asc" | "desc"][] = [],
		limitCount?: number
		) =>
		loggedUser
			? query(
				collection(db, "users", loggedUser.id, "aggregations"),
				...[
					...whereClauses.map((clause) => where(...clause)),
					...orderClauses.map(([field, direction]) => orderBy(field, direction)),
					...(limitCount !== undefined ? [limit(limitCount)] : []),
				]
			)
			: undefined;

	return {
		aggregationsDoc,
		aggregationsQuery,
		aggregationsCollection
	}
};

export { useAggregationsRef };
