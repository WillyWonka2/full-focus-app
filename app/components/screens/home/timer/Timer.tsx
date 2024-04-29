import cn from 'clsx'
import { Feather } from '@expo/vector-icons'
import { FC, useState } from 'react'
import React from 'react'
import { View, Text, Pressable } from 'react-native'
import { AppConstant } from '@/app.const'
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import { EnumStatus } from './timer.interface'

const flowDuration = 1 * 60
const sessionCount = 7
const breakDuration = 1 * 60
// ToDo arrow next and prev

const Timer: FC = () => {
	const [isStarting, setIsStarting] = useState<true | false>(false)
	const [status, setStatus] = useState<EnumStatus>(EnumStatus.REST)
	const [currentSession, setCurrentSession] = useState<Number>(0)

	return (
		<View className='flex-1 justify-center'>
			<View className='self-center'>
				<CountdownCircleTimer
					isPlaying={isStarting}
					duration={flowDuration}
					colors={['#3A3570', '#664EF3']}
					colorsTime={[7, 0]}
					trailColor='#2F2F4C'
					onComplete={() => setIsStarting(false)}
					size={320}
					strokeWidth={15}
				>
					{({ remainingTime }) => {
						const hours = Math.floor(remainingTime / 3600)
						const minutes = Math.floor((remainingTime % 3600) / 60)
						const seconds = remainingTime % 60

						if (hours === 0) {
							return (
								<>
									<Text className='color-white text-5xl font-bold'>{`${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`}</Text>
									<Text className='text-white mt-2 text-center text-xl'>
										Time to {status === EnumStatus.WORK ? 'WORK!' : 'REST.'}
									</Text>
								</>
							)
						}
						return (
							<>
								<Text className='color-white text-5xl font-bold'>{`${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`}</Text>
								<Text className='text-white mt-2 text-center text-xl'>
									Time to {status === EnumStatus.WORK ? 'WORK!' : 'REST!'}
								</Text>
							</>
						)
					}}
				</CountdownCircleTimer>
				<View className='mt-10 flex-row justify-center'>
					{Array(sessionCount)
						.fill(null)
						.map((_, index) => (
							<View
								className='flex-row items-center justify-center'
								key={`round ${index}`}
							>
								<View className='w-4 h-4 bg-primary rounded-full' />
								{index + 1 != 7 && <View className='w-5 h-0.5 bg-primary' />}
							</View>
						))}
				</View>
			</View>
			<Pressable
				className={cn(
					'mt-10 self-center bg-primary w-20 h-20 items-center justify-center rounded-full',
					{ 'pl-1.5': !isStarting }
				)}
				onPress={() => setIsStarting(!isStarting)}
				style={isStarting && AppConstant.shadow}
			>
				<Feather
					name={isStarting ? 'pause' : 'play'}
					color='white'
					size={44}
				></Feather>
			</Pressable>
		</View>
	)
}

export default Timer
