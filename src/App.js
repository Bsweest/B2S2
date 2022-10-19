import Main from './routes/Main'

import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { ObservablePersistMMKV } from '@legendapp/state/mmkv'
import { configureObservablePersistence } from '@legendapp/state/persist'
import { enableLegendStateReact } from "@legendapp/state/react"
import numbro from 'numbro'

// Global configuration
configureObservablePersistence({
  // Use react-native-mmkv in React Native
  persistLocal: ObservablePersistMMKV
})

const queryClient = new QueryClient();
enableLegendStateReact()

export default function App() {
  numbro.setLanguage('en-US')

  return (
    <QueryClientProvider client={queryClient}>
        <Main/>
    </QueryClientProvider>
  )
}