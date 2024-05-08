import { FC, useState } from 'react'
import React from 'react'
import { View } from 'react-native'
import { EnumStatus, ITimer } from './timer.interface'
import CircleTimer from './CircleTimer'
import { flowDuration, sessionCount, breakDuration } from './timer.constants'
import SessionIndicator from './session-indicator/SessionIndicator'
import Actions from './actions/Actions'


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

	function statusHandler(){
		setTimer(prevState => ({
			...prevState,
			isStarting: !prevState.isStarting
		}))
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
				/>
				<SessionIndicator sessionCount={sessionCount} currentSession={timer.currentSession} status={timer.status}/>
			</View>
			<Actions currentSession={timer.currentSession} status={timer.status} reset={reset} isStarting={timer.isStarting} onNext={onNext} onPrev={onPrev} sessionCount={sessionCount} startHandler={statusHandler}/>
			
		</View>
	)
}

export default Timer
