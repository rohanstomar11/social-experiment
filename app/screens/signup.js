import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React, {useState} from 'react';
import {COLORS} from '../assets/color';
import CustomInputField from '../components/CustomInputField';
import CustomButton from '../components/CustomButton';
import auth from '@react-native-firebase/auth';
import GetSocial from 'getsocial-react-native-sdk/GetSocial';
import Identity from 'getsocial-react-native-sdk/models/communities/Identity';
import {CollegeLogo} from '../assets/images';
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';
import {CONFIG} from '../utility/config';
import MyAppText from '../components/MyAppText';
import { FONTS } from '../assets/fontFamily';

const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setRepassword] = useState('');

  // Taking Care of the error data
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [repasswordError, setRepasswordError] = useState('');

  const signup = () => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        const customIdentity = Identity.createCustomIdentity(CONFIG.provider, email.toLocaleLowerCase(), email.toLocaleLowerCase())
        GetSocial.getCurrentUser().then((currentUser) => {
          currentUser.addIdentity(
            customIdentity, () => {
              console.log('Successfully Logged into ' + currentUser.id);
              navigation.replace('OnboardScreen');
            },
            (conflictUser) => {
              GetSocial.switchUser(customIdentity).then(()=>{
                navigation.replace('OnboardScreen');
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
      if (
        (!email || email === '' || email.length === 0) &&
        (!password || password === '' || password.length === 0) &&
        (!repassword || repassword === '' || repassword.length === 0)

      ) {
        setPasswordError('Please fill in the required field');
        setEmailError('Please fill in the required field');
        setRepasswordError('Please fill in the required field');
        return;
      }
      
      if (!email || email === '' || email.length === 0) {
        setEmailError('Please fill in the required field');
        return;
      }

      if (!password || password === '' || password.length === 0) {
        setPasswordError('Please fill in the required field');
        return;
      }

      if (!repassword || repassword === '' || repassword.length === 0) {
        setRepasswordError('Please fill in the required field');
        return;
      }
  
      // For non empty email validation
      if (
        !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.trim())
      ) {
        setEmailError('Please enter valid Email Id');
        return;
      }

      if (password != repassword) {
        alert('Passwords are not same')
        return;
      }
      signup();
    }

  return (
    <KeyboardAvoidingWrapper>
      <View
        style={styles.container}>
        <Image
          source={CollegeLogo}
          style={{
            width: '90%',
            marginBottom: "10%",
            marginTop: 30,
          }}
          resizeMode={'stretch'}
          />
        <View
          style={styles.secondaryContainer}>
          <MyAppText
          family={FONTS.Bold}
          textSize={30}
          textColor={COLORS.primary}
          marginBottom={30}
          >
            SIGN UP
          </MyAppText>
          <CustomInputField
            header={'Email ID'}
            autoFocus={true}
            iconType={'user'}
            placeholder={"Enter Email"}
            onchange={(text) => setEmail(text)}
            keyboard={'email-address'}
            errorText={emailError}
            />
          <CustomInputField
            header={'Password'}
            iconType={'lock'}
            placeholder={"Enter Password"}
            hide={true}
            onchange={(text) => setPassword(text)}
            errorText={passwordError}
            />
          <CustomInputField
            header={'Confirm Password'}
            iconType={'key'}
            placeholder={"Re-Enter Password"}
            hide={true}
            onchange={(text) => setRepassword(text)}
            errorText={repasswordError}
            />
          <CustomButton
            style={{
              marginTop: 20,
              width: '90%',
            }}
            fontsize={20}
            title={"SIGNUP"}
            onPress={() => validate()}
            />
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              marginTop: "15%",
            }}
            onPress={() => navigation.navigate('LoginScreen')}
            activeOpacity={0.6}>
            <Text
              style={{
                color: COLORS.text,
                fontSize: 20,
                fontFamily: FONTS.Regular
              }}>
              Already have account?{" "}
            </Text>
            <Text
            style={{
              color: COLORS.primary,
              fontSize: 20,
              fontFamily: FONTS.Regular
            }}>
              LogIn
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
    paddingBottom: '10%',
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
  },
});

export default SignupScreen;