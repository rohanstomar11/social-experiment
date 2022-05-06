import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const LoginScreen = ({navigation}) => {
  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <TouchableOpacity 
        onPress={()=>{navigation.navigate('SignupScreen')}}>
        <Text>LoginScreen</Text>
      </TouchableOpacity>

    </View>
  )
}

export default LoginScreen;