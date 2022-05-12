import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './app/screens/splash';
import LoginScreen from './app/screens/login';
import SignupScreen from './app/screens/signup';
import HomeScreen from './app/screens/home';
import OnboardScreen from './app/screens/onboard';

const App = () => {
  const Stack = createNativeStackNavigator();
  return (
    <SafeAreaView style={{ flex:1, }}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flex: 1, }}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName='SplashScreen' screenOptions={{
            headerShown: false
          }}>
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="SignupScreen" component={SignupScreen} />
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="OnboardScreen" component={OnboardScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  
});

export default App;
