import {
  Text,
  ScrollView,
  Platform,
  StyleSheet,
} from 'react-native';
import React, {useState} from 'react';
import CustomInputField from  '../components/CustomInputField';
import CustomButton from '../components/CustomButton';
import * as ImagePicker from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import GroupContent from 'getsocial-react-native-sdk/models/communities/GroupContent';
import MediaAttachment from 'getsocial-react-native-sdk/models/MediaAttachment';
import CommunitiesAction from 'getsocial-react-native-sdk/models/communities/CommunitiesAction';
import Role from 'getsocial-react-native-sdk/models/communities/Role';
import Communities from 'getsocial-react-native-sdk/Communities';
import {CONFIG} from '../utility/config';
import {StreamChat} from 'stream-chat';
import {COLORS} from '../assets/color';
import AppSpinner from '../components/ActivityIndicator';

const client = StreamChat.getInstance(CONFIG.getStreamApiKey);

const CreateGroupScreen = ({navigation, route}) => {

  const [isLoading, setIsLoading] = useState(false);

  const {userId} = route.params;
  const current = Math.round(new Date().getTime() / 1000);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const [imageUrl, setImageUrl] = useState('');
  const [filePath, setFilePath] = useState();
  const [indicator, setIndicator] = useState(false);

  const addImage = () => {
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
          const path = res.assets[0].uri.toString()
          uploadImageToStorage(path, getFileName(res.assets[0].fileName));
          setFilePath(path)
      }
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

  const uploadImageToStorage = (path, name) => {
    let reference = storage().ref('/Groups/'+userId+current);
    let task = reference.putFile(path);
    task.then(() => {
      console.log('Image uploaded to the bucket!');
      reference.getDownloadURL().then((url)=>{
        console.log("Received!")
        setImageUrl(url);
        setIndicator(true);
      },(error)=>{
        console.error(error);
      })
    }).catch((e) => {
        console.log('uploading image error => ', e);
    });
  }

  const createGroup = () => {
    setIsLoading(true);
    const groupContent = new GroupContent();
    groupContent.id=userId+current;
    groupContent.title=title;
    groupContent.description= description;  
    groupContent.avatar = MediaAttachment.withImageUrl(imageUrl);
    groupContent.permissions[CommunitiesAction.Post] = Role.Member;
    groupContent.permissions[CommunitiesAction.React] = Role.Member;
    groupContent.isDiscoverable=true;
    groupContent.isPrivate=false;

    const createChat= async ()=>{
      const channel = client.channel('team', userId+current, {
        name: title,
        members: [userId]
      });
      await channel.create();
      console.log("Success");
    }

    Communities.createGroup(groupContent).then((group)=>{
      console.log("Group Created");
      createChat().then(()=>{
        setIsLoading(false);
        navigation.goBack();
      },(error)=>{
        setIsLoading(false);
        console.error(error)
      });
    }, (error)=>{
      setIsLoading(false);
      console.error(error)
    })
  }

  return (
    <ScrollView
      contentContainerStyle={{
        width: '100%',
        alignItems: 'center',
      }}>
      <Text
        style={styles.headerText}>
        Create Group
      </Text>
      <CustomInputField 
        placeholder={"Title of the Group"}
        onchange={(text)=>{setTitle(text)}} 
        top={20}
        iconType={'addusergroup'}
      />
      <CustomInputField 
        placeholder={"Description"}
        onchange={(text)=>{setDescription(text)}} 
        top={20}
        multiline={true}
        iconType={'infocirlceo'} 
      />
      <CustomButton
        style={{
          width: '80%',
          marginTop: 20,
        }}
        title={"Upload"}
        onPress={()=>{addImage()}}
      />
      {indicator &&
        <Text
          style={{
            color: COLORS.green,
            fontSize: 13
          }}>
          Image Upload Successful!
        </Text>
      }
      <CustomButton
        style={{
          width: '80%',
          marginTop: 20,
        }}
        title={"Create"}
        onPress={()=>{createGroup()}}
      />
      {isLoading && (
        <AppSpinner bgColor="transparent" color={COLORS.primary} />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  headerText: {
    fontSize: 25,
    color: COLORS.primary,
    fontWeight: '700',
    marginTop: 10,
  },
});

export default CreateGroupScreen;