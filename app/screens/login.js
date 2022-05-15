import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import CustomInputField from '../components/CustomInputField'
import CustomButton from '../components/CustomButton'
import { COLORS } from '../assets/color'
import auth from '@react-native-firebase/auth'
import CustomDot from '../components/CustomDot'
import Identity from 'getsocial-react-native-sdk/models/communities/Identity'
import GetSocial from 'getsocial-react-native-sdk/GetSocial'

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = () => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(()=>{
        const customIdentity = Identity.createCustomIdentity('firebase-15-05-2022', email.toLocaleLowerCase(), email.toLocaleLowerCase())
        GetSocial.getCurrentUser().then((currentUser)=>{
          currentUser.addIdentity(
            customIdentity, ()=> {
              console.log('Successfully Logged into ' + currentUser.id);
              navigation.replace('HomeScreen');
            },
            (conflictUser) => {
              GetSocial.switchUser(customIdentity).then(()=>{
                navigation.replace('HomeScreen');
              });
            },
            (error) => {
              console.log('failed' + error);
            }
          )
        })
      })
      .catch(error=>{
        console.error(error);
      })
  }
  
  const validate = () => {
    login();
  }

  return (
    <View style={{
      flex: 1,
      justifyContent: 'space-around',
      alignItems: 'center',
      backgroundColor: COLORS.black,
    }}>
    <CustomDot 
      top={'-7%'}
    right={'-7%'}
    height={220}
    width={220}
    />
    <CustomDot 
    bottom={'-7%'}
    left={'-7%'}
    height={220}
    width={220}
    />
    <CustomDot 
    top={'35%'}
    height={250}
    width={250}
    />
      <View>
        <Text
          style={{
            fontSize: 25,
            fontWeight: 'bold',
            color: COLORS.white,
        }}>
          LoginScreen
        </Text>
      </View>
      <View style={{width: '100%', alignItems: 'center'}}>
        <CustomInputField
          placeholder={"Email"}
          onchange={(text)=>{setEmail(text)}}
          keyboard={'email-address'}
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
        <Text style={{color: COLORS.white}}>Are you new here?</Text>
        <Text style={{color: COLORS.white}}>SignUp</Text>
      </TouchableOpacity>
    </View>
  )
}

export default LoginScreen;