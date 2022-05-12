import { View, Image } from 'react-native'
import React, { useState } from 'react'
import { FullLogo } from '../assets/images/index'
import CustomInputField from '../components/CustomInputField'
import CustomButton from '../components/CustomButton'
import auth from '@react-native-firebase/auth'
import GetSocial from 'getsocial-react-native-sdk/GetSocial'
import UserUpdate from 'getsocial-react-native-sdk/models/UserUpdate'

const OnboardScreen = ({navigation}) => {

  const [name, setName] = useState()
  const uid = auth().currentUser.uid

  const saveData = () => {
    GetSocial.getCurrentUser().then((currentUser)=>{
      var batchUpdate = new UserUpdate();
      batchUpdate.displayName = name;
      batchUpdate.avatarUrl = currentUser.avatarUrl;
      batchUpdate.publicProperties = currentUser.publicProperties;
      batchUpdate.privateProperties = currentUser.privateProperties;
      currentUser.updateDetails(batchUpdate).then(()=>{
        navigation.navigate('HomeScreen');
      });
    })
  }

  return (
    <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
      <Image
        style={{width: '30%', height: '15%', backgroundColor: '#FFFFFF'}}
        source={FullLogo}
      />
      <CustomInputField
        top={20}
        placeholder={'Name'}
        onchange={(text) => setName(text)}
      />
      <CustomButton 
        style={{width: '55%', marginTop: 20}}
        title={'SAVE'}
        onPress={()=>{saveData()}}
      />
    </View>
  )
}

export default OnboardScreen;