import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import Communities from 'getsocial-react-native-sdk/Communities';
import { COLORS } from '../assets/color';
import JoinGroupQuery from 'getsocial-react-native-sdk/models/communities/JoinGroupQuery';
import ActivitiesQuery from 'getsocial-react-native-sdk/models/communities/ActivitiesQuery';
import PagingQuery from 'getsocial-react-native-sdk/models/PagingQuery';
import CustomPost from '../components/CustomPost';
import CustomButton from '../components/CustomButton';

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

  const [feed, setFeed] = useState();
  useEffect(()=>{
    const query = ActivitiesQuery.inGroup(id);
    const pagingQuery = new PagingQuery(query);
    Communities.getActivities(pagingQuery).then((result)=>{
      Object.keys(result.entries).length!==0? setFeed(result.entries): null
    })
  },[])
  
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
      flex:1,
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
          <CustomButton onPress={()=>{console.log("Add Post Clicked!")}} style={{height:39, width:80, marginRight: 10}} title={"POST"} fontsize={12} />
        </View>
      </View>}
      {feed && (<>
        <CustomPost data={feed[0]} />
        {/* <CustomPost data={feed[0]} /> */}
      </>
      )}
    </ScrollView>
  )
}

export default GroupScreen