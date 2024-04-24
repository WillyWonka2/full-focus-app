import Button from '@/components/ui/layout/Button'
import Loader from '@/components/ui/layout/loader'
import { useAuth } from '@/hooks/useAuth'
import { IAuthFormData } from '@/types/auth.interface'
import React, { FC, useState } from 'react'
import {SubmitHandler, useForm } from 'react-hook-form'
import {
	View,
	Text,
	TouchableWithoutFeedback,
	Keyboard,
	Pressable
} from 'react-native'
import AuthFields from './AuthFields'

const Auth: FC = () => {
	const [isReq, setIsReq] = useState(false)

	const { control, reset, handleSubmit } = useForm<IAuthFormData>({
		mode: 'onChange'
	})

	const { setUser } = useAuth()

	const onSubmit: SubmitHandler<IAuthFormData> = data => {
		setUser({
			_id: '',
			...data
		})
		reset()
	}

	const isLoading = false

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
			<View className='items-center justify-center flex-1'>
				<View className='w-3/4'>
					<Text className='text-white text-4xl text-center font-bold mb-5'>
						{isReq ? 'Sign Up' : ' Sign in'}
					</Text>
					{isLoading ? (
						<Loader />
					) : (
						<>
							{/* Fields */}
							<AuthFields control={control}/>
							<Button onPress={handleSubmit(onSubmit)}>Let's go</Button>
							<Pressable
								onPress={() => setIsReq(!isReq)}
								className='w-16 ml-auto'
							>
								<Text className='text-opacity-60 text-white text-base mt-3 text-right'>
									{isReq ? 'Login' : 'Register'}
								</Text>
							</Pressable>
						</>
					)}
				</View>
			</View>
		</TouchableWithoutFeedback>
	)
}

export default Auth
