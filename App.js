import React from 'react';
import {
  SafeAreaView,
  LogBox,
  View
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './app/screens/splash';
import LoginScreen from './app/screens/login';
import SignupScreen from './app/screens/signup';
import HomeScreen from './app/screens/home';
import OnboardScreen from './app/screens/onboard';
import ListScreen from './app/screens/list';
import GroupScreen from './app/screens/group';
import PostScreen from './app/screens/post';
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
import CommentScreen from './app/screens/comment';
import ProfileScreen from './app/screens/profile';
import CreateGroupScreen from './app/screens/creategroup';
import GroupChatScreen from './app/screens/groupchat'

LogBox.ignoreLogs(["ViewPropTypes will be removed from React Native. Migrate to ViewPropTypes exported from 'deprecated-react-native-prop-types'."]);

const App = () => {
  const Stack = createNativeStackNavigator();
  // throw new Error("First Sentry Error");
  return (
    <SafeAreaView style={{ flex:1, }}>
      <View
        style={{ flex: 1, }}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName='SplashScreen' screenOptions={{
            headerShown: false
          }}>
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="SignupScreen" component={SignupScreen} />
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="OnboardScreen" component={OnboardScreen} />
          <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
          <Stack.Screen name="ListScreen" component={ListScreen} />
          <Stack.Screen name="GroupScreen" component={GroupScreen} />
          <Stack.Screen name="PostScreen" component={PostScreen} />
          <Stack.Screen name="CommentScreen" component={CommentScreen} />
          <Stack.Screen name="CreateGroupScreen" component={CreateGroupScreen} />
          <Stack.Screen name="GroupChatScreen" component={GroupChatScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </SafeAreaView>
  );
};

export default Sentry.wrap(App);
