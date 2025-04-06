import { collection, CollectionReference, doc, DocumentReference } from "firebase/firestore";

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

	return {
		transactionsDoc,
		transactionsCollection
	}
};

export { useTransactionsRef };
