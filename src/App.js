import Main from './routes/Main'

import { Provider } from "react-redux"
import store from "./redux/store"

import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Main/>
      </Provider>
    </QueryClientProvider>
  )
}