import { NavigationContainer } from '@react-navigation/native';
import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import Bootsplash from "react-native-bootsplash";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ModalProvider } from './src/contexts/ModalContext';
import AppStackNavigator from './src/navigation/AppStackNavigator';
import { persistor, store } from './src/redux/Store';
import colors from './src/utils/colors';
import { navigationRef } from './src/utils/navigation';

function App() {

  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <View style={styles.container}>
          <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
          <ModalProvider>
            <NavigationContainer ref={navigationRef} onReady={() => Bootsplash.hide({ fade: true })}>
              <AppStackNavigator />
            </NavigationContainer>
          </ModalProvider>
        </View>
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
