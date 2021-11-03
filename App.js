import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Menu from './src/components/Menu';
import { NavigationContainer } from "@react-navigation/native"

export default function App() {
  return (
    <NavigationContainer style={styles.container}>
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
