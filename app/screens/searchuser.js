import { View, ScrollView } from 'react-native'
import React, {useState} from 'react'
import CustomInputField from '../components/CustomInputField'
import CustomButton from '../components/CustomButton'
import UsersQuery from 'getsocial-react-native-sdk/models/communities/UsersQuery'
import PagingQuery from 'getsocial-react-native-sdk/models/PagingQuery'
import Communities from 'getsocial-react-native-sdk/Communities'
import CustomProfileCard from '../components/CustomProfileCard'

const SearchUserScreen = ({navigation, route}) => {

    const {userId} = route.params;

    const [name, setName] = useState();

    const [data, setData] = useState();
    const getData = () => {
        const query = UsersQuery.find(name);
        const pagingQuery = new PagingQuery(query);
        Communities.getUsers(pagingQuery).then((result)=>{
            setData(result.entries);
        },(error)=>{
            console.error(error);
        })
    }

  return (
    <View
        style={{
            flex:1,
        }}>
        <View
            style={{
                width: '100%',
                alignItems: 'center'
            }}>
            <CustomInputField
            top={20}
            radius={30}
            iconType={'search1'}
            onchange={(text)=>{setName(text)}}
            placeholder={"Search by Name (atleast 3 letters)"}
            style={{
            }}
                />
            <CustomButton
                title={"Search"}  
                style={{
                    marginTop: 10,
                    width: '50%',
                    marginBottom: 10,
                }}
                onPress={()=>{getData()}}      
                />
        </View>
        {data && (
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    width: '100%',
                    alignItems: 'center',
                    borderTopWidth: 1,
                    borderColor: '#3036D6'
                }}>
                {data.map((item, index)=>{
                    return <CustomProfileCard data={item} key={index} navigation={navigation} userId={userId} />
                })}
            </ScrollView>
        )}
    </View>
  )
}

export default SearchUserScreen