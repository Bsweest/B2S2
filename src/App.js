import { ObservablePersistMMKV } from '@legendapp/state/mmkv';
import { configureObservablePersistence } from '@legendapp/state/persist';
import { enableLegendStateReact } from '@legendapp/state/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import numbro from 'numbro';
import Toast from 'react-native-toast-message';

import Main from './routes/Main';

// Global configuration
configureObservablePersistence({
  // Use react-native-mmkv in React Native
  persistLocal: ObservablePersistMMKV,
});

const queryClient = new QueryClient();
enableLegendStateReact();

export default function App() {
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
