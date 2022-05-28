import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import CustomInputField from '../components/CustomInputField';
import CustomButton from '../components/CustomButton';
import {COLORS} from '../assets/color';
import auth from '@react-native-firebase/auth';
import Identity from 'getsocial-react-native-sdk/models/communities/Identity';
import GetSocial from 'getsocial-react-native-sdk/GetSocial';
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';
import {CollegeLogo} from '../assets/images';
import {CONFIG} from '../utility/config';
import MyAppText from '../components/MyAppText';
import { FONTS } from '../assets/fontFamily';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Taking Care of the error data
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const login = () => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        const customIdentity = Identity.createCustomIdentity(CONFIG.provider, email.toLocaleLowerCase(), email.toLocaleLowerCase())
        GetSocial.getCurrentUser().then((currentUser) => {
          currentUser.addIdentity(
            customIdentity, () => {
              console.log('Successfully Logged into ' + currentUser.id);
              navigation.replace('TabScreen');
            },
            (conflictUser) => {
              GetSocial.switchUser(customIdentity).then(() => {
                navigation.replace('TabScreen');
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
    if (
      (!email || email === '' || email.length === 0) &&
      (!password || password === '' || password.length === 0)
    ) {
      setPasswordError('Please fill in the required field');
      setEmailError('Please fill in the required field');
      return;
    }

    if (!password || password === '' || password.length === 0) {
      setPasswordError('Please fill in the required field');
      return;
    }

    if (!email || email === '' || email.length === 0) {
      setEmailError('Please fill in the required field');
      return;
    }

    // For non empty email validation
    if (
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.trim())
    ) {
      setEmailError('Please enter valid Email Id');
      return;
    }

    login();
  }

  return (
    <KeyboardAvoidingWrapper>
      <View
        style={styles.container}>
        <Image
          source={CollegeLogo}
          style={{
            width: '90%',
            marginBottom: '8%',
            marginTop: 30,
          }}
          resizeMode={'stretch'}
          />
        <View style={styles.secondaryContainer}>
          <MyAppText
          family={FONTS.Bold}
          textSize={30}
          textColor={COLORS.primary}
          marginBottom={30}
          >
            LOG IN
          </MyAppText>
          <CustomInputField
            autoFocus={true}
            header={'Email ID'}
            iconType="user"
            placeholder={"Email"}
            onchange={(text) => {setEmail(text)}}
            keyboard={'email-address'}
            errorText={emailError}
            />
          <CustomInputField
          header={'Password'}
            iconType="lock"
            placeholder={"Password"}
            hide={true}
            onchange={(text) => {setPassword(text)}}
            errorText={passwordError}
            />
          <CustomButton
            title={'LogIn'}
            onPress={() => {validate()}}
            style={{
              width: '90%',
              marginTop: 20,
            }}
            fontsize={20}
            />
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              marginTop: "25%",
            }}
            onPress={() => { navigation.navigate('SignupScreen') }}
            activeOpacity={0.6}>
            <Text
              style={{
                color: COLORS.text,
                fontSize: 20,
                fontFamily: FONTS.Regular
              }}>
              Are you new here?{" "}
            </Text>
            <Text
              style={{
                color: COLORS.primary,
                fontSize: 20,
                fontFamily: FONTS.Regular
              }}>
                SignUp
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingWrapper>
  );
};

const styles = StyleSheet.create({
container: {
  flex: 1,
  justifyContent: 'center',
  width: "100%",
  alignItems: 'center',
},
secondaryContainer: {
  width: "100%",
  alignItems: 'center',
  marginTop: "10%",
  paddingTop: "5%",
  paddingBottom: '10%',
  borderTopRightRadius: 50,
  borderTopLeftRadius: 50,
},
});

export default LoginScreen;