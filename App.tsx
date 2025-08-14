/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { useEffect } from 'react';
import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import Bootsplash from "react-native-bootsplash";

function App() {

  const isDarkMode = useColorScheme() === 'dark';

  useEffect(() => {
    Bootsplash.hide({ fade: true })
  }, [])

  return (
    <View style={styles.container}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
