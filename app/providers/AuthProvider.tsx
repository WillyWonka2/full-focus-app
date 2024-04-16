import React, { Dispatch, SetStateAction, createContext } from 'react';
import { View, Text } from 'react-native';
import type {IUser} from '@/types/user.interface.ts'

export type TypeUserState = IUser | null 

interface IContext {
    user: TypeUserState
    setUser: Dispatch<SetStateAction<TypeUserState>>
}

export const AuthContext = createContext({

})

const AuthProvider = () => {
    return (
        <View>
            
        </View>
    );
};

export default AuthProvider;