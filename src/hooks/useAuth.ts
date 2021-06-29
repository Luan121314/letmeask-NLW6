import { useContext, ContextType } from 'react';
import AuthContext from '../contexts/AuthContext';

export function useAuth(): ContextType<typeof AuthContext> {
    return useContext(AuthContext);
}
