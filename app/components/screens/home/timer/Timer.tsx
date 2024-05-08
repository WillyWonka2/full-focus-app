import cn from 'clsx'
import { Feather } from '@expo/vector-icons'
import { FC, useState } from 'react'
import React from 'react'
import { View, Pressable } from 'react-native'
import { AppConstant } from '@/app.const'
import { EnumStatus, ITimer } from './timer.interface'
import CircleTimer from './CircleTimer'
import { flowDuration, sessionCount, breakDuration } from './timer.constants'

const isSmallIndicator = sessionCount > 7

const Timer: FC = () => {
	const [timer, setTimer] = useState<ITimer>({
		isStarting: false,
		status: EnumStatus.WORK,
		currentSession: 1,
		duration: flowDuration,
		key: 0
	})

	function onComplete() {
		if (timer.currentSession == sessionCount) {
			setTimer(prevState => ({
				...prevState,
				status: EnumStatus.SUCCSESS,
				isStarting: false
			}))
		} else {
			setTimer(prevState => ({
				currentSession: prevState.currentSession + 1,
				status:
					prevState.status == EnumStatus.WORK
						? EnumStatus.REST
						: EnumStatus.WORK,
				duration:
					prevState.duration === breakDuration ? flowDuration : breakDuration,
				isStarting: false,
				key: prevState.key + 1
			}))
		}
	}

	function onPrev() {
		setTimer(prevState => ({
			status:
				prevState.status == EnumStatus.WORK ? EnumStatus.REST : EnumStatus.WORK,
			currentSession: prevState.currentSession - 1,
			key: prevState.key - 1,
			isStarting: false,
			duration:
				prevState.status == EnumStatus.WORK ? breakDuration : flowDuration
		}))
	}

	function onNext() {
		setTimer(prevState => ({
			currentSession: prevState.currentSession + 1,
			status:
				prevState.status == EnumStatus.WORK ? EnumStatus.REST : EnumStatus.WORK,
			duration:
				prevState.status == EnumStatus.WORK ? breakDuration : flowDuration,
			isStarting: false,
			key: prevState.key + 1
		}))
	}

	function reset() {
		setTimer(() => ({
			currentSession: 1,
			status: EnumStatus.WORK,
			duration: flowDuration,
			isStarting: false,
			key: 0
		}))
	}

	return (
		<View className='flex-1 justify-center'>
			<View className='self-center'>
				{/* TODO */}
				<CircleTimer
					onComplete={onComplete}
					key={timer.key}
					isStarting={timer.isStarting}
					status={timer.status}
					duration={timer.duration}
				></CircleTimer>
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
					disabled={
						timer.currentSession == 1 || timer.status == EnumStatus.SUCCSESS
					}
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
						timer.status == EnumStatus.SUCCSESS
							? reset()
							: setTimer(prevState => ({
									...prevState,
									isStarting: !prevState.isStarting
								}))
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
					className={
						timer.currentSession == sessionCount ? 'opacity-[0.5]' : ''
					}
				>
					<Feather name={'arrow-right'} color='white' size={34}></Feather>
				</Pressable>
			</View>
		</View>
	)
}

export default Timer
