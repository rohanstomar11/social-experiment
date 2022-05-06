import { View, Text, TouchableOpacity } from 'react-native'
import React, {useState} from 'react'
import CustomInputField from '../components/CustomInputField'

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('')
  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <CustomInputField placeholder={"Email"}/>
      <CustomInputField placeholder={"Password"} top={20} hide={true}/>
      {/* <TouchableOpacity 
        onPress={()=>{navigation.navigate('SignupScreen')}}>
        <Text>LoginScreen</Text>
      </TouchableOpacity> */}
    </View>
  )
}

export default LoginScreen;