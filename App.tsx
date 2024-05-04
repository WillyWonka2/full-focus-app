import AuthProvider from '@/providers/AuthProvider'
import { StatusBar } from 'expo-status-bar'
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import Navigation from '@/navigation/Navigation'

const queryClient = new QueryClient()

export default function App() {
	return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <SafeAreaProvider>
          <Navigation/>
        </SafeAreaProvider>
      </AuthProvider>
      <StatusBar style='light'/>
    </QueryClientProvider>
	)
}
