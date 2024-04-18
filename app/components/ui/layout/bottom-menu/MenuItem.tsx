import { FC } from 'react'
import React from 'react';
import { View, Text, Pressable } from 'react-native';
import type { IMenuItem, TypeNav } from './menu.unterface';

interface IMenuItemProps {
    item: IMenuItem
    nav: TypeNav
    currentRoute?: string
}

const MenuItem: FC<IMenuItemProps> = ({currentRoute, nav, item}) => {
    const isAxctive = currentRoute == item.path
    
    
    return (
        <Pressable>
            
        </Pressable>
    );
};

export default MenuItem;