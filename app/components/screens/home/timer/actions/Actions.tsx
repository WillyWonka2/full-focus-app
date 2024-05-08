import { FC } from 'react'
import { View, Pressable } from 'react-native'
import cn from 'clsx'
import { Feather } from '@expo/vector-icons'
import { EnumStatus, ITimer } from '../timer.interface'
import { AppConstant } from '@/app.const'
import Arrow from './Arrow'

interface IActionsProps extends Omit<ITimer, 'key' | 'duration'> {
	sessionCount: number
	onNext: () => void
	reset: () => void
	onPrev: () => void
	startHandler: () => void
}

const Actions: FC<IActionsProps> = ({
	currentSession,
	status,
	isStarting,
	sessionCount,
	onNext,
	reset,
	onPrev,
	startHandler
}) => {
	return (
		<View className='flex-row mt-10 items-center justify-center'>
			<Arrow
				onPrev={onPrev}
				onNext={onNext}
				currentSession={currentSession}
				direction='left'
				status={status}
				sessionCount={sessionCount}
			/>

			<Pressable
				className={cn(
					'mx-4 bg-primary w-20 h-20 items-center justify-center rounded-full',
					{ 'pl-1.5': !isStarting },
					{ 'pl-0': status == EnumStatus.SUCCSESS }
				)}
				onPress={() =>
					status == EnumStatus.SUCCSESS ? reset() : startHandler()
				}
				style={isStarting && AppConstant.shadow}
			>
				<Feather
					name={
						status == EnumStatus.SUCCSESS
							? 'refresh-cw'
							: isStarting
								? 'pause'
								: 'play'
					}
					color='white'
					size={44}
				></Feather>
			</Pressable>

			<Arrow
				onPrev={onPrev}
				onNext={onNext}
				currentSession={currentSession}
				direction='right'
				status={status} 
				sessionCount={sessionCount}
			/>
		</View>
	)
}

export default Actions
