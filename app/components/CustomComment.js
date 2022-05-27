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
                        fontWeight: '700',
                        color: COLORS.text,
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
        <Text
            style={{
                color: COLORS.text,
                margin: 12
            }}>
            {data.text}
        </Text>
        <View
            style={{ 
                flexDirection:'row',
                alignItems: 'flex-end',
                marginLeft: 10
            }}>
            <TouchableOpacity
                activeOpacity={0.6}
                onPress={()=>{liked===true? unlikePost() : likePost()
            }}>
                <AntDesign
                    name={liked===true?'like1':'like2'}
                    color={COLORS.primary}
                    size={20}
                />
            </TouchableOpacity>
            <Text
                style={{
                    marginHorizontal:5, 
                    color: COLORS.primary
                }}>
                {likes} Likes
            </Text>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        width:'90%',
        alignItems:'flex-start',
        backgroundColor:COLORS.cardBg,
        borderWidth: 1,
        borderRadius:12,
        padding: 6,
    },
    profileContainer: {
        flexDirection: 'row', 
        width: '100%', 
        borderWidth: 1, 
        paddingBottom:8, 
        backgroundColor: COLORS.background, 
        borderRadius: 12
    },
    image: {
        marginTop:8,
        marginLeft: 8,
        height: 50,
        width: 50,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: COLORS.grey,
    },
});

export default CustomComment;