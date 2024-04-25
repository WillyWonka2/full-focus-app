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
		<View>
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
			<CountdownCircleTimer
					isPlaying = {isStarting}
					duration={7}
					colors={['#004777', '#F7B801', '#A30000', '#A30000']}
					colorsTime={[7, 5, 2, 0]}
				>
					{({ remainingTime }) => <Text>{remainingTime}</Text>}
				</CountdownCircleTimer>
		</View>
	)
}

export default Timer
