import { View, Image, LogBox } from 'react-native'
import React, {useEffect} from 'react'
import { FullLogo } from '../assets/images'
import { COLORS } from '../assets/color'
import auth from '@react-native-firebase/auth'
import { GetSocial } from 'getsocial-react-native-sdk'
import { CONFIG } from '../utility/config'

LogBox.ignoreLogs(['new NativeEventEmitter']);

const SplashScreen = ({navigation}) => {

  useEffect(()=>{
    initializeGetSocial();
    timeoutHelper(()=>{
      const unsubscribe = auth().onAuthStateChanged((user)=>{
        if(user){
          navigation.replace('TabScreen')
        } else {
          navigation.replace('LoginScreen')
        }
        unsubscribe();
      })
    })
  })

  const initializeGetSocial = () => {
    const appId = CONFIG.appId;
    GetSocial.initWithAppId(appId);
    GetSocial.addOnInitializedListener(()=>{
      console.log('GetSocialSDK Initialized');
    });
  };

  const timeoutHelper = (action) => {
    const timer = setTimeout(() => {
      action();
    }, 1500);
    return () => clearTimeout(timer);
  };

  return (
    <View style={{
      flex:1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: COLORS.white,
    }}>
      <Image source={FullLogo} style={{width: '80%'}}/>
    </View>
  )
}

export default SplashScreen;