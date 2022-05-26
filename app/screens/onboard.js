import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Platform,
  StyleSheet,
} from 'react-native';
import React, {useState} from 'react';
import CustomInputField from '../components/CustomInputField';
import CustomButton from '../components/CustomButton';
import auth from '@react-native-firebase/auth';
import GetSocial from 'getsocial-react-native-sdk/GetSocial';
import UserUpdate from 'getsocial-react-native-sdk/models/UserUpdate';
import * as ImagePicker from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {COLORS} from '../assets/color';
import RadioForm from 'react-native-simple-radio-button';

const OnboardScreen = ({ navigation }) => {

  const [name, setName] = useState();
  const [bio, setBio] = useState();
  const [number, setNumber] = useState();
  const [uniqueID, setUniqueID] = useState();
  const [filePath, setFilePath] = useState();
  const [graduation, setGraduation] = useState('UG');
  const [year, setYear] = useState('FE');
  const [branch, setBranch] = useState();
  const uid = auth().currentUser.uid
  const [avatarUrl, setAvatarUrl] = useState('');

  const publicProperties = {
    'college': 'DYPSOET',
    'mobile number': number,
    'graduation': graduation,
    'year': year,
    'branch': branch,
    'bio': bio,
  };
  const privateProperties = {
    'admin': 'false',
    'Unique ID': uniqueID,
  };
  const graduationOptions = [
    {
      label: 'UG',
      value: 'UG',
    },
    {
      label: 'PG',
      value: 'PG',
    },
  ];
  const ugYearOptions = [
    {
      label: 'FE',
      value: 'FE',
    },
    {
      label: 'SE',
      value: 'SE',
    },
    {
      label: 'TE',
      value: 'TE',
    },
    {
      label: 'BE',
      value: 'BE',
    },
  ];
  const pgYearOptions = [
    {
      label: 'FE',
      value: 'FE',
    },
    {
      label: 'SE',
      value: 'SE',
    },
  ];

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
      },(error)=>{
        console.error(error);
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

  const saveData = () => {
    GetSocial.getCurrentUser().then((currentUser) => {
      var batchUpdate = new UserUpdate();
      batchUpdate.displayName = name;
      batchUpdate.avatarUrl = avatarUrl;
      batchUpdate.publicProperties = publicProperties;
      batchUpdate.privateProperties = privateProperties;
      currentUser.updateDetails(batchUpdate).then(() => {
        navigation.replace('TabScreen');
      },(error)=>{
        console.error(error);
      });
    },(error)=>{
      console.error(error);
    })
  }

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1
      }}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          paddingVertical: '10%',
        }}>
        <TouchableOpacity
          style={styles.imageButton}
          activeOpacity={0.6}
          onPress={() => {selectImage()}}
          >
          {filePath
            ?
            <Image
              style={styles.image}
              source={{uri: filePath}}
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
            style={styles.cameraIcon}
          />
        </TouchableOpacity>
        <CustomInputField
          top={20}
          placeholder={'Name'}
          onchange={(text) => setName(text)}
        />
        <CustomInputField
          iconType={'form'}
          top={20}
          placeholder={'Bio'}
          onchange={(text) => setBio(text)}
          multiline={true}
        />
        <CustomInputField
          iconType={'mobile1'}
          placeholder={"Mobile Number"}
          top={20}
          maxLength={10}
          keyboard={'numeric'}
          onchange={(text) => setNumber(text)}
        />
        <CustomInputField
          iconType={'idcard'}
          placeholder={"Unique ID"}
          top={20}
          autoCapitalize={'characters'}
          maxLength={10}
          onchange={(text) => setUniqueID(text)}
        />
        <View style={{
          marginTop: 20,
          alignSelf: 'flex-start',
          paddingHorizontal: 25,
        }}>
          <Text style={{
            fontSize: 20,
            fontWeight: '500',
            color: COLORS.black,
          }}>
            Select your graduation?
          </Text>
          <RadioForm
            style={{
              marginTop: 10,
              width: '100%',
              justifyContent: 'space-around',
            }}
            buttonColor={COLORS.link}
            formHorizontal={true}
            radio_props={graduationOptions}
            initial={0} //initial value of this group
            onPress={(value) => setGraduation(value)} //if the user changes options, set the new value
          />
        </View>
        {graduation === 'UG'
          ?
          <View style={{
            marginTop: 20,
            alignSelf: 'flex-start',
            paddingHorizontal: 25,
          }}>
            <Text style={{
              fontSize: 20,
              fontWeight: '500',
              color: COLORS.black,
            }}>
              Select Year?
            </Text>
            <RadioForm
              style={{
                marginTop: 10,
                width: '100%',
                justifyContent: 'space-around',
              }}
              buttonColor={COLORS.link}
              formHorizontal={true}
              radio_props={ugYearOptions}
              initial={0} //initial value of this group
              onPress={(value) => setYear(value)} //if the user changes options, set the new value
            />
          </View>
          :
          <View style={{
            marginTop: 20,
            alignSelf: 'flex-start',
            paddingHorizontal: 25,
          }}>
            <Text style={{
              fontSize: 20,
              fontWeight: '500',
              color: COLORS.black,
            }}>
              Select Year?
            </Text>
            <RadioForm
              style={{
                marginTop: 10,
                width: '100%',
                justifyContent: 'space-around',
              }}
              buttonColor={COLORS.link}
              formHorizontal={true}
              radio_props={pgYearOptions}
              initial={0} //initial value of this group
              onPress={(value) => setYear(value)} //if the user changes options, set the new value
            />
          </View>
        }
        <CustomInputField
          iconType={'idcard'}
          placeholder={"Ex: CSE, ME, CE"}
          top={20}
          autoCapitalize={'characters'}
          onchange={(text) => setBranch(text)}
          />
        <CustomButton
          style={{
            width: '90%',
            marginTop: 20,
          }}
          fontsize={20}
          title={'SAVE'}
          onPress={() => saveData()}
          />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  imageButton: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    flex: 1,
    borderRadius: 50,
    width: 100,
    height: 100,
    borderWidth: 2,
    borderColor: COLORS.black,
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 2,
  },
});

export default OnboardScreen;