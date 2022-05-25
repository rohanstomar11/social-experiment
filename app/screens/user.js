import { View, Text } from 'react-native'
import React from 'react'
import CustomButton from '../components/CustomButton'
import { useCreateChatContext } from 'stream-chat-react-native'

const UserScreen = ({navigation, route}) => {
  const {userId, id} = route.params;

  const userChat = () => {
    navigation.navigate('UserChatScreen', {userId: userId, id: id});
  }

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>{id}</Text>
      <CustomButton 
        title={"Chat"}
        onPress={()=>{userChat()}}
        style={{marginTop: 10}}
        />
    </View>
  )
}

export default UserScreen