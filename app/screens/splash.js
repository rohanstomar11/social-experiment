import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const SplashScreen = ({navigation}) => {
  return (
    <View style={{
      flex:1,
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <TouchableOpacity
      onPress={() => navigation.navigate('LoginScreen')}>
        <Text>SplashScreen</Text>
      </TouchableOpacity>
    </View>
  )
}

export default SplashScreen;