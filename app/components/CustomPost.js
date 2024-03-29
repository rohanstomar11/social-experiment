import {
    View,
    Image,
    Text,
    Linking,
    TouchableOpacity,
    StyleSheet,
    Platform,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import CustomButton from '../components/CustomButton';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Communities from 'getsocial-react-native-sdk/Communities';
import InviteContent from 'getsocial-react-native-sdk/models/invites/InviteContent';
import Invites from 'getsocial-react-native-sdk/Invites';
import {COLORS} from '../assets/color';
import {FONTS} from '../assets/fontFamily';
import MyAppText from '../components/MyAppText';
import moment from 'moment';

const CustomPost = ({navigation, data, showComments}) => {

    const postDate = moment(new Date(data.createdAt*1000)).fromNow();

    const url = data.button!==''? data.button.action.data.$url : null;

    const [likes, setLikes] = useState(data.reactionsCount.like || 0);
    const [liked, setLiked] = useState(data.myReactions[0]==="like"?true:false);

    const likePost = () => {
        Communities.setReaction('like', data.id).then((result)=>{
            setLiked(true);
            setLikes(likes+1);
        }, (error)=>{
            console.error(error);
        });
    };
     
    const unlikePost = () => {
        Communities.removeReaction('like', data.id).then((result)=>{
            setLiked(false);
            setLikes(likes-1);
        },(error)=>{
            console.error(error);
        });
    };

    const [comments, setComments] = useState(data.commentsCount);

    const [imageUrl, setImageUrl] = useState();
    useEffect(()=>{
        try{
            setImageUrl(JSON.parse(JSON.stringify(data.mediaAttachments[0])).imageUrl);
        } catch {
            setImageUrl(false);
        }
    },[]);
    
    const sharePost = () => {
        let inviteContent = new InviteContent();
        inviteContent.text = data.text+" Invite Link: [APP_INVITE_URL]";
        inviteContent.mediaAttachment = data.mediaAttachments[0];
        inviteContent.linkParams.ACTIVITY_ID = data.id;

        Invites.send(
            inviteContent,
            'nativeshare',
            () => console.log("Send"),
            () => console.log("Cancel"),
            (error) => console.error(error)
        );
    };
    
  return (
    <View
        style={styles.container}>
        <View
            style={styles.profileContainer}>
            <Image
                source={{
                    uri: data.author.avatarUrl
                }}
                style={styles.profileImage}/>
            <View
                style={{
                    width: '100%',
                    marginLeft: 10,
                    justifyContent: 'center',
                }}>
                <MyAppText
                    family={FONTS.SemiBold}
                    textColor={COLORS.text}>
                    {data.author.displayName}
                </MyAppText>
                <View
                    style={{
                        marginTop: -6,
                    }}>
                    <MyAppText
                        textSize={12}
                        family={FONTS.Light}
                        textColor={COLORS.grey}>
                        {postDate}
                    </MyAppText>
                </View>
            </View>
        </View>
        <View
            style={{
                paddingVertical: 10,
                marginLeft: 60,
            }}>
            <Text
                style={{
                    color: COLORS.black,
                    fontSize: 16,
                    fontFamily: FONTS.Regular,
                }}>
                {data.text}
            </Text>
        </View>
        {imageUrl && (
            <View
                style={{ 
                    paddingBottom: 10,
                    marginLeft: 60,
                }}>
                <Image
                source={{uri: imageUrl}}
                style={styles.postImage} 
                resizeMode={'stretch'}
                />
            </View>
        )}
        {data.button!=='' &&
            data.button.action.data.$url!==''&&
                <CustomButton 
                    style={{
                        marginVertical: 20,
                    }}
                    title={data.button.title}
                    onPress={()=>{Linking.openURL(url)}}
        />}
        <View
            style={{
                width: '100%',
                borderBottomWidth: 1,
                borderColor: COLORS.line
            }}>    
        </View>
        <View
            style={styles.reactionContainer}>
            <View
                style={{
                    flexDirection:'row',
                }}>
                <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={()=>{liked===true? unlikePost() : likePost()
                }}>
                    <AntDesign
                        name={liked===true?'heart':'hearto'}
                        color={liked === true ? COLORS.gradRed2 : COLORS.black}
                        size={20}
                    />
                </TouchableOpacity>
                <Text
                    style={{
                        marginHorizontal:5, 
                        color: COLORS.text,
                        fontFamily: FONTS.Regular,
                        fontSize: 15
                    }}>
                    {likes} Likes
                </Text>
            </View>
            {showComments &&
                <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={()=>{navigation.navigate('CommentScreen', {data: data})}}
                    style={{
                        flexDirection:'row',
                    }}>
                    <FontAwesome
                        name='comment-o'
                        color={COLORS.black}
                        size={20} 
                    />
                    <Text
                        style={{
                            marginHorizontal:5,
                            color: COLORS.text,
                            fontFamily: FONTS.Regular,
                            fontSize: 15
                        }}>
                        {comments} Comments
                    </Text>
                </TouchableOpacity>}
            <TouchableOpacity
                activeOpacity={0.6}
                onPress={()=>{sharePost()}}>
                <AntDesign
                    name='sharealt'
                    color={COLORS.black}
                    size={20}
                />
                {/* <Text
                    style={{
                        marginHorizontal:5,
                        color: COLORS.primary,
                    }}>
                    Share
                </Text> */}
            </TouchableOpacity>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingHorizontal:'5%', 
        paddingVertical: '4%',
        backgroundColor: COLORS.white,
        borderBottomWidth:1,
        borderBottomColor: COLORS.grey,
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
    profileContainer: {
        flexDirection: 'row', 
        width: '100%', 
    },
    profileImage: {
        height: 50,
        width: 50,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: COLORS.grey,
    },
    postImage: {
        marginVertical: 10,
        height: 300,
        width: '100%',
        borderRadius: 10,
    },
    reactionContainer: {
        flexDirection: 'row',
        justifyContent:'space-around',
        marginTop: 20,
    },
});

export default CustomPost;