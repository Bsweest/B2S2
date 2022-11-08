import { ObservablePersistMMKV } from '@legendapp/state/mmkv';
import { configureObservablePersistence } from '@legendapp/state/persist';
import { enableLegendStateReact } from '@legendapp/state/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import numbro from 'numbro';
import Toast from 'react-native-toast-message';

import { clientID } from './global/ClientProfile';
import Main from './routes/Main';

// Global configuration
configureObservablePersistence({
  // Use react-native-mmkv in React Native
  persistLocal: ObservablePersistMMKV,
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});
enableLegendStateReact();

export default function App() {
  clientID.set('739fe296-3bfb-43d9-b1fb-12a280ab557a');
  numbro.setLanguage('en-US');

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Main />
      </QueryClientProvider>
      <Toast />
    </>
  );
}
