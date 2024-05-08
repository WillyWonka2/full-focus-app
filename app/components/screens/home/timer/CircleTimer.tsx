import { FC } from 'react'
import React from 'react'
import { Text } from 'react-native'
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import { EnumStatus } from './timer.interface'

const CircleTimer: FC<any> = ({
	onComplete,
	newKey,
	isStarting,
	duration,
	status
}) => {
	return (
		<CountdownCircleTimer
			key={newKey}
			isPlaying={isStarting}
			duration={duration}
			colors={['#3A3570', '#664EF3']}
			colorsTime={[duration, 0]}
			trailColor='#2F2F4C'
			onComplete={() => onComplete()}
			size={320}
			strokeWidth={15}
		>
			{({ remainingTime }) => {
				const hours = Math.floor(remainingTime / 3600)
				const minutes = Math.floor((remainingTime % 3600) / 60)
				const seconds = remainingTime % 60

				function time() {
					let time = ''
					if (hours === 0) {
						time = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
					} else {
						time = `${hours < 10 ? '0' : ''}${minutes}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
					}
					return time
				}

				return (
					<>
						{status == EnumStatus.SUCCSESS ? (
							<Text className='color-white text-4xl font-bold'>
								{EnumStatus.SUCCSESS}!
							</Text>
						) : (
							<>
								<Text className='color-white text-5xl font-bold'>{time()}</Text>
								<Text className='text-white mt-2 text-center text-xl'>
									Time to {status}
								</Text>
							</>
						)}
					</>
				)
			}}
		</CountdownCircleTimer>
	)
}

export default CircleTimer
