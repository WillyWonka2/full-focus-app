import React, { FC } from 'react'
import { Pressable } from 'react-native'
import { EnumStatus, ITimer } from '../timer.interface'
import { Feather } from '@expo/vector-icons'

interface IArrowProps extends Pick<ITimer, 'status' | 'currentSession'>{
	onPrev: () => void
	onNext: () => void
	direction: 'left' | 'right'
	sessionCount: number
}

const Arrow: FC<IArrowProps> = ({
	onPrev,
	onNext,
	currentSession,
	direction,
	status,
	sessionCount
}) => {
	return (
		<Pressable
			onPress={() => {
				if (direction === 'left') {
					onPrev()
				} else {
					onNext()
				}
			}}
			disabled={
				direction === 'left'
					? currentSession == 1 || status == EnumStatus.SUCCSESS
					: currentSession == sessionCount
			}
			className={
				direction === 'left'
					? currentSession == 1 || status == EnumStatus.SUCCSESS
						? 'opacity-[0.5]'
						: ''
					: currentSession == sessionCount
						? 'opacity-[0.5]'
						: ''
			}
		>
			<Feather name={direction === 'left' ? 'arrow-left' : 'arrow-right'} color='white' size={34}></Feather>
		</Pressable>
	)
}

export default Arrow
