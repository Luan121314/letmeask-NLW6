import React from 'react';
import { AuthProvider } from './contexts/AuthContext';
import Routes from './Routes';

function App(): JSX.Element {
    return (
        <AuthProvider>
            <Routes />
        </AuthProvider>
    );
}

export default App;
