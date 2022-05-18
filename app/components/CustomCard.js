import { TouchableOpacity, Text, Image } from 'react-native'
import React from 'react'

const CustomCard = ({navigation, data, userId}) => {

  return (
    <TouchableOpacity 
        activeOpacity={0.75}
        onPress={()=>{navigation.navigate('GroupScreen', {id: data.id, userId: userId})}}
        style={{
            backgroundColor: '#F0FEFE',
            borderRadius: 12,
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 12,
            marginTop: 12,
            paddingBottom: 12,
            paddingTop: 12,
            height: 130,
            width: 130,
            elevation: 2
        }}>
        <Image
            source={{uri: data.avatarUrl}}
            style={{height: '75%',  width: '70%', marginTop:5, backgroundColor: '#FFF', borderRadius: 12}} />
        <Text style={{marginTop: 5, fontSize:16, fontWeight: '900', color: '#000000'}}>
            {data.title}
        </Text>
    </TouchableOpacity>
  )
}

export default CustomCard