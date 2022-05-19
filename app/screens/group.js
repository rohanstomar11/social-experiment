import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import Communities from 'getsocial-react-native-sdk/Communities';
import { COLORS } from '../assets/color';
import JoinGroupQuery from 'getsocial-react-native-sdk/models/communities/JoinGroupQuery';
import ActivitiesQuery from 'getsocial-react-native-sdk/models/communities/ActivitiesQuery';
import PagingQuery from 'getsocial-react-native-sdk/models/PagingQuery';
import CustomPost from '../components/CustomPost';
import CustomButton from '../components/CustomButton';
import RemoveGroupMembersQuery from 'getsocial-react-native-sdk/models/communities/RemoveGroupMembersQuery';
import UserIdList from 'getsocial-react-native-sdk/models/UserIdList';

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
     }).catch((error)=>{
       //Handle Errors
     })
  }, [group, groupMember])

  const joinGroup = () => {
    const query = JoinGroupQuery.create(id);
    Communities.joinGroup(query).then((member)=>{
      console.log('User Joined the group');
      setGroupMember(true)
    }, (error) => {
    console.error(error)
    })
  }

  const leaveGroup = () => {
    const userIdNew = UserIdList.create([userId])
    const query = RemoveGroupMembersQuery.create(id, userIdNew);
    Communities.removeGroupMembers(query).then((result)=>{
      console.log('User Removed from the Group');
      setGroupMember(false)
    }, (error) => {
    console.error(error)
    })
  }

  const [feed, setFeed] = useState();
  useEffect(()=>{
    const query = ActivitiesQuery.inGroup(id);
    const pagingQuery = new PagingQuery(query);
    Communities.getActivities(pagingQuery).then((result)=>{
      Object.keys(result.entries).length!==0? setFeed(result.entries): null
    })
  },[feed])
  
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
      
    }}>
      {group && <View style={{width:'100%', alignItems: 'center', marginVertical: 20,}}>
        <Text style={{color: '#354354', fontWeight: '900', fontSize: 30}}>{group.title} Club</Text>
        <Image source={{uri: group.avatarUrl}} style={{height:150, width:150, marginTop: 20, borderRadius: 15}} />
        <View style={{marginTop: 8}}>
          <Text>
            {group.description}
          </Text>
        </View>
        {groupMember === true ?
        <View style={{marginTop: 8,
          backgroundColor: '#AAAAAA',
          paddingVertical: 8,
          borderRadius: 12,
          paddingHorizontal: 30}}>
          <Text style={{color: '#354354', fontSize: 15}}>Joined!</Text>
        </View>
        : <TouchableOpacity
            onPress={()=>{joinGroup()}}
            activeOpacity={0.75}
            style={{
              marginTop: 8,
              backgroundColor: COLORS.link,
              paddingVertical: 8,
              borderRadius: 12,
              paddingHorizontal: 30
          }}>
          <Text style={{color: '#FFFFFF', fontSize: 15}}>+ Join</Text>
        </TouchableOpacity>}
        <Text style={{color: '#267967', marginTop: 2}}>Members: {membersCount}</Text>
        <View style={{width: '100%', marginTop:2, flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
          <Text style={{marginHorizontal: 16, color:'#354354', fontSize: 24, fontWeight:'700'}}>Feed</Text>
          {groupMember && <CustomButton onPress={()=>{navigation.navigate('PostScreen', {id: id})}} style={{height:39, width:80, marginRight: 10}} title={"POST"} fontsize={12} />}
        </View>
      </View>}
      {!feed && <Text style={{alignSelf:'center', color:'#3036D6', fontSize: 20, fontStyle: 'italic'}}>There are no posts in this group!</Text>}
      {feed &&
      (<>
        <CustomPost data={feed[0]} />
        <CustomPost data={feed[1]} />
        <CustomPost data={feed[2]} /> 
      </>)}
      {feed &&
        Object.keys(feed).length>3 &&
          (
            <TouchableOpacity onPress={()=> {console.log("Load More Posts Clicked!")}} activeOpacity={0.6} style={{alignSelf: 'center', alignItems:'center'}}>
              <Text style={{ color: '#3036D6', fontWeight: '700'}}> 
                View More
              </Text>
            </TouchableOpacity>
      )}
      {groupMember===true && (
          <CustomButton
            title={"Leave Group!"}
            colors={['#B31217', '#E52D27']}
            style={{marginTop: 20, width: '45%', alignSelf:'center', }}
            onPress={()=>{leaveGroup()}}
          />
      )}
      
    </ScrollView>
  )
}

export default GroupScreen