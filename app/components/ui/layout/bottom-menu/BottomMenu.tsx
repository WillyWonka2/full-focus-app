import React from 'react'
import { View, Text } from 'react-native'
import { TypeNav } from './menu.unterface'
import { FC } from 'react'
import { menuData } from './menu.data'

interface IBottomMenu {
	nav: TypeNav
	currentRoute?: string
}

const BottomMenu: FC<IBottomMenu> = ({ currentRoute, nav }) => {
	return <View>
		{
			menuData.map(item => <MenuItem/>)
		}
    </View>
}

export default BottomMenu
