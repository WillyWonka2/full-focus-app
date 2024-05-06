import cn from 'clsx'
import { Feather } from '@expo/vector-icons'
import { FC, useState } from 'react'
import React from 'react'
import { View, Text, Pressable } from 'react-native'
import { AppConstant } from '@/app.const'
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import { EnumStatus, ITimer } from './timer.interface'

const flowDuration = 1 * 5
const sessionCount = 7
const breakDuration = 1 * 7
const isSmallIndicator = sessionCount > 7

const Timer: FC = () => {
	const [timer, setTimer] = useState<ITimer>({
		isStarting: false,
		status: EnumStatus.WORK,
		currentSession: 1,
		duration: flowDuration,
		key: 0
	})

	function statusHandler(prevStatus: EnumStatus) {
		return prevStatus == EnumStatus.WORK ? EnumStatus.REST : EnumStatus.WORK
	}

	function onComplete() {
		if (timer.currentSession == sessionCount) {
			setTimer(prevState => (
				{
					...prevState,
					status: EnumStatus.SUCCSESS,
					isStarting: false
				}
			))
		} else {
			setTimer(prevState => (
				{
					currentSession: prevState.currentSession + 1,
					status: statusHandler(prevState.status),
					duration: prevState.duration === breakDuration ? flowDuration : breakDuration,
					isStarting: false,
					key: prevState.key + 1
				}
			))
		}
	}

	function onPrev() {
		setTimer(prevState => ({
			status: statusHandler(prevState.status),
			currentSession: prevState.currentSession - 1,
			key: prevState.key - 1,
			isStarting: false,
			duration: prevState.status == EnumStatus.WORK ? breakDuration : flowDuration
		}))
	}

	function onNext() {
		setTimer(prevState => (
			{
				currentSession: prevState.currentSession + 1,
				status: statusHandler(prevState.status),
				duration: prevState.status == EnumStatus.WORK ? breakDuration : flowDuration,
				isStarting: false,
				key: prevState.key + 1
			}
		))
	}

	function reset() {
		setTimer(prevState => (
			{
				currentSession: 1,
				status: EnumStatus.WORK,
				duration: flowDuration,
				isStarting: false,
				key: 0
			}
		))
	}
	return (
		<View className='flex-1 justify-center'>
			<View className='self-center'>
				{/* TODO */}
				<CountdownCircleTimer
					key={timer.key}
					isPlaying={timer.isStarting}
					duration={timer.duration}
					colors={['#3A3570', '#664EF3']}
					colorsTime={[
						timer.duration,
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

						if (timer.status == EnumStatus.SUCCSESS) {
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
										Time to {timer.status}
									</Text>
								</>
							)
						}

						return (
							<>
								<Text className='color-white text-5xl font-bold'>{`${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`}</Text>
								<Text className='text-white mt-2 text-center text-xl'>
									Time to {timer.status}
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
												index + 1 <= timer.currentSession ||
												timer.status == EnumStatus.SUCCSESS,
											'bg-transparent w-6 h-6 border-4 border-primary':
												index === timer.currentSession - 1 &&
												timer.status !== EnumStatus.SUCCSESS,
											'w-6 h-6 border-4 border-primary':
												index === timer.currentSession - 1 &&
												index === sessionCount - 1,
											'w-4 h-4':
												isSmallIndicator && index === timer.currentSession - 1,
											'w-4 h-4 border-4 border-primary':
												isSmallIndicator &&
												index === timer.currentSession - 1 &&
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
												'bg-primary': index + 2 <= timer.currentSession
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
					disabled={timer.currentSession == 1 || timer.status == EnumStatus.SUCCSESS}
					className={
						timer.currentSession == 1 || timer.status == EnumStatus.SUCCSESS
							? 'opacity-[0.5]'
							: ''
					}
				>
					<Feather name={'arrow-left'} color='white' size={34}></Feather>
				</Pressable>

				<Pressable
					className={cn(
						'mx-4 bg-primary w-20 h-20 items-center justify-center rounded-full',
						{ 'pl-1.5': !timer.isStarting },
						{ 'pl-0': timer.status == EnumStatus.SUCCSESS }
					)}
					onPress={() =>
						timer.status == EnumStatus.SUCCSESS ? reset() : setTimer(prevState => (
							{
								...prevState,
								isStarting: !prevState.isStarting
							}
						))
					}
					style={timer.isStarting && AppConstant.shadow}
				>
					<Feather
						name={
							timer.status == EnumStatus.SUCCSESS
								? 'refresh-cw'
								: timer.isStarting
									? 'pause'
									: 'play'
						}
						color='white'
						size={44}
					></Feather>
				</Pressable>

				<Pressable
					onPress={() => onNext()}
					disabled={timer.currentSession == sessionCount}
					className={timer.currentSession == sessionCount ? 'opacity-[0.5]' : ''}
				>
					<Feather name={'arrow-right'} color='white' size={34}></Feather>
				</Pressable>
			</View>
		</View>
	)
}

export default Timer
