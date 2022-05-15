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
import * as Sentry from '@sentry/react-native';

Sentry.init({
  dsn: "https://ce38444cb9114e5bb6b523919aceb234@o1247650.ingest.sentry.io/6407586",
  // Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring.
  // We recommend adjusting this value in production.
  tracesSampleRate: 1.0,
  debug: true,
  attachStacktrace: true,
  environment: 'development',
});

const App = () => {
  const Stack = createNativeStackNavigator();
  // throw new Error("First Sentry Error");
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

export default Sentry.wrap(App);
