import { View, Text, ScrollView, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import Communities from 'getsocial-react-native-sdk/Communities';

const GroupScreen = ({route, navigation}) => {
    const {id} = route.params;

    const [group, setGroup] = useState();
    useEffect(()=>{
      Communities.getGroup(id).then((result)=>{
        setGroup(result);
      }).catch((error)=>{
        //Handle Errors
      })
    })
  return (
    <ScrollView
      contentContainerStyle={{
      flex:1,
    }}>
      {group && <View style={{width:'100%', alignItems: 'center', marginVertical: 20,}}>
        <Text style={{color: '#354354', fontWeight: '900', fontSize: 30}}>{group.title} Club</Text>
        <Image source={{ uri: group.avatarUrl}} style={{height:'40%', width:'40%', marginTop: 20, borderRadius: 15}} />
      </View>}
    </ScrollView>
  )
}

export default GroupScreen