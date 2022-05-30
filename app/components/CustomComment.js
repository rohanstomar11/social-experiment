import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import React, {useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Communities from 'getsocial-react-native-sdk/Communities';
import {COLORS} from '../assets/color';
import {FONTS} from '../assets/fontFamily';

const CustomComment = ({data}) => {
    
    const created = new Date(data.createdAt*1000);
    const date = created.getDate();
    const month = created.getMonth();
    const year = created.getFullYear();
    const hours = created.getHours();
    const mins = created.getMinutes();

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
    
  return (
    <View
        style={styles.container}>
        <View
            style={styles.profileContainer}>
            <Image
                source={{
                    uri: data.author.avatarUrl
                }}
                style={styles.image}/>
            <View
                style={{
                    width: '100%',
                    marginLeft: 10,
                    justifyContent: 'center'
                }}>
                <Text
                    style={{
                        fontSize:20,
                        fontWeight: '500',
                        color: COLORS.text,
                        fontFamily: FONTS.SemiBold,
                    }}>
                    {data.author.displayName}
                </Text>
                <Text
                    style={{
                        fontSize: 14,
                        marginTop: -6,
                        fontFamily: FONTS.Regular,
                    }}>
                    {date}-{month}-{year} {hours}:{mins}
                </Text>
            </View>
        </View>
        <View
            style={{
                paddingVertical: 10,
                marginLeft: 70,
            }}>
            <Text
                style={{
                    color: COLORS.text,
                    fontSize: 16,
                }}>
                {data.text}
            </Text>
        </View>
        <View style={{width: '100%', borderBottomWidth: 1, borderColor: '#ddd'}} ></View>
        <View
            style={{ 
                flexDirection:'row',
                justifyContent: 'center',
                marginTop: 15
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
                }}>
                {likes} Likes
            </Text>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        width:'100%',
        paddingTop: '5%',
        paddingBottom: '3%',
        paddingHorizontal: '5%',
        borderBottomWidth: 1,
        borderColor: COLORS.grey
    },
    profileContainer: {
        flexDirection: 'row', 
        width: '100%',
    },
    image: {
        marginLeft: 8,
        height: 50,
        width: 50,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: COLORS.grey,
    },
});

export default CustomComment;