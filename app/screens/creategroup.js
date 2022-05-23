import { View, Text } from 'react-native'
import React, {useState} from 'react'

const CreateGroupScreen = ({navigation, route}) => {
    const {userId} = route.params
    const current = Math.round(new Date().getTime() / 1000);

    const [title, setTitle] = useState('');
    //description
    //url for avatar
    //post permissions
    //react permissions
    //discoverable
    //private

  return (
    <View>
      <Text>{userId}{current}</Text>
    </View>
  )
}

export default CreateGroupScreen