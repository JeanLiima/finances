import React, { createContext, useState, useEffect } from 'react';
// import { useNavigation } from '@react-navigation/native';

import { 
	createUserWithEmailAndPassword, 
	onAuthStateChanged, 
	signInWithEmailAndPassword, 
	signOut,
	updateProfile
} from '@firebase/auth';

import { Alert } from 'react-native';

import { AuthContextData, AuthProviderProps, LoggedUser } from './types';
import { auth } from '../../services/firebase-connection';

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider = ({ children }: AuthProviderProps) => {
    const [loggedUser, setLoggedUser] = useState<LoggedUser | null>(null);
    const [isLoadingAuth, setIsLoadingAuth] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    // const navigation = useNavigation();

	useEffect(() => {
		const unsub = onAuthStateChanged(auth, (user) => {
		  if(user){
			setLoggedUser({
				name: user.displayName || '',
				email: user.email || '',
				id: user.uid
			});
	
			setIsLoading(false);
			return;
		  }
	
		  setLoggedUser(null);
		  setIsLoading(false);
	
		});
		console.log(unsub);
	}, []);

    const onSignIn = async (email: string, password: string) => {
		try {
			setIsLoadingAuth(true);
			const response = await signInWithEmailAndPassword(auth, email, password);

			if(!response.user.email || !response.user.displayName) return;

			setLoggedUser({
				name: response?.user.displayName,
				email: response.user.email,
				id: response.user.uid
			});

			setIsLoadingAuth(false);
		} catch (err) {
            if (err instanceof Error) {
                const firebaseError = err as { code?: string };
				const isInvalidEmail = firebaseError.code === "auth/invalid-email"
				const isUserEmailNotFound = firebaseError.code === "auth/configuration-not-found";
				const isMissingPassword = firebaseError.code === "auth/missing-password";
				const isInvalidPassword = firebaseError.code === "auth/invalid-credential";
                if (isMissingPassword || isUserEmailNotFound) {
					Alert.alert(
						"Oops..",
						"Verifique se o email e a senha estão corretos.",
						[
							{
								text: "OK",
							},
						],
						{ cancelable: false }
					);
                } else if (isInvalidEmail) {
					Alert.alert(
						"Oops..",
						"Verifique se o email é válido.",
						[
							{
								text: "OK",
							},
						],
						{ cancelable: false }
					);
				} else if (isInvalidPassword) {
					Alert.alert(
						"Oops..",
						"Verifique sua senha.",
						[
							{
								text: "OK",
							},
						],
						{ cancelable: false }
					);
				}
            }
			setIsLoadingAuth(false);
		}
    }

	const onSignUp = async (email: string, password: string, name: string) => {
		try {
			setIsLoadingAuth(true);
			const userCredential = await createUserWithEmailAndPassword(auth, email, password);
			await updateProfile(userCredential.user, {
				displayName: name,
			});
			setLoggedUser({
				name: name,
				email: email,
				id: userCredential.user.uid
			});

			setIsLoadingAuth(false);
		} catch (err) {
			console.log(err);
            if (err instanceof Error) {
                const firebaseError = err as { code?: string };
				const isUserEmailAlreadyInUse = firebaseError.code === "auth/email-already-in-use";
				const isInvalidEmail = firebaseError.code === "auth/invalid-email";
				const isPasswordWeak = firebaseError.code === "auth/weak-password";
                if (isInvalidEmail || isUserEmailAlreadyInUse) {
                    Alert.alert(
						"Oops..",
						"Verifique se o email é válido.",
						[
							{
								text: "OK",
							},
						],
						{ cancelable: false }
					);
                } else if (isPasswordWeak) {
					Alert.alert(
						"Oops..",
						"A senha deve ter pelo menos 6 caracteres.",
						[
							{
								text: "OK",
							},
						],
						{ cancelable: false }
					);
				} else if (isUserEmailAlreadyInUse) {
					Alert.alert(
						"Oops..",
						"O email já está em uso.",
						[
							{
								text: "OK",
							},
						],
						{ cancelable: false }
					);
				}
            }
			setIsLoadingAuth(false);
		}
	}

	const onSignOut = async () => {
		await signOut(auth);
		setLoggedUser(null);
	}

    return (
        <AuthContext.Provider value={{
           	isSigned: !!loggedUser,
            loggedUser,
            isLoadingAuth,
            isLoading,
			onSignUp,
			onSignOut,
            onSignIn
        }}>
            {children}
        </AuthContext.Provider>
    )
};

export { AuthProvider };
