import { View, Text, TouchableOpacity, StyleSheet, Image, KeyboardAvoidingView, ScrollView } from 'react-native'
import React, { useState } from 'react'
import CustomInputField from '../components/CustomInputField'
import CustomButton from '../components/CustomButton'
import { COLORS } from '../assets/color'
import auth from '@react-native-firebase/auth'
import Identity from 'getsocial-react-native-sdk/models/communities/Identity'
import GetSocial from 'getsocial-react-native-sdk/GetSocial'
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper'
import { CollegeLogo } from '../assets/images'
import { CONFIG } from '../utility/config'

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = () => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        const customIdentity = Identity.createCustomIdentity(CONFIG.provider, email.toLocaleLowerCase(), email.toLocaleLowerCase())
        GetSocial.getCurrentUser().then((currentUser) => {
          currentUser.addIdentity(
            customIdentity, () => {
              console.log('Successfully Logged into ' + currentUser.id);
              navigation.replace('HomeScreen');
            },
            (conflictUser) => {
              GetSocial.switchUser(customIdentity).then(() => {
                navigation.replace('HomeScreen');
              },(error)=>{
                console.error(error);
              });
            },
            (error) => {
              console.log('failed' + error);
            }
          )
        })
      })
      .catch(error => {
        console.error(error);
      })
  }

  const validate = () => {
    login();
  }

  return (
    <KeyboardAvoidingWrapper>
      <View
        style={{ flex: 1, justifyContent: 'center', width: "100%", alignItems: 'center' }}
      >
        <Image
          source={CollegeLogo}
          style={{ width: '90%', marginBottom: '18%' }}
          resizeMode={'stretch'}
        />
        <View style={{
          width: "100%",
          alignItems: 'center',
          backgroundColor: COLORS.formBg,
          marginTop: "10%",
          paddingTop: "5%",
          paddingBottom: '10%',
          borderTopRightRadius: 50,
          borderTopLeftRadius: 50,
        }}>
          <Text
            style={{
              fontSize: 25,
              fontWeight: 'bold',
              color: COLORS.black,
              marginTop: "5%",
              marginBottom: "20%",
              letterSpacing: 5
            }}>
            Log In
          </Text>
          <CustomInputField
            iconType="user"
            placeholder={"Email"}
            onchange={(text) => { setEmail(text) }}
            keyboard={'email-address'}
          />
          <CustomInputField
            iconType="lock"
            placeholder={"Password"}
            top={20}
            hide={true}
            onchange={(text) => { setPassword(text) }}
          />
          <CustomButton
            title={'LogIn'}
            onPress={() => { login() }}
            style={{ width: '90%', marginTop: 20, }}
            fontsize={20}
          />
          <TouchableOpacity
            style={{ flexDirection: 'row', marginTop: "25%" }}
            onPress={() => { navigation.navigate('SignupScreen') }}
            activeOpacity={0.6}>
            <Text style={{ color: COLORS.black, fontSize: 20 }}>Are you new here?{" "}</Text>
            <Text style={{ color: COLORS.link, fontSize: 20 }}>SignUp</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingWrapper>
  )
}


export default LoginScreen;