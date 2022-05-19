import { View, Text, Image, TouchableOpacity, ScrollView, Share } from 'react-native'
import React, {useState, useEffect} from 'react'
import auth from '@react-native-firebase/auth'
import GetSocial from 'getsocial-react-native-sdk/GetSocial'
import CustomBanner from '../components/CustomBanner';
import Communities from 'getsocial-react-native-sdk/Communities';
import TopicsQuery from 'getsocial-react-native-sdk/models/communities/TopicsQuery';
import GroupsQuery from 'getsocial-react-native-sdk/models/communities/GroupsQuery'
import PagingQuery from 'getsocial-react-native-sdk/models/PagingQuery';
import CustomCard from '../components/CustomCard';
import AntDesign from 'react-native-vector-icons/AntDesign'
import InviteContent from 'getsocial-react-native-sdk/models/invites/InviteContent';
import MediaAttachment from 'getsocial-react-native-sdk/models/MediaAttachment';
import Invites from 'getsocial-react-native-sdk/Invites';

const HomeScreen = ({navigation}) => {

  const [name, setName] = useState('User');
  const [imageUrl, setImageUrl] = useState();
  const [userId, setUserId] = useState();
  useEffect(()=>{
    GetSocial.getCurrentUser().then((currentUser)=>{
      setUserId(currentUser.id);
      setName(currentUser.displayName);
      setImageUrl(currentUser.avatarUrl);
    })
  }, [userId, name, imageUrl])

  const [data, setData] = useState();
  useEffect(()=>{
    const query = TopicsQuery.all();
    const pagingQuery = new PagingQuery(query);
    Communities.getTopics(pagingQuery).then((result)=>{
      var topics = result.entries;
      setData(topics)
    }).catch((error)=>{
      //handle errors here
    })
  }, [data])

  const [group, setGroup] = useState();
  useEffect(()=>{
    const query = GroupsQuery.all();
    const pagingQuery = new PagingQuery(query);
    Communities.getGroups(pagingQuery).then((result)=>{
      var groups = result.entries;
      setGroup(groups)
    }).catch((error)=>{
      //handle errors here
    })
  }, [group])

  const logout = () => {
    auth().signOut().then(()=>{
      GetSocial.resetUser().then(()=>{
        navigation.replace('LoginScreen')
      }, (error)=>{
        console.error(error)
      })
    })
  }

  const sendInvite = () => {
    var inviteContent = new InviteContent();
    inviteContent.text =  "Welcome to Social Experiment! Download from here \n[APP_INVITE_URL]"
    inviteContent.subject = 'Social Experiment'
    inviteContent.mediaAttachment = MediaAttachment.withImageUrl(imageUrl);

    Invites.send(
      inviteContent,
      'nativeshare',
      ()=>console.log("Success"),
      ()=>console.log("Cancel"),
      (error)=>console.log(error)
    );
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      alwaysBounceVertical={false}
      overScrollMode={'never'}
      contentContainerStyle={{
        flex:1,
        alignItems:'center'
    }}>
      <View style={{width: '100%', padding: 20, elevation: 2, flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, backgroundColor: '#F0FEFE', borderRadius: 20}}>
        <View style={{justifyContent: 'center'}}>
          <Text style={{
            fontSize: 25,
            color: '#000000',
            fontWeight: '600',
          }}>
            Hola, {name}!
          </Text>
        </View>
        <TouchableOpacity style={{width: 48, height: 48, borderRadius: 24}} activeOpacity={0.6} onPress={()=>{logout()}}>
          <Image
            style={{flex:1, borderRadius: 24, backgroundColor: '#000000'}}
            source={{
              uri: imageUrl
            }}
          />
        </TouchableOpacity>
      </View>
      <View style={{width: '100%', height: '100%', alignItems:'center', padding: '5%'}}>
        {data && <CustomBanner data={data} />}
        <View style={{width: '100%', marginVertical: 12}}>
          <Text style={{
            color:'#354354',
            fontSize: 24
          }}>
            Spaces
          </Text>
        </View>
        <ScrollView
          horizontal={true}
          contentContainerStyle={{
            height: 150,
          }}>
          {group && (
            <>
              <CustomCard data={group[0]} navigation={navigation} userId={userId} />
              <CustomCard data={group[1]} navigation={navigation} userId={userId} />
              <CustomCard data={group[2]} navigation={navigation} userId={userId} />
              <TouchableOpacity onPress={()=>navigation.navigate('ListScreen', {userId: userId})} activeOpacity={0.75} style={{justifyContent:'center', alignSelf: 'center', flex:1}}><Text style={{color: '#354354', fontWeight: '600'}}>View All</Text></TouchableOpacity>
            </>
          )}
        </ScrollView>
      </View>
      <TouchableOpacity
      onPress={()=>sendInvite()}
        activeOpacity={0.6}
        style={{
          position: 'absolute',
          bottom: 15,
          right: 15,
          elevation: 20,
          borderRadius: 27,
          padding: 7,
          backgroundColor: '#F7F3F2',
        }}>
        <AntDesign
          name='sharealt'
          size={40}
          color='#2D6CDF'
          />
      </TouchableOpacity>
    </ScrollView>
  )
}
export default HomeScreen;