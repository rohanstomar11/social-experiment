import { View, Text, Image, TouchableOpacity, ScrollView} from 'react-native'
import React, {useState, useEffect} from 'react'
import auth from '@react-native-firebase/auth'
import GetSocial from 'getsocial-react-native-sdk/GetSocial'
import CustomBanner from '../components/CustomBanner';
import Communities from 'getsocial-react-native-sdk/Communities';
import TopicsQuery from 'getsocial-react-native-sdk/models/communities/TopicsQuery';
import PagingQuery from 'getsocial-react-native-sdk/models/PagingQuery';

const HomeScreen = ({navigation}) => {

  const [name, setName] = useState('User');

  const [imageUrl, setImageUrl] = useState();
  useEffect(()=>{
    GetSocial.getCurrentUser().then((currentUser)=>{
      setName(currentUser.displayName);
      setImageUrl(currentUser.avatarUrl);
    })
  })

  const [data, setData] = useState();
  useEffect(()=>{
    const query = TopicsQuery.all();
      const pagingQuery = new PagingQuery(query);
      Communities.getTopics(pagingQuery).then((result)=>{
        var topics = result.entries;
        setData(topics)
    })
  })

  const logout = () => {
    auth().signOut().then(()=>{
      GetSocial.resetUser().then(()=>{
        navigation.replace('LoginScreen')
      })
    })
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
      <View style={{width: '100%', padding: 20,flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, backgroundColor: '#AAAAAA', borderRadius: 20}}>
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
      </View>
    </ScrollView>
  )
}
export default HomeScreen;