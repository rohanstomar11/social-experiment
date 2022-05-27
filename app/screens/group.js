import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Communities from 'getsocial-react-native-sdk/Communities';
import {COLORS} from '../assets/color';
import JoinGroupQuery from 'getsocial-react-native-sdk/models/communities/JoinGroupQuery';
import ActivitiesQuery from 'getsocial-react-native-sdk/models/communities/ActivitiesQuery';
import PagingQuery from 'getsocial-react-native-sdk/models/PagingQuery';
import CustomPost from '../components/CustomPost';
import CustomButton from '../components/CustomButton';
import RemoveGroupMembersQuery from 'getsocial-react-native-sdk/models/communities/RemoveGroupMembersQuery';
import UserIdList from 'getsocial-react-native-sdk/models/UserIdList';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {CONFIG} from '../utility/config';
import {StreamChat} from 'stream-chat';

const client = StreamChat.getInstance(CONFIG.getStreamApiKey);

const GroupScreen = ({route, navigation}) => {
  const {id, userId} = route.params;

  const [group, setGroup] = useState();
  const [groupMember, setGroupMember] = useState();
  const [membersCount, setMembersCount] =  useState(0);
  useEffect(()=>{
    Communities.getGroup(id, userId).then((result)=>{
       setGroup(result);
       result.isFollowedByMe===true ? setGroupMember(true) : setGroupMember(false)
       setMembersCount(result.membersCount)
     }), (error)=>{
       console.error(error);
     }
  }, [group, groupMember, membersCount])

  const chatJoin = async ()=>{
    const channel = client.channel('team', id, {
      name: group.title,
    });
    await channel.addMembers([userId]);
    console.log("Success");
  }

  const chatLeave = async ()=>{
    const channel = client.channel('team', id, {
      name: group.title,
    });
    await channel.removeMembers([userId]);
    console.log("Success");
  }

  const joinGroup = () => {
    const query = JoinGroupQuery.create(id);
    Communities.joinGroup(query).then((member)=>{
      setGroupMember(true)
      chatJoin();
    }, (error) => {
    console.error(error);
    })
  }

  const leaveGroup = () => {
    const userIdNew = UserIdList.create([userId]);
    const query = RemoveGroupMembersQuery.create(id, userIdNew);
    Communities.removeGroupMembers(query).then((result)=>{
      setGroupMember(false);
      chatLeave();
    }, (error) => {
    console.error(error);
    })
  }

  const [feed, setFeed] = useState();
  useEffect(()=>{
    const query = ActivitiesQuery.inGroup(id);
    const pagingQuery = new PagingQuery(query);
    Communities.getActivities(pagingQuery).then((result)=>{
      Object.keys(result.entries).length!==0? setFeed(result.entries): null;
    },(error)=>{
      console.error(error);
    })
  },[feed])

  const [feedIndex, setFeedIndex] = useState();
  useEffect(()=>{
    const query = ActivitiesQuery.inGroup(id);
    const pagingQuery = new PagingQuery(query);
    Communities.getActivities(pagingQuery).then((result)=>{
      Object.keys(result.entries).length<3 ? setFeedIndex(Object.keys(result.entries).length) : setFeedIndex(3);
    },(error)=>{
      console.error(error);
    })
  },[])

  const [feedMaxIndex, setFeedMaxIndex] = useState();
  useEffect(()=>{
    const query = ActivitiesQuery.inGroup(id);
    const pagingQuery = new PagingQuery(query);
    Communities.getActivities(pagingQuery).then((result)=>{
      setFeedMaxIndex(Object.keys(result.entries).length);
    }, (error)=>{
      console.error(error);
    })
  },[])

  const loadMore = () => {
    feedMaxIndex-feedIndex>2 ? setFeedIndex(feedIndex+3) : setFeedIndex(feedMaxIndex);
  }

  const openGroupChat = () => {
    groupMember ? navigation.navigate('GroupChatScreen', {id: id, title: group.title}) : alert("Please Join The Group to access Group Chat!");
  }
  
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      overScrollMode={'never'}
      contentContainerStyle={{
      paddingBottom: 20,
    }}>
      {group &&
        <View
          style={{
            width:'100%',
            alignItems: 'center',
            marginVertical: 20,
          }}>
            <View
              style={styles.headerContainer}>
              <TouchableOpacity
                onPress={()=>{navigation.goBack()}}
                activeOpacity={0.6}
                style={[styles.headerButton,  {marginLeft: 15}]}>
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
                  fontSize: 28,
                }}>
                {group.title} Club
              </Text>
              <TouchableOpacity
                onPress={()=>{openGroupChat()}}
                activeOpacity={0.6}
                style={[styles.headerButton,  {marginRight: 20}]}>
                <AntDesign
                  name='wechat'
                  color={COLORS.primary}
                  size={30}
                />
              </TouchableOpacity>
            </View>
          <Image
            source={{uri: group.avatarUrl}}
            style={styles.image}/>
          <View 
            style={{
              marginTop: 8,
            }}>
            <Text>
              {group.description}
            </Text>
          </View>
        {groupMember === true
        ? <View
            style={styles.join}>
            <Text
              style={{
                color: COLORS.text, 
                fontSize: 15,
              }}>
              Joined!
            </Text>
        </View>
        : <TouchableOpacity
            onPress={()=>{joinGroup()}}
            activeOpacity={0.75}
            style={[styles.join, {backgroundColor: COLORS.primary}]}>
          <Text
            style={{
              color: COLORS.white, 
              fontSize: 15,
            }}>
              + Join
          </Text>
        </TouchableOpacity>}
        <Text
          style={{
            color: COLORS.green,
            marginTop: 2,
          }}>
          Members: {membersCount}
        </Text>
        <View
          style={styles.feedContainer}>
          <Text
            style={styles.feedTitle}>
            Feed
          </Text>
          {groupMember &&
            <CustomButton
              onPress={()=>{navigation.navigate('PostScreen', {id: id})}}
              style={{
                height:39, 
                width:80, 
                marginRight: 10,
              }}
              title={"POST"}
              fontsize={12}
            />
          }
        </View>
      </View>}
      {!feed &&
        <Text
        style={styles.emptyFeed}>
          There are no posts in this group!
        </Text>}
      {feed &&(
        feed.map((item, index)=>{
          if(index<feedIndex){
            return (
              <CustomPost
                data={feed[index]}
                key={index}
                navigation={navigation}
                showComments={true} 
                />
            )
          }
        })
      )}
      {feed &&
        feedMaxIndex>feedIndex &&
          (
            <TouchableOpacity
              onPress={()=> {loadMore()}}
              activeOpacity={0.6}
              style={{
                alignSelf: 'center', 
                alignItems:'center',
              }}>
              <Text
              style={{
                color: COLORS.primary,
                fontWeight: '700',
              }}> 
                View More
              </Text>
            </TouchableOpacity>
      )}
      {groupMember===true && (
          <CustomButton
            title={"Leave Group!"}
            colors={[COLORS.gradRed1, COLORS.gradRed2]}
            style={{
              marginTop: 20,
              width: '45%',
              alignSelf:'center',
            }}
            onPress={()=>{leaveGroup()}}
          />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  headerButton: {
    alignSelf:'center',
    elevation: 5,
    borderRadius: 20,
    padding: 5,
    backgroundColor: COLORS.background,
  },
  image: {
    height:150,
    width:150,
    marginTop: 20,
    borderRadius: 15,
  },
  join: {
    marginTop: 8,
    backgroundColor: COLORS.background,
    paddingVertical: 8,
    borderRadius: 12,
    paddingHorizontal: 30,
  },
  feedContainer: {
    width: '100%', 
    marginTop:2, 
    flexDirection:'row', 
    justifyContent:'space-between', 
    alignItems:'center',
  },
  feedTitle: {
    marginHorizontal: 16,
    color: COLORS.text, 
    fontSize: 24,
    fontWeight:'700',
  },
  emptyFeed: {
    alignSelf:'center', 
    color: COLORS.primary, 
    fontSize: 20, 
    fontStyle: 'italic',
  },
});

export default GroupScreen;