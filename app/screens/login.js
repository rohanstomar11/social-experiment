import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import CustomInputField from '../components/CustomInputField'
import CustomButton from '../components/CustomButton'
import { COLORS } from '../assets/color'
import auth from '@react-native-firebase/auth'

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [Password, setPassword] = useState('');

  const login = () => {
    auth()
      .signInWithEmailAndPassword(email, Password)
      .then(()=>{
        navigation.navigate('HomeScreen');
      })
      .catch(error=>{
        console.error(error);
      })
  }

  return (
    <View style={{
      flex: 1,
      justifyContent: 'space-around',
      alignItems: 'center',
      backgroundColor: COLORS.background,
    }}>
      <View>
        <Text
          style={{
            fontSize: 25,
            fontWeight: 'bold',
            color: COLORS.black,
        }}>
          LoginScreen
        </Text>
      </View>
      <View style={{width: '100%', alignItems: 'center'}}>
        <CustomInputField
          placeholder={"Email"}
          onchange={(text)=>{setEmail(text)}}
        />
        <CustomInputField
          placeholder={"Password"}
          top={20}
          hide={true}
          onchange={(text)=>{setPassword(text)}}
        />
        <CustomButton
          title={'LogIn'}
          onPress={() => {login()}}
          style={{ width: '85%', marginTop: 20, }}
          fontsize={20}
        />
      </View>
      <TouchableOpacity
        style={{ flexDirection: 'row' }} 
        onPress={()=>{navigation.navigate('SignupScreen')}}
        activeOpacity={0.6}>
        <Text>Are you new here?</Text>
        <Text>SignUp</Text>
      </TouchableOpacity>
    </View>
  )
}

export default LoginScreen;