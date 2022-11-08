import { ObservablePersistMMKV } from '@legendapp/state/mmkv';
import { configureObservablePersistence } from '@legendapp/state/persist';
import { enableLegendStateReact } from '@legendapp/state/react';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import numbro from 'numbro';
import Toast from 'react-native-toast-message';

import { clientID } from './global/ClientProfile';
import Routes from './routes';

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
  clientID.set('6e25bebf-aaaa-4e98-89c2-6f11211f9539');
  numbro.setLanguage('en-US');

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <Routes />
        </NavigationContainer>
      </QueryClientProvider>
      <Toast />
    </>
  );
}
