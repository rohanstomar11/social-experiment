import { ScrollView, TextInput, View, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import CustomPost from '../components/CustomPost'
import ActivitiesQuery from 'getsocial-react-native-sdk/models/communities/ActivitiesQuery';
import PagingQuery from 'getsocial-react-native-sdk/models/PagingQuery';
import Communities from 'getsocial-react-native-sdk/Communities';
import CustomComment from '../components/CustomComment'
import AntDesign from 'react-native-vector-icons/AntDesign'
import ActivityContent from 'getsocial-react-native-sdk/models/communities/ActivityContent';
import PostActivityTarget from 'getsocial-react-native-sdk/models/communities/PostActivityTarget';

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
  },[comments])

  const [type, setType] = useState('')
  const postComment = () => {
    const activityContent = new ActivityContent();
    activityContent.text = type;

    const target = PostActivityTarget.comment(data.id);

    Communities.postActivity(activityContent, target).then((result)=>{
      alert("Comment Posted");
    }, (error)=>{
      console.log(error);
    })
  }

  return (
    <ScrollView
      overScrollMode='never'
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        width: '100%',
        alignItems: 'center',
        paddingTop: 20
      }}
      >
      <CustomPost data={data} showComments={false} />
      {comments &&
        comments.map((item, index)=>{
          const length = Object.keys(comments).length
          return <CustomComment data={comments[length-index-1]} key={length-index-1} />
        })
      }
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
        height: 40,
        width: '80%',
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        color: '#354354',
        borderWidth: 1,
        borderColor: '#2D6CDF',
        fontSize: 10,
        ...Platform.select({
          android: {
            elevation: 24,
            shadowColor: 'rgba(146, 170, 212, 0.12)',
          },
          ios: {
            shadowRadius: 24,
            shadowOpacity: 1,
            shadowColor: 'rgba(146, 170, 212, 0.12)',
            shadowOffset: { width: 0, height: 16 },
          }
        })
      }}>
      <TextInput
        selectionColor={'#2D6CDF'}
        style={{
          padding: 10,
          flex: 1,
          fontSize: 12,
          color: '#333',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onChangeText={(text)=>{setType(text)}}
        placeholder="Type Comment"
        multiline={true}
      />
      <TouchableOpacity
        onPress={()=>{postComment()}}
        activeOpacity={0.6}
        style={{
          marginRight: 5,
          padding:2,
          borderRadius: 25
        }}>
        <AntDesign name={"rightsquare"} size={30} color="#2D6CDF" />
      </TouchableOpacity>
    </View>
    </ScrollView>
  )
}

export default CommentScreen;