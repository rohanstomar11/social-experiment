import { View, Image, } from 'react-native'
import React, {useEffect} from 'react'
import { FullLogo } from '../assets/images'
import { COLORS } from '../assets/color'

const SplashScreen = ({navigation}) => {

  useEffect(()=>{
    timeoutHelper(()=>{
      navigation.replace('LoginScreen')
    })
  })

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