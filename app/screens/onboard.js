import { View, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import CustomInputField from '../components/CustomInputField'
import CustomButton from '../components/CustomButton'
import auth from '@react-native-firebase/auth'
import GetSocial from 'getsocial-react-native-sdk/GetSocial'
import UserUpdate from 'getsocial-react-native-sdk/models/UserUpdate'
import * as ImagePicker from 'react-native-image-picker'
import storage from '@react-native-firebase/storage'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { COLORS } from '../assets/color'

const OnboardScreen = ({ navigation }) => {

  const [name, setName] = useState();
  const [number, setNumber] = useState();
  const [filePath, setFilePath] = useState();
  const publicProperties = { 'college': 'DYPSOET', 'mobile number': number };
  const uid = auth().currentUser.uid
  const [avatarUrl, setAvatarUrl] = useState('');

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
    let reference = storage().ref('/Profile/' + name);
    let task = reference.putFile(path);
    task.then(() => {
      console.log('Image uploaded to the bucket!');
      reference.getDownloadURL().then((url) => {
        console.log("Received!")
        setAvatarUrl(url);
      })
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
    GetSocial.getCurrentUser().then((currentUser) => {
      var batchUpdate = new UserUpdate();
      batchUpdate.displayName = name;
      batchUpdate.avatarUrl = avatarUrl;
      batchUpdate.publicProperties = publicProperties;
      batchUpdate.privateProperties = currentUser.privateProperties;
      currentUser.updateDetails(batchUpdate).then(() => {
        navigation.replace('HomeScreen');
      });
    })
  }

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={{ flex: 1, alignItems: 'center', paddingVertical: '10%' }}>
        <TouchableOpacity style={{ width: 100, height: 100, borderRadius: 50, justifyContent: 'center', alignItems: 'center' }} activeOpacity={0.6} onPress={() => { selectImage() }}>
          {filePath ?
            <Image
              style={{ flex: 1, borderRadius: 50, width: 100, height: 100, borderWidth: 2, borderColor: COLORS.black }}
              source={{
                uri: filePath
              }}
            />
            :
            <FontAwesome
              name='user-circle'
              size={90}
              color={COLORS.lightgrey}
            />
          }
          <MaterialIcons
            name='camera-alt'
            color={COLORS.green}
            size={25}
            style={{ position: 'absolute', bottom: 0, right: 0, backgroundColor: COLORS.white, borderRadius: 20, padding: 2 }}
          />
        </TouchableOpacity>
        <CustomInputField
          top={20}
          placeholder={'Name'}
          onchange={(text) => setName(text)}
        />
        <CustomInputField
          iconType="mobile1"
          placeholder={"Mobile Number"}
          top={20}
          keyboard={'numeric'}
          onchange={(text) => { setNumber(text) }}
        />
        <CustomButton
          style={{ width: '90%', marginTop: 20, }}
          fontsize={20}
          title={'SAVE'}
          onPress={() => { saveData() }}
        />
      </View>
    </ScrollView>
  )
}

export default OnboardScreen;