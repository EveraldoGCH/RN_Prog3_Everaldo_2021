import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Menu from './src/components/Menu';
import Header from './src/components/Header';
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";


export default function App() {

  const [loaded] = useFonts({
    Montserrat: require('./assets/fonts/Montserrat-SemiBoldItalic.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <NavigationContainer style={styles.container}>
      <Header/>
      <Menu />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  drawerNavigator:{
    backgroundColor:"black"
    },
});
