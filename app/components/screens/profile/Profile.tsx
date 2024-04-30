import Button from '@/components/ui/layout/Button'
import Layout from '@/components/ui/layout/Layout'
import { useAuth } from '@/hooks/useAuth'
import React from 'react'
import { View, Text } from 'react-native'

const Profile = () => {
	const { user, setUser } = useAuth()
	return (
		<Layout title='Profile'>
			<View
				className='items-center flex-row'
			>
				<Text className='text-xl font-bold my-2 text-white'>Your Email: </Text>
				<Text className="text-xl font-bold my-2 text-[#664EFE]">{user?.email}</Text>
			</View>

			<Button onPress={() => setUser(null)} className='mt-auto mb-10'>Logout</Button>
		</Layout>
	)
}

export default Profile
