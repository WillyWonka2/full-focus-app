import cn from 'clsx'
import { Feather } from '@expo/vector-icons'
import { FC, useState } from 'react'
import React from 'react'
import { View, Text, Pressable } from 'react-native'
import { AppConstant } from '@/app.const'
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'

const Timer: FC = () => {
	const [isStarting, setIsStarting] = useState(false)
	return (
		<View className='justify-center items-center'>
			<View className='self-center mt-20'>
				<CountdownCircleTimer
					isPlaying={isStarting}
					duration={300}
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

						if (hours == 0) {
							return (
								<Text className='color-white text-5xl'>{`${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`}</Text>
							)
						}
						return (
							<Text className='color-white text-5xl'>{`${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`}</Text>
						)
					}}
				</CountdownCircleTimer>
				<View className='mt-10 flex-row justify-center'>
					{Array(7)
						.fill(null)
						.map((_, index) => (
							<View className='flex-row items-center justify-center'>
								<View className='w-4 h-4 bg-primary rounded-full' />
								{index + 1 != 7 && <View className='w-5 h-0.5 bg-primary' />}
							</View>
						))}
				</View>
			</View>
			<Pressable
				className={cn(
					'mt-10 self-center bg-primary w-16 h-16 items-center justify-center rounded-full',
					{ 'pl-1.5': !isStarting }
				)}
				onPress={() => setIsStarting(!isStarting)}
				style={isStarting && AppConstant.shadow}
			>
				<Feather
					name={isStarting ? 'pause' : 'play'}
					color='white'
					size={38}
				></Feather>
			</Pressable>
		</View>
	)
}

export default Timer
