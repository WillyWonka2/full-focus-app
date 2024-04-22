import { AppConstant } from '@/app.const';
import { FC } from 'react'
import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

const Loader: FC = () => {
    return (
        <ActivityIndicator color={AppConstant.primary} size='large'/>
        
    );
};

export default Loader;