import {
    View,
    Text,
    TouchableOpacity,
    Platform,
    StyleSheet,
} from 'react-native';
import React, {useState} from 'react';
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';
import CustomInputField from '../components/CustomInputField';
import CustomButton from '../components/CustomButton';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ActivityContent from 'getsocial-react-native-sdk/models/communities/ActivityContent';
import Action from 'getsocial-react-native-sdk/models/actions/Action';
import ActivityButton from 'getsocial-react-native-sdk/models/communities/ActivityButton';
import PostActivityTarget from 'getsocial-react-native-sdk/models/communities/PostActivityTarget';
import Communities from 'getsocial-react-native-sdk/Communities';
import * as ImagePicker from 'react-native-image-picker';
import MediaAttachment from 'getsocial-react-native-sdk/models/MediaAttachment';
import storage from '@react-native-firebase/storage';
import { COLORS } from '../assets/color';

const PostScreen = ({route, navigation}) => {

    const {id} = route.params;

    const [text, setText] = useState('');

    const [custom, setCustom] =useState(false);
    const change = () => {
        custom===false ? setCustom(true) : setCustom(false);
    }
    
    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');
    const [imageUrl, setImageUrl] = useState('');


    const [filePath, setFilePath] = useState();
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
      let reference = storage().ref('/Posts/'+name);
      let task = reference.putFile(path);
      task.then(() => {
        console.log('Image uploaded to the bucket!');
        reference.getDownloadURL().then((url)=>{
          console.log("Received!")
          setImageUrl(url);
        },(error)=>{
            console.error(error);
        })
      }).catch((e) => {
          console.log('uploading image error => ', e);
      });
    }

    const postData = () => {
        console.log("posting data...");
        const action = Action.create('open_url', {'$url': url});
        const button = ActivityButton.create(title, action);

        const activityContent = new ActivityContent();
        activityContent.text = text;
        activityContent.button = button;
        if(imageUrl){
            activityContent.attachments.push(MediaAttachment.withImageUrl(imageUrl));
        }

        const target = PostActivityTarget.group(id);
        Communities.postActivity(activityContent, target).then((result)=>{
            console.log("Activity successfully Posted!");
            navigation.goBack();
        }, (error)=>{
            console.log(error);
        })
    }

    return (
        <KeyboardAvoidingWrapper>
            <View style={{
                width:'100%',
                alignItems:'center',
            }}>
            <View
                style={{
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}>
                <TouchableOpacity
                    onPress={()=>{navigation.goBack()}}
                    activeOpacity={0.6}
                    style={styles.headerButton}>
                    <AntDesign
                        name='arrowleft'
                        color={COLORS.primary}
                        size={30}
                    />
                </TouchableOpacity>
                <Text
                    style={{
                        color: COLORS.text,
                        fontWeight: '900',
                        fontSize: 30,
                    }}>
                    Add Post
                </Text>
                <CustomButton
                    style={{
                        height:39,
                        width:80,
                        marginRight: 10,
                    }}
                    title={"POST"} 
                    fontsize={12}
                    onPress={()=>{postData()}}
                    />
            </View>
            <CustomInputField
                top={20}
                multiline={true}
                iconType={'form'}
                onchange={(text)=>{setText(text)}}
                placeholder={"Enter Post Text"}
                />
            <CustomButton
                style={{
                    width:'60%',
                    marginTop: 20,
                }}
                title={"Add Custom Button"}
                onPress={()=>{change()}}
                />
            {custom===true && (
                <View>
                    <CustomInputField
                        placeholder={"Button Title"}
                        top={20} 
                        iconType={'infocirlceo'}
                        onchange={(text)=>{setTitle(text)}}
                        />
                    <CustomInputField
                        placeholder={"Url Linked"}
                        top={20} 
                        iconType={'link'}
                        onchange={(text)=>{setUrl(text)}}
                        />
                </View>
            )}
            <CustomButton
                style={{
                    width:'60%',
                    marginTop: 20,
                }}
                title={"Add Media"}
                onPress={()=>{addImage()}}
            />
            </View>
        </KeyboardAvoidingWrapper>
    );
};

const styles = StyleSheet.create({
    headerButton: {
        marginLeft: 20,
        alignSelf:'center',
        borderRadius: 20,
        padding: 5,
        backgroundColor: COLORS.cardBg,
        ...Platform.select({
            android: {
              elevation: 24,
              shadowColor: COLORS.shadowColor,
            },
            ios: {
              shadowRadius: 24,
              shadowOpacity: 1,
              shadowColor: COLORS.shadowColor,
              shadowOffset: { width: 0, height: 16 },
            }
          })
    },
});

export default PostScreen;