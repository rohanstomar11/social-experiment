import { View, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import CustomInputField from '../components/CustomInputField'
import CustomButton from '../components/CustomButton'
import auth from '@react-native-firebase/auth'
import GetSocial from 'getsocial-react-native-sdk/GetSocial'
import UserUpdate from 'getsocial-react-native-sdk/models/UserUpdate'
import * as ImagePicker from 'react-native-image-picker'
import FullLogo from '../assets/images/index'
import storage from '@react-native-firebase/storage'

const OnboardScreen = ({navigation}) => {

  const [name, setName] = useState();
  const [filePath,setFilePath] = useState(FullLogo);
  const publicProperties = {'college': 'DYPSOET'};
  const uid = auth().currentUser.uid
  const url = 'gs://social-experiment-8221b.appspot.com'+'/'+uid; //change this method of being hardcoded to gather user avatar url dynamically

  const selectImage = () => {
    const options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchImageLibrary(options, res => {
      console.log('Response = ', res);
      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else if (res.error) {
        console.log('ImagePicker Error: ', res.error);
      } else {
        let path = res.assets[0].uri
        setFilePath(path)
        let fileName = getFileName(uid);
        uploadImageToStorage(path, fileName);
      }
    });
  }

  const uploadImageToStorage = (path, name) => {
    let reference = storage().ref(name);
    let task = reference.putFile(path);
    task.then(async () => {
      console.log('Image uploaded to the bucket!');
    }).catch((e) => {
        console.log('uploading image error => ', e);
    });

  }

  const getFileName = (name, path) => {
    if (name != null) {
      return name;
    }
    if (Platform.OS === "ios") {
        path = "~" + path.substring(path.indexOf("/Documents"));
    }
    return path.split("/").pop();
  }

  const saveData = () => { //fix this later
    GetSocial.getCurrentUser().then((currentUser)=>{
      var batchUpdate = new UserUpdate();
      batchUpdate.displayName = name;
      batchUpdate.avatarUrl = url;
      batchUpdate.publicProperties = publicProperties;
      batchUpdate.privateProperties = currentUser.privateProperties;
      currentUser.updateDetails(batchUpdate).then(()=>{
        navigation.navigate('HomeScreen');
      });
    })
  }

  return (
    <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
      <TouchableOpacity style={{width: 100, height: 100, borderRadius: 50}} activeOpacity={0.6} onPress={()=>{selectImage()}}>
        <Image
          style={{flex:1, borderRadius: 50, backgroundColor: '#000000'}}
          source={{
            uri: filePath
          }}
        />
      </TouchableOpacity>
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