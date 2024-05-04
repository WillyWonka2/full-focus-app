import cn from 'clsx'
import { Feather } from '@expo/vector-icons'
import { FC, useState } from 'react'
import React from 'react'
import { View, Text, Pressable } from 'react-native'
import { AppConstant } from '@/app.const'
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import { EnumStatus } from './timer.interface'

const flowDuration = 1 * 5
const sessionCount = 7
const breakDuration = 1 * 7
const isSmallIndicator = sessionCount > 7
// ToDo arrow next and prev

const Timer: FC = () => {
	const [isStarting, setIsStarting] = useState<true | false>(false)
	const [status, setStatus] = useState<EnumStatus>(EnumStatus.WORK)
	const [currentSession, setCurrentSession] = useState<number>(1)
	const [duration, setDuration] = useState<number>(flowDuration)
	const [key, setKey] = useState<number>(0)

	function statusHandler() {
		return status == EnumStatus.WORK ? EnumStatus.REST : EnumStatus.WORK
	}

	function onComplete() {
		if (currentSession == sessionCount) {
			setStatus(EnumStatus.SUCCSESS)
			setIsStarting(false)
		} else {
			setCurrentSession(prev => prev + 1)
			setStatus(statusHandler())
			setDuration(duration === breakDuration ? flowDuration : breakDuration)
			setIsStarting(false)
			setKey(prev => prev + 1)
		}
	}

	function onPrev() {
		setStatus(statusHandler())
		setCurrentSession(prev => prev - 1)
		setKey(prev => prev - 1)
		setIsStarting(false)
		setDuration(status == EnumStatus.WORK ? breakDuration : flowDuration)
	}

	function onNext() {
		setStatus(statusHandler())
		setCurrentSession(prev => prev + 1)
		setKey(prev => prev + 1)
		setIsStarting(false)
		setDuration(status == EnumStatus.WORK ? breakDuration : flowDuration)
	}

	function reset(){
		setStatus(EnumStatus.WORK)
		setCurrentSession(1)
		setDuration(flowDuration)
		setKey(0)
		setIsStarting(false)
	}
	return (
		<View className='flex-1 justify-center'>
			<View className='self-center'>
				{/* TODO */}
				<CountdownCircleTimer
					key={key}
					isPlaying={isStarting}
					duration={duration}
					colors={['#3A3570', '#664EF3']}
					colorsTime={[
						status == EnumStatus.WORK ? flowDuration : breakDuration,
						0
					]}
					trailColor='#2F2F4C'
					onComplete={() => onComplete()}
					size={320}
					strokeWidth={15}
				>
					{({ remainingTime }) => {
						const hours = Math.floor(remainingTime / 3600)
						const minutes = Math.floor((remainingTime % 3600) / 60)
						const seconds = remainingTime % 60

						if (status == EnumStatus.SUCCSESS) {
							return (
								<Text className='color-white text-4xl font-bold'>
									{EnumStatus.SUCCSESS}!
								</Text>
							)
						}

						if (hours === 0) {
							return (
								<>
									<Text className='color-white text-5xl font-bold'>{`${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`}</Text>
									<Text className='text-white mt-2 text-center text-xl'>
										Time to {status}
									</Text>
								</>
							)
						}

						return (
							<>
								<Text className='color-white text-5xl font-bold'>{`${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`}</Text>
								<Text className='text-white mt-2 text-center text-xl'>
									Time to {status}
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
									className={cn(
										isSmallIndicator ? 'w-3 h-3' : 'w-4 h-4',
										'bg-[#2C2B3C] rounded-full',
										{
											'bg-primary':
												index + 1 <= currentSession ||
												status == EnumStatus.SUCCSESS,
											'bg-transparent w-6 h-6 border-4 border-primary':
												index === currentSession - 1 &&
												status !== EnumStatus.SUCCSESS,
											'w-6 h-6 border-4 border-primary':
												index === currentSession - 1 &&
												index === sessionCount - 1,
											'w-4 h-4':
												isSmallIndicator && index === currentSession - 1,
											'w-4 h-4 border-4 border-primary':
												isSmallIndicator &&
												index === currentSession - 1 &&
												index === sessionCount - 1
										}
									)}
								/>
								{index + 1 != sessionCount && (
									<View
										className={cn(
											isSmallIndicator ? 'w-3' : 'w-5',
											'h-0.5 bg-[#2C2B3C]',
											{
												'bg-primary': index + 2 <= currentSession
											}
										)}
									/>
								)}
							</View>
						))}
				</View>
			</View>
			<View className='flex-row mt-10 items-center justify-center'>
				<Pressable
					onPress={() => onPrev()}
					disabled={currentSession == 1 || status == EnumStatus.SUCCSESS}
					className={
						currentSession == 1 || status == EnumStatus.SUCCSESS
							? 'opacity-[0.5]'
							: ''
					}
				>
					<Feather name={'arrow-left'} color='white' size={34}></Feather>
				</Pressable>

				<Pressable
					className={cn(
						'mx-4 bg-primary w-20 h-20 items-center justify-center rounded-full',
						{ 'pl-1.5': !isStarting},
						{'pl-0': status == EnumStatus.SUCCSESS}
					)}
					onPress={() => {
						if (status == EnumStatus.SUCCSESS) {
							reset()
						} else {
							setIsStarting(!isStarting)
						}
					}}
					style={isStarting && AppConstant.shadow}
				>
					<Feather
						name={status == EnumStatus.SUCCSESS ? 'refresh-cw' : isStarting ? 'pause' : 'play'}
						color='white'
						size={44}
					></Feather>
				</Pressable>

				<Pressable
					onPress={() => onNext()}
					disabled={currentSession == sessionCount}
					className={currentSession == sessionCount ? 'opacity-[0.5]' : ''}
				>
					<Feather name={'arrow-right'} color='white' size={34}></Feather>
				</Pressable>
			</View>
		</View>
	)
}

export default Timer
