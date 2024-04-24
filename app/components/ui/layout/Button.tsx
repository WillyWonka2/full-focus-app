import { FC, PropsWithChildren } from 'react'
import React from 'react'
import { View, Text, Pressable, PressableProps } from 'react-native'
import cn from 'clsx'

interface IButton extends PressableProps{}

const Button: FC<PropsWithChildren<IButton>> = ({ children, className, ...rest }) => {
	return (
		<Pressable className={cn('self-center mt-4 bg-primary py-3 px-8 rounded', className)} {...rest}>
			<Text className='font-semibold text-white text-xl'>{children}</Text>
		</Pressable>
	)
}

export default Button
