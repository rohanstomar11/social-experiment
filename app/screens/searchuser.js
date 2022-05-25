import { View, ScrollView, Text } from 'react-native'
import React, {useState, useEffect} from 'react'
import CustomInputField from '../components/CustomInputField'
import CustomButton from '../components/CustomButton'
import UsersQuery from 'getsocial-react-native-sdk/models/communities/UsersQuery'
import PagingQuery from 'getsocial-react-native-sdk/models/PagingQuery'
import Communities from 'getsocial-react-native-sdk/Communities'
import CustomProfileCard from '../components/CustomProfileCard'
import GetSocial from 'getsocial-react-native-sdk/GetSocial'

const SearchUserScreen = ({navigation}) => {

    const [userId, setUserId] = useState();
    useEffect(()=>{
        GetSocial.getCurrentUser().then((currentUser)=>{
        setUserId(currentUser.id);
        },(error)=>{
        console.error(error);
        })
    }, [])

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
            <Text
                style={{
                    fontSize: 30,
                    marginTop: 20,
                    color: '#2D6CDF',
                    fontWeight: '700',
                    letterSpacing: 2,
                }}>
                SEARCH
            </Text>
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