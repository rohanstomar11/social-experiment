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

const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setRepassword] = useState('');

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
    if (password === repassword) {
      signup();
    }
  }

  return (
    <KeyboardAvoidingWrapper>
      <View
        style={styles.container}>
        <Image
          source={CollegeLogo}
          style={{
            width: '90%',
            marginBottom: "20%",
          }}
          resizeMode={'stretch'}
          />
        <View
          style={styles.secondaryContainer}>
          <Text
            style={styles.title}>
            Sign Up
          </Text>
          <CustomInputField
            iconType={'user'}
            placeholder={"Enter Email"}
            onchange={(text) => setEmail(text)}
            keyboard={'email-address'}
            />
          <CustomInputField
            iconType={'lock'}
            placeholder={"Enter Password"}
            hide={true}
            top={20}
            onchange={(text) => setPassword(text)}
            />
          <CustomInputField
            iconType={'key'}
            placeholder={"Re-Enter Password"}
            hide={true}
            top={20}
            onchange={(text) => setRepassword(text)}
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
              marginTop: "25%",
            }}
            onPress={() => navigation.navigate('LoginScreen')}
            activeOpacity={0.6}>
            <Text
              style={{
                color: COLORS.text,
                fontSize: 20,
              }}>
              Already have account?{" "}
            </Text>
            <Text
            style={{
              color: COLORS.primary,
              fontSize: 20,
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
    backgroundColor: COLORS.formBg,
    paddingTop: "5%",
    paddingBottom: '10%',
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: COLORS.black,
    marginTop: "5%",
    marginBottom: "10%",
    letterSpacing: 5,
  },
});

export default SignupScreen;