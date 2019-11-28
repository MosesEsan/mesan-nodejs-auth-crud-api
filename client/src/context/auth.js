import React, {createContext, useContext } from 'react';

export const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext)
}