import { FC } from 'react'
import React from 'react'
import { View, Text, Pressable } from 'react-native'
import type { IMenuItem, TypeNav } from './menu.unterface'
import { AntDesign } from '@expo/vector-icons'
import { AppConstant } from '@/app.const'

interface IMenuItemProps {
	item: IMenuItem
	nav: TypeNav
	currentRoute?: string
}

const MenuItem: FC<IMenuItemProps> = ({ currentRoute, nav, item }) => {
	const isActive = currentRoute == item.path

	return (
		<Pressable className='w-[24%] flex-row justify-center' onPress={()=> nav(item.path)}>
			<AntDesign
				name={item.iconName}
				size={26}
				color={isActive ? AppConstant.primary : AppConstant.notActiveColor}
				className=''
				style = {isActive && AppConstant.shadow} 
			/>
		</Pressable>
	)
}

export default MenuItem
