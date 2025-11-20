import { NavigationContainer } from '@react-navigation/native';
import { StatusBar, StyleSheet, View } from 'react-native';
import Bootsplash from 'react-native-bootsplash';
import ErrorBoundary from 'react-native-error-boundary';
import Toast from 'react-native-toast-message';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import ErrorFallback from './src/components/ErrorFallback';
import { ModalProvider } from './src/contexts/ModalContext';
import AppStackNavigator from './src/navigation/AppStackNavigator';
import { persistor, store } from './src/redux/Store';
import colors from './src/utils/colors';
import { navigationRef } from './src/utils/navigation';
import { StripeProvider } from '@stripe/stripe-react-native';
import { useSocket } from './src/hooks';

// Replace with your actual Stripe publishable key
const STRIPE_PUBLISHABLE_KEY = 'pk_test_51OHpI2EN9IooQZRaU3MAJ8mKTWdFhvI7vequEoOlA9qlEOP1gdLKSB01ec6GeJkfAjHgQjipR85UligbuLBs5UaI00aoghaww7';

// Component to initialize socket
const SocketInitializer = () => {
  useSocket();
  return null;
};

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StripeProvider publishableKey={STRIPE_PUBLISHABLE_KEY}>
          <SocketInitializer />
          <View style={styles.container}>
            <StatusBar
              barStyle={'dark-content'}
              backgroundColor={colors.light_primary}
            />
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <ModalProvider>
                <NavigationContainer
                  ref={navigationRef}
                  onReady={() => Bootsplash.hide({ fade: true })}
                >
                  <AppStackNavigator />
                  <Toast />
                </NavigationContainer>
              </ModalProvider>
            </ErrorBoundary>
          </View>
        </StripeProvider>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light_primary
  },
});

export default App;
