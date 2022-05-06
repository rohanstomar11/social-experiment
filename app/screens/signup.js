import { View, Text } from 'react-native'
import React, {useState} from 'react'
import { COLORS } from '../assets/color'
import CustomInputField from '../components/CustomInputField'
import CustomButton from '../components/CustomButton'
import auth from '@react-native-firebase/auth'


const SignupScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signup = () => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(()=>{
        navigation.navigate('LoginScreen')
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }
        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }
        console.error(error);
      })
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.background}}>
      <CustomInputField
        placeholder={"Email"}
        onchange={(text)=>{setEmail(text)}}
      />
      <CustomInputField
        placeholder={"Password"}
        hide={true}
        top={20}
        onchange={(text)=>{setPassword(text)}}
      />
      <CustomButton
        style={{marginTop: 20, width: '60%'}}
        title={"SIGNUP"}
        onPress={()=>{signup()}}
      />
    </View>
  )
}

export default SignupScreen;