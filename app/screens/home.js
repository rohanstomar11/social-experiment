import { View, Text } from 'react-native'
import React from 'react'
import CustomButton from '../components/CustomButton';
import auth from '@react-native-firebase/auth'
import GetSocial from 'getsocial-react-native-sdk/GetSocial'

const HomeScreen = ({navigation}) => {

  const logout = () => {
    GetSocial.resetUser().then(()=>{
      auth()
      .signOut()
      .then(()=>{navigation.replace('LoginScreen')})
    })
  }

  const getData = () => {
    GetSocial.getCurrentUser().then((currentUser)=>{
      console.log(currentUser.id);
    })
  }

  return (
    <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }}>
      <Text>HomeScreen</Text>
      <CustomButton
        title={"LOGOUT"}
        style={{marginTop: 12, width: '80%'}}
        onPress={()=>{logout()}}
      />
      <CustomButton
      title={"GET DETAILS"}
      style={{marginTop: 12, width: '80%'}}
      onPress={()=>{getData()}}
    />
    </View>
  )
}
export default HomeScreen;