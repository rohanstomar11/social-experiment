import {
  ScrollView,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  Platform,
  StyleSheet,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import CustomPost from '../components/CustomPost';
import ActivitiesQuery from 'getsocial-react-native-sdk/models/communities/ActivitiesQuery';
import PagingQuery from 'getsocial-react-native-sdk/models/PagingQuery';
import Communities from 'getsocial-react-native-sdk/Communities';
import CustomComment from '../components/CustomComment';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ActivityContent from 'getsocial-react-native-sdk/models/communities/ActivityContent';
import PostActivityTarget from 'getsocial-react-native-sdk/models/communities/PostActivityTarget';
import { COLORS } from '../assets/color';
import { FONTS } from '../assets/fontFamily';

const CommentScreen = ({route, navigation}) => {

  const {data} = route.params;
  
  const [comments, setComments] = useState();
  useEffect(()=>{
    const query = ActivitiesQuery.commentsToActivity(data.id)
    var pagingQuery = new PagingQuery(query);
    Communities.getActivities(pagingQuery).then((result)=>{
      setComments(result.entries);
    }, (error)=>{
      console.error(error);
    })
  },[comments]);

  const [type, setType] = useState('');
  const postComment = () => {
    const activityContent = new ActivityContent();
    activityContent.text = type;

    const target = PostActivityTarget.comment(data.id);

    Communities.postActivity(activityContent, target).then((result)=>{
      alert("Comment Posted");
    }, (error)=>{
      console.log(error);
    })
  };

  return (
    <ScrollView
      overScrollMode='never'
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        width: '100%',
        alignItems: 'center',
        flexGrow: 1,
        paddingBottom: 20
      }}>
      <CustomPost
        data={data}
        showComments={false}
        />
        <Text
            style={{
                fontSize: 20,
                fontFamily: FONTS.SemiBold,
                color: COLORS.black,
                marginTop:12,
                marginLeft: 20,
                alignSelf: 'flex-start'
            }}
            >Comments</Text>
      {comments &&
        comments.map((item, index)=>{
          const length = Object.keys(comments).length;
          return (
            <CustomComment
              data={comments[length-index-1]}
              key={length-index-1}
              />
          );
        })
      }
      <View style={{marginVertical: 12}} />
      <View
        style={styles.container}
        >
        <TextInput
          selectionColor={COLORS.primary}
          style={styles.input}
          onChangeText={(text)=>{setType(text)}}
          placeholder="Type Comment"
          multiline={true}
        />
        <TouchableOpacity
          onPress={()=>{postComment()}}
          activeOpacity={0.6}
          style={{
            marginRight: 25,
            paddingVertical: 2,
          }}>
          <FontAwesome
            name={"send"}
            size={30}
            color={COLORS.primary}
            />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 'auto',
    height: 55,
    width: '85%',
    backgroundColor: COLORS.commentInput,
    borderRadius: 30,
    // color: COLORS.grey,
    // fontSize: 15,
    ...Platform.select({
      android: {
        elevation: 24,
        shadowColor: COLORS.shadowColor,
      },
      ios: {
        shadowRadius: 24,
        shadowOpacity: 1,
        shadowColor: 'rgba(146, 170, 212, 0.12)',
        shadowOffset: { width: 0, height: 16 },
      }
    }),
  },
  input: {
    textAlign: 'center',
    flex: 1,
    fontSize: 15,
    color: COLORS.text,
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: FONTS.Medium
  },
});

export default CommentScreen;