import Button from '@/components/ui/layout/Button'
import Loader from '@/components/ui/layout/loader'
import { useAuth } from '@/hooks/useAuth'
import { IAuthFormData } from '@/types/auth.interface'
import React, { FC, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import {
	View,
	Text,
	TouchableWithoutFeedback,
	Keyboard,
	Pressable,
	TextInput
} from 'react-native'
import cn from 'clsx'
import { validEmail } from './email.rgx'

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
							<Controller
								control={control}
								name='email'
								rules={{
									required: 'Email is required',
									pattern: {
										value:  validEmail,
										message: 'Your Email is invalid!'
									}
								}}
								render={({
									field: { value, onChange, onBlur },
									fieldState: { error }
								}) => (
									<>
										<View
											className={cn(
												'rounded bg-[#272541] border-solid border pb-3 pt-3 px-4 my-2',
												!!error ? 'border-red-500' : 'border-trasnparent'
											)}
										>
											<TextInput
												placeholder='Enter email'
												value={value}
												onChangeText={onChange}
												onBlur={onBlur}
												autoCapitalize='none'
												className='text-white text-lg leading-5'
											/>
										</View>
										{error && (
											<Text className='text-red-500'>{error.message}</Text>
										)}
									</>
								)}
							/>
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
