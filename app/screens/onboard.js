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

   // Taking Care of the error data
  const [nameError, setNameError] = useState();
  const [bioError, setBioError] = useState();
  const [numberError, setNumberError] = useState();
  const [uniqueIDError, setUniqueIDError] = useState();
  const [branchError, setBranchError] = useState();


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


  const validate = () => {
    if (
      (!name || name === '' || name.length === 0) &&
      (!bio || bio === '' || bio.length === 0) &&
      (!number || number === '' || number.length === 0) &&
      (!uniqueID || uniqueID === '' || uniqueID.length === 0) &&
      (!branch || branch === '' || branch.length === 0)

    ) {
      setNameError('Please fill in the required field');
      setBioError('Please fill in the required field');
      setNumberError('Please fill in the required field');
      setUniqueIDError('Please fill in the required field');
      setBranchError('Please fill in the required field');
      return;
    }

    if (!name || name === '' || name.length === 0) {
      setNameError('Please fill in the required field');
      return;
    }

    if (!bio || bio === '' || bio.length === 0) {
      setBioError('Please fill in the required field');
      return;
    }

    if (!number || number === '' || number.length === 0) {
      setNameError('Please fill in the required field');
      return;
    }

    if (!uniqueID || uniqueID === '' || uniqueID.length === 0) {
      setUniqueIDError('Please fill in the required field');
      return;
    }

    if (!branch || branch === '' || branch.length === 0) {
      setBranchError('Please fill in the required field');
      return;
    }

    saveData();
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
              color={COLORS.grey}
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
          header={'Full Name'}
          placeholder={'Name'}
          onchange={(text) => setName(text)}
          errorText={nameError}
        />
        <CustomInputField
          header={'Bio'}
          iconType={'form'}
          placeholder={'Bio'}
          onchange={(text) => setBio(text)}
          multiline={true}
          errorText={bioError}
        />
        <CustomInputField
          iconType={'mobile1'}
          placeholder={"Mobile Number"}
          header={'Mobile Number'}
          maxLength={10}
          keyboard={'numeric'}
          onchange={(text) => setNumber(text)}
          errorText={numberError}
        />
        <CustomInputField
          iconType={'idcard'}
          placeholder={"Unique ID"}
          header={"Unique ID"}
          autoCapitalize={'characters'}
          maxLength={10}
          onchange={(text) => setUniqueID(text)}
          noBottomMargin={true}
          errorText={uniqueIDError}
        />
        <View style={{
          marginTop: 20,
          alignSelf: 'flex-start',
          paddingHorizontal: 25,
        }}>
          <Text style={{
            fontSize: 20,
            fontWeight: '500',
            color: COLORS.text,
          }}>
            Select your graduation?
          </Text>
          <RadioForm
            style={{
              marginTop: 10,
              width: '100%',
              justifyContent: 'space-around',
            }}
            buttonColor={COLORS.primary}
            formHorizontal={true}
            radio_props={graduationOptions}
            initial={0} //initial value of this group
            onPress={(value) => setGraduation(value)} //if the user changes options, set the new value
          />
        </View>
          <View
            style={{
              marginTop: 20,
              alignSelf: 'flex-start',
              paddingHorizontal: 25,
              marginBottom: 15
            }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: '500',
                color: COLORS.text,
              }}>
              Select Year?
            </Text>
        {graduation === 'UG'
          ?
            <RadioForm
              style={{
                marginTop: 10,
                width: '100%',
                justifyContent: 'space-around',
              }}
              buttonColor={COLORS.primary}
              formHorizontal={true}
              radio_props={ugYearOptions}
              initial={0} //initial value of this group
              onPress={(value) => setYear(value)} //if the user changes options, set the new value
            />
          // </View>
          :
          // <View style={{
          //   marginTop: 20,
          //   alignSelf: 'flex-start',
          //   paddingHorizontal: 25,
          // }}>
          //   <Text style={{
          //     fontSize: 20,
          //     fontWeight: '500',
          //     color: COLORS.text,
          //   }}>
          //     Select Year?
          //   </Text>
            <RadioForm
              style={{
                marginTop: 10,
                width: '100%',
                justifyContent: 'space-around',
              }}
              buttonColor={COLORS.primary}
              formHorizontal={true}
              radio_props={pgYearOptions}
              initial={0} //initial value of this group
              onPress={(value) => setYear(value)} //if the user changes options, set the new value
            />
          }
          </View>
        <CustomInputField
          iconType={'USB'}
          placeholder={"Ex: CSE, ME, CE"}
          header={'Branch'}
          autoCapitalize={'characters'}
          onchange={(text) => setBranch(text)}
          errorText={branchError}
          />
        <CustomButton
          style={{
            width: '90%',
            marginTop: 20,
          }}
          fontsize={20}
          title={'SAVE'}
          onPress={() => validate()}
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
    borderColor: COLORS.primary,
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: COLORS.background,
    borderRadius: 20,
    padding: 2,
  },
});

export default OnboardScreen;