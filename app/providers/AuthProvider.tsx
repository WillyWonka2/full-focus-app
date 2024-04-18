import * as Splash from 'expo-splash-screen'
import React, { Dispatch, FC, PropsWithChildren, SetStateAction, createContext, useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import type {IUser} from '@/types/user.interface.ts'

export type TypeUserState = IUser | null 

interface IContext {
    user: TypeUserState
    setUser: Dispatch<SetStateAction<TypeUserState>>
}

export const AuthContext = createContext({} as IContext)

Splash.preventAutoHideAsync()

const AuthProvider: FC<PropsWithChildren<unknown>> = ({children}) => {
    const [user, setUser] = useState<TypeUserState>({} as IUser) 

    useEffect(()=>{
        // get user from async storage
    }, [])

    return (
        <AuthContext.Provider value={{user, setUser}}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;