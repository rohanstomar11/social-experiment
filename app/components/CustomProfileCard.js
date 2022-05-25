import { Image, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { DefaultUser } from '../assets/images/index'

const CustomProfileCard = ({data, navigation, userId}) => {

  if(data.userId===userId){
    return null;
  }

  const url = data.avatarUrl===''? DefaultUser:{uri: data.avatarUrl};

  const userProfile = () => {
    navigation.navigate('UserScreen', {userId: userId,id: data.userId});
  }
  
  return (
    <TouchableOpacity
      onPress={()=>{userProfile()}}
      activeOpacity={0.75}
      style={{
        width: '80%',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        marginTop: 20,
        borderWidth: 1,
        borderRadius: 12,
        padding: 10,
        borderColor: '#3036D6'
      }}>
      <Image
        source={url}
        style={{
          width:50, 
          height: 50,
          borderRadius: 25,
          borderWidth: 1,
          borderColor: '#3036D6'
        }}/>
      <Text
        style={{
          marginLeft: 15,
          color: '#354354',
          fontSize: 20,
          fontWeight: '500'
        }}>
          {data.displayName}
      </Text>
    </TouchableOpacity>
  )
}

export default CustomProfileCard