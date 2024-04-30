import cn from 'clsx'
import { Feather } from '@expo/vector-icons'
import { FC, useState } from 'react'
import React from 'react'
import { View, Text, Pressable } from 'react-native'
import { AppConstant } from '@/app.const'
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import { EnumStatus } from './timer.interface'

const flowDuration = 1 * 10
const sessionCount = 7
const breakDuration = 1 * 20
// ToDo arrow next and prev

const Timer: FC = () => {
	const [isStarting, setIsStarting] = useState<true | false>(false)
	const [status, setStatus] = useState<EnumStatus>(EnumStatus.WORK)
	const [currentSession, setCurrentSession] = useState<number>(1)

	function statusHandler(newStatus:string){
		return newStatus == EnumStatus.WORK ? breakDuration : flowDuration
	}
	return (
		<View className='flex-1 justify-center'>
			<View className='self-center'>
				{/* TODO */}
				<CountdownCircleTimer
					isPlaying={isStarting}
					duration={flowDuration}
					colors={['#3A3570', '#664EF3']}
					colorsTime={[
						statusHandler(status),
						0
					]}
					trailColor='#2F2F4C'
					onComplete={() => {
						setCurrentSession(prev => prev + 1)
						setStatus(status === EnumStatus.REST ? EnumStatus.WORK : EnumStatus.REST)
						return {
							shouldRepeat: true,
							newInitialRemainingTime: statusHandler(status)
						}
					}}
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
								<View
									className={cn('w-4 h-4 bg-[#2C2B3C] rounded-full', {
										'bg-primary': index + 1 <= currentSession,
										'w-6 h-6 bg-transparent border-4 border-indigo-500':
											index === currentSession - 1
									})}
								/>
								{index + 1 != sessionCount && (
									<View
										className={cn('w-5 h-0.5 bg-[#2C2B3C]', {
											'bg-primary': index + 2 <= currentSession
										})}
									/>
								)}
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
