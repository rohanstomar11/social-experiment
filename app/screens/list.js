import {ScrollView, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import Communities from 'getsocial-react-native-sdk/Communities';
import GroupsQuery from 'getsocial-react-native-sdk/models/communities/GroupsQuery';
import PagingQuery from 'getsocial-react-native-sdk/models/PagingQuery';
import CustomCard from '../components/CustomCard';
import GetSocial from 'getsocial-react-native-sdk/GetSocial';
import MyAppText from '../components/MyAppText';
import {FONTS} from '../assets/fontFamily';
import {COLORS} from '../assets/color';
import AppSpinner from '../components/ActivityIndicator';

const ListScreen = ({navigation}) => {

  const [isLoading, setIsLoading] = useState(true)

  const [userId, setUserId] = useState();
  useEffect(()=>{
        GetSocial.getCurrentUser().then((currentUser)=>{
        setUserId(currentUser.id);
        },(error)=>{
        console.error(error);
        })
  }, [])

  const [group, setGroup] = useState();
  useEffect(()=>{
    const query = GroupsQuery.all();
    const pagingQuery = new PagingQuery(query);
    Communities.getGroups(pagingQuery).then((result)=>{
      setGroup(result.entries)
      setIsLoading(false);
    }).catch((error)=>{
      console.error(error);
    })
  }, [group])

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent:'center',
        alignItems: 'center',
        paddingTop: 20,
      }}>
      <MyAppText
        family={FONTS.Bold}
        textColor={COLORS.text}
        textSize={25}>
        Spaces
      </MyAppText>
      {group && group.map((item, key)=>{
        return(
          <View
            key={key}
            style={{
              marginVertical: 15,
            }}>
            <CustomCard
            data={item}
            navigation={navigation}
            userId={userId}
            />
          </View>
        )
      })}

      {isLoading && (
        <AppSpinner bgColor="transparent" color={COLORS.primary} />
      )}
    </ScrollView>
  );
};

export default ListScreen;