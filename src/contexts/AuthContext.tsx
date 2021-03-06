import React, { createContext, useEffect, useState } from 'react';
import { ReactNode } from 'react';
import { auth, firebase } from '../services/firebase';

type UserProps = {
    id: string;
    name: string;
    avatar: string;
};

type AuthContextType = {
    user: UserProps | undefined;
    signInWithGoogle: () => Promise<void>;
};

type AuthContwextProviderProps = {
    children: ReactNode;
};

const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: AuthContwextProviderProps): JSX.Element {
    const [user, setUser] = useState<UserProps>();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                const { displayName, photoURL, uid } = user;
                if (!displayName || !photoURL) {
                    throw new Error('Missing information from Google Account');
                }
                setUser({
                    id: uid,
                    name: displayName,
                    avatar: photoURL,
                });
            }
        });
        return () => {
            unsubscribe();
        };
    }, []);

    async function signInWithGoogle() {
        const provider = new firebase.auth.GoogleAuthProvider();
        const result = await auth.signInWithPopup(provider);
        if (result.user) {
            const { displayName, photoURL, uid } = result.user;
            if (!displayName || !photoURL) {
                throw new Error('Missing information from Google Account');
            }
            setUser({
                id: uid,
                name: displayName,
                avatar: photoURL,
            });
        }
    }

    return <AuthContext.Provider value={{ user, signInWithGoogle }}>{children}</AuthContext.Provider>;
}

export default AuthContext;
