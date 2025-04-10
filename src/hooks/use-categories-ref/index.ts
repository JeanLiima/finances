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

const useCategoriesRef = () => {
	const { loggedUser } = useAuth();

	const categoriesCollection = loggedUser
		? collection(db, "users", loggedUser.id, "categories")
		: undefined;

	const categoriesDoc = (id: string) => loggedUser && id
		? doc(db, "users", loggedUser.id, "categories", id)
		: undefined;

	const categoriesQuery = (
		whereClauses: [string, WhereFilterOp, any][],
		orderClauses: [string, "asc" | "desc"][] = [],
		limitCount?: number
		) =>
		loggedUser
			? query(
				collection(db, "users", loggedUser.id, "categories"),
				...[
					...whereClauses.map((clause) => where(...clause)),
					...orderClauses.map(([field, direction]) => orderBy(field, direction)),
					...(limitCount !== undefined ? [limit(limitCount)] : []),
				]
			)
			: undefined;

	return {
		categoriesDoc,
		categoriesQuery,
		categoriesCollection
	}
};

export { useCategoriesRef };
