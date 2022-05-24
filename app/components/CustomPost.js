import { View, Image, Text, Linking, TouchableOpacity} from 'react-native'
import React, {useState, useEffect} from 'react'
import CustomButton from '../components/CustomButton'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Communities from 'getsocial-react-native-sdk/Communities'
import InviteContent from 'getsocial-react-native-sdk/models/invites/InviteContent'
import Invites from 'getsocial-react-native-sdk/Invites'

const CustomPost = ({navigation, data, showComments}) => {

    const created = new Date(data.createdAt*1000)
    const date = created.getDate();
    const month = created.getMonth();
    const year = created.getFullYear();
    const hours = created.getHours();
    const mins = created.getMinutes();
    const url = data.button!==''? data.button.action.data.$url : null;

    const [likes, setLikes] = useState(data.reactionsCount.like || 0);
    const [liked, setLiked] = useState(data.myReactions[0]==="like"?true:false);

    const likePost = () => {
        Communities.setReaction('like', data.id).then((result)=>{
            setLiked(true);
            setLikes(likes+1);
        }, (error)=>{
            console.error(error);
        })
    }
     
    const unlikePost = () => {
        Communities.removeReaction('like', data.id).then((result)=>{
            setLiked(false);
            setLikes(likes-1);
        },(error)=>{
            console.error(error);
        })
    }

    const [comments, setComments] = useState(data.commentsCount);


    const [imageUrl, setImageUrl] = useState();
    useEffect(()=>{
        try{
            setImageUrl(JSON.parse(JSON.stringify(data.mediaAttachments[0])).imageUrl);
        } catch {
            setImageUrl(false)
        }
    },[])
    
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
    }
    
  return (
    <View
        style={{
            width: '90%', 
            marginHorizontal:'5%', 
            borderRadius: 12, 
            elevation: 4, 
            backgroundColor: '#F0FEFE', 
            padding: 12, 
            borderWidth:1,
            marginBottom: 10,
        }}>
        <View
            style={{
                flexDirection: 'row', 
                width: '100%', 
                borderWidth: 1, 
                paddingBottom:8, 
                backgroundColor: '#FFFFFF', 
                borderRadius: 12}}>
            <Image
                source={{
                    uri: data.author.avatarUrl
                }}
                style={{
                    marginTop:8,
                    marginLeft: 8,
                    height: 50,
                    width: 50,
                    borderRadius: 25,
                    borderWidth: 1,
                    borderColor: '#354354'
                }}/>
            <View
                style={{
                    width: '100%',
                    marginLeft: 10,
                    justifyContent: 'center'
                }}>
                <Text
                    style={{
                        fontSize:20,
                        fontWeight: '700',
                        color: '#354354'
                    }}>
                    {data.author.displayName}
                </Text>
                <Text
                    style={{
                        fontSize: 14
                    }}>
                    {date}-{month}-{year} {hours}:{mins}
                </Text>
            </View>
        </View>
        <View
            style={{
                marginTop:5,
                alignItems: 'center'
            }}>
            <Text
                style={{
                    color:'#354354',
                    fontSize: 16,
                }}>
                {data.text}
            </Text>
        </View>
        {imageUrl && (
            <View
                style={{
                    width:'100%', 
                    alignItems: 'center'
                }}>
                <Image
                source={{
                    uri: imageUrl
                    }}
                style={{
                    marginVertical: 10,
                    height: 250,
                    width: '80%',
                    borderRadius: 10,
                }} />
            </View>
        )}
        {data.button!=='' &&
            data.button.action.data.$url!==''&&
                <CustomButton 
                    style={{
                        marginTop: 20
                    }}
                    title={data.button.title}
                    onPress={()=>{Linking.openURL(url)}}
        />}
        <View
            style={{
                flexDirection: 'row',
                justifyContent:'space-between',
                marginTop: 20,
                marginLeft: 10
            }}>
            <View
                style={{
                    flexDirection:'row',
                    alignItems: 'flex-end'
                }}>
                <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={()=>{liked===true? unlikePost() : likePost()
                }}>
                    <AntDesign
                        name={liked===true?'like1':'like2'}
                        color={'#3036D6'}
                        size={20}
                    />
                </TouchableOpacity>
                <Text
                    style={{
                        marginHorizontal:5, 
                        color: '#3036D6'
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
                        alignItems: 'flex-end'
                    }}>
                    <AntDesign
                        name='aliwangwang-o1'
                        color={'#3036D6'}
                        size={20}
                        style={{}} 
                    />
                    <Text
                        style={{
                            marginHorizontal:5,
                            color: '#3036D6'
                        }}>
                        {comments} Comments
                    </Text>
                </TouchableOpacity>}
            <TouchableOpacity
                activeOpacity={0.6}
                onPress={()=>{sharePost()}}
                style={{
                    flexDirection:'row',
                    alignItems: 'flex-end'
                }}>
                <AntDesign
                    name='sharealt'
                    color={'#3036D6'}
                    size={20}
                    style={{}} 
                />
                <Text
                    style={{
                        marginHorizontal:5,
                        color: '#3036D6'
                    }}>
                    Share
                </Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}

export default CustomPost