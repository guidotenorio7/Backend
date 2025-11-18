import 'react-native-gesture-handler';
import 'react-native-reanimated';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SessionProvider } from './src/components/Session';
import Layout from './src/Layout';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SessionProvider>
        <Layout />
      </SessionProvider>
    </GestureHandlerRootView>
  );
}
