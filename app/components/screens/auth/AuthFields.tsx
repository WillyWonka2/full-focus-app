import { FC } from 'react'
import React from 'react'
import { View, Text, TextInput } from 'react-native'
import { Control, Controller} from 'react-hook-form'
import cn from 'clsx'
import { validEmail } from './email.rgx'
import { IAuthFormData } from '@/types/auth.interface'

const AuthFields: FC<{control: Control<IAuthFormData>}> = ({control}) => {
	return (
		<>
			<Controller
				control={control}
				name='email'
				rules={{
					required: 'Email is required',
					pattern: {
						value: validEmail,
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
						{error && <Text className='text-red-500'>{error.message}</Text>}
					</>
				)}
			/>
            <Controller
				control={control}
				name='password'
				rules={{
					required: 'Password is required',
                    minLength: {
                        value: 6,
                        message: 'Too short password'
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
								placeholder='Enter password'
								value={value}
								onChangeText={onChange}
								onBlur={onBlur}
								autoCapitalize='none'
								className='text-white text-lg leading-5'
                                secureTextEntry
							/>
						</View>
						{error && <Text className='text-red-500'>{error.message}</Text>}
					</>
				)}
			/>
		</>
	)
}

export default AuthFields
