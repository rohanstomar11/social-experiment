import { View, Text } from 'react-native'
import React from 'react'
import CustomButton from '../components/CustomButton';
import auth from '@react-native-firebase/auth'

const HomeScreen = ({navigation}) => {

  const logout = () => {
    auth()
    .signOut()
    .then(()=>{navigation.replace('LoginScreen')})
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
    </View>
  )
}
export default HomeScreen;