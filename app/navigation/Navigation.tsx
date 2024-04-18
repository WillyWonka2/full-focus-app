import { useAuth } from '@/hooks/useAuth';
import { AuthContext } from '@/providers/AuthProvider';
import React, { useContext } from 'react';
import { View, Text } from 'react-native';

const Navigation = () => {
    const {user} = useAuth()
    
    return (
        <View>
            
        </View>
    );
};

export default Navigation;