import { View } from 'react-native'
import React, {useState} from 'react'
import { COLORS } from '../assets/color'
import CustomInputField from '../components/CustomInputField'
import CustomButton from '../components/CustomButton'
import auth from '@react-native-firebase/auth'


const SignupScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setRepassword] = useState('');

  const signup = () => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(()=>{
        auth()
          .signOut()
          .then(()=>{navigation.navigate('LoginScreen')})
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

  const validate = () => {
    if(password===repassword){
      signup();
    }
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.background}}>
      <CustomInputField
        placeholder={"Enter Email"}
        onchange={(text)=>{setEmail(text)}}
      />
      <CustomInputField
        placeholder={"Enter Password"}
        hide={true}
        top={20}
        onchange={(text)=>{setPassword(text)}}
      />
      <CustomInputField
        placeholder={"Re-Enter Password"}
        hide={true}
        top={20}
        onchange={(text)=>{setRepassword(text)}}
      />
      <CustomButton
        style={{marginTop: 20, width: '60%'}}
        title={"SIGNUP"}
        onPress={()=>{validate()}}
      />
    </View>
  )
}

export default SignupScreen;