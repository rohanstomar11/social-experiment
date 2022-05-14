import { View, Text, Image, TouchableOpacity} from 'react-native'
import React, {useState, useEffect} from 'react'
import CustomButton from '../components/CustomButton';
import auth from '@react-native-firebase/auth'
import GetSocial from 'getsocial-react-native-sdk/GetSocial'
import storage from '@react-native-firebase/storage';

const HomeScreen = ({navigation}) => {

  const [name, setName] = useState('User');
  const [imageUrl, setImageUrl] = useState();
  const uid = auth().currentUser.uid;

  useEffect(()=>{
    GetSocial.getCurrentUser().then((currentUser)=>{
      setName(currentUser.displayName);
      storage().ref(uid).getDownloadURL().then((url)=>{
        setImageUrl(url.toString())
      })
    })
  })

  const logout = () => {
    GetSocial.resetUser().then(()=>{
      auth()
      .signOut()
      .then(()=>{navigation.replace('LoginScreen')})
    })
  }

  const getData = () => {
    GetSocial.getCurrentUser().then((currentUser)=>{
      console.log(currentUser.publicProperties);
    })
  }

  return (
    <View style={{
        flex: 1,
        alignItems: 'center',
    }}>
      <View style={{width: '100%', padding: 20,flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, backgroundColor: '#AAAAAA', borderRadius: 20}}>
        <View style={{justifyContent: 'center'}}>
          <Text style={{
            fontSize: 25,
            color: '#000000',
            fontWeight: '600',
          }}>
            Hola, {name}!
          </Text>
        </View>
        <TouchableOpacity style={{width: 48, height: 48, borderRadius: 24}} activeOpacity={0.6} onPress={()=>{console.log("Enter Profile Page!")}}>
          <Image
            style={{flex:1, borderRadius: 24, backgroundColor: '#000000'}}
            source={{
              uri: imageUrl
            }}
          />
        </TouchableOpacity>
      </View>
      <View style={{width: '100%', height: '100%', justifyContent: 'center', alignItems:'center'}}>
        <CustomButton
          title={"LOGOUT"}
          style={{width: '80%'}}
          onPress={()=>{logout()}}
        />
        <CustomButton
        title={"GET DETAILS"}
        style={{marginTop: 12, width: '80%'}}
        onPress={()=>{getData()}}
      />
      </View>
    </View>
  )
}
export default HomeScreen;