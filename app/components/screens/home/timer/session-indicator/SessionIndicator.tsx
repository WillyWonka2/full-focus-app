import { FC } from 'react'
import { View, Text } from 'react-native'
import { EnumStatus } from '../timer.interface'
import cn from 'clsx'
import { sessionCount } from '../timer.constants'

const isSmallIndicator = sessionCount > 7

interface ISessionIndicator {
	sessionCount: number
	currentSession: number
	status: EnumStatus
}

const SessionIndicator: FC<ISessionIndicator> = ({
	sessionCount,
	currentSession,
	status
}) => {
	return (
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
										index === currentSession - 1 && index === sessionCount - 1,
									'w-4 h-4': isSmallIndicator && index === currentSession - 1,
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
	)
}

export default SessionIndicator
