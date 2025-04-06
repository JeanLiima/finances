import { ReactNode } from "react";

interface LoggedUser {
    id: string;
    name: string;
    email: string;
}

interface AuthContextData {
    isSigned: boolean;
    loggedUser: LoggedUser | null;
    isLoading: boolean;
    isLoadingAuth: boolean;
    onSignUp: (email: string, password: string, name: string) => Promise<void>;
    onSignOut: () => Promise<void>;
    onSignIn: (email: string, password: string) => Promise<void>
}

interface AuthProviderProps {
    children: ReactNode;
}

export type { LoggedUser, AuthContextData, AuthProviderProps };
