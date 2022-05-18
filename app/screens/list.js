import { ScrollView, Text } from 'react-native'
import React, {useState, useEffect} from 'react'
import Communities from 'getsocial-react-native-sdk/Communities';
import GroupsQuery from 'getsocial-react-native-sdk/models/communities/GroupsQuery'
import PagingQuery from 'getsocial-react-native-sdk/models/PagingQuery';
import CustomCard from '../components/CustomCard';

const ListScreen = ({route, navigation}) => {

  const {userId} = route.params

  const [group, setGroup] = useState();
  useEffect(()=>{
    const query = GroupsQuery.all();
    const pagingQuery = new PagingQuery(query);
    Communities.getGroups(pagingQuery).then((result)=>{
      setGroup(result.entries)
    }).catch((error)=>{
      //handle errors here
    })
  }, [group])

  return (
    <ScrollView contentContainerStyle={{
      flex: 1,
      justifyContent:'center',
      alignItems: 'center',
    }}>
      {group && group.map((item, key)=>{return(
        <CustomCard data={item} key={key} navigation={navigation} userId={userId} />
      )})}
    </ScrollView>
  )
}

export default ListScreen