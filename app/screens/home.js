import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Platform,
  StatusBar,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import GetSocial from 'getsocial-react-native-sdk/GetSocial'
import CustomBanner from '../components/CustomBanner';
import Communities from 'getsocial-react-native-sdk/Communities';
import TopicsQuery from 'getsocial-react-native-sdk/models/communities/TopicsQuery';
import GroupsQuery from 'getsocial-react-native-sdk/models/communities/GroupsQuery';
import PagingQuery from 'getsocial-react-native-sdk/models/PagingQuery';
import CustomCard from '../components/CustomCard';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import InviteContent from 'getsocial-react-native-sdk/models/invites/InviteContent';
import MediaAttachment from 'getsocial-react-native-sdk/models/MediaAttachment';
import Invites from 'getsocial-react-native-sdk/Invites';
import {CONFIG} from '../utility/config';
import {StreamChat} from 'stream-chat';
import CustomButton from '../components/CustomButton';
import {COLORS} from '../assets/color';
import MyAppText from '../components/MyAppText';
import { FONTS } from '../assets/fontFamily';

const client = StreamChat.getInstance(CONFIG.getStreamApiKey);

const HomeScreen = ({navigation}) => {;

  const [name, setName] = useState();
  const [imageUrl, setImageUrl] = useState();
  const [userId, setUserId] = useState();
  const [admin, setAdmin] = useState(true);
  useEffect(()=>{
    GetSocial.getCurrentUser().then((currentUser)=>{
      setUserId(currentUser.id);
      setName(currentUser.displayName);
      setImageUrl(currentUser.avatarUrl);
      currentUser.privateProperties.admin === 'true' ? setAdmin(true) : setAdmin(false);
    },(error)=>{
      console.error(error);
    })
  }, [name, imageUrl, userId, admin])

  
  useEffect(()=>{
    const setupClient = () => {
      GetSocial.getCurrentUser().then(async (currentUser)=>{
        await client.connectUser({
          id: currentUser.id,
          name: currentUser.displayName,
          image: currentUser.avatarUrl,  
        },client.devToken(currentUser.id)).
        then(()=>{
          console.log('GetStream: User Connected')
        }),
        (error)=>{
          console.log(error);
        }
      },(error)=>{
        console.error(error);
      })
    }
    setupClient();

    return ()=>{client.disconnectUser()}
  }, [])

  const [data, setData] = useState();
  useEffect(() => {
    const query = TopicsQuery.all();
    const pagingQuery = new PagingQuery(query);
    Communities.getTopics(pagingQuery).then((result) => {
      var topics = result.entries;
      setData(topics)
    }).catch((error) => {
      console.error(error);
    })
  }, [data])

  const [group, setGroup] = useState();
  useEffect(() => {
    const query = GroupsQuery.all();
    const pagingQuery = new PagingQuery(query);
    Communities.getGroups(pagingQuery).then((result) => {
      var groups = result.entries;
      setGroup(groups)
    }).catch((error) => {
      console.error(error);
    })
  }, [group])

  const sendInvite = () => {
    var inviteContent = new InviteContent();
    inviteContent.text = "Welcome to Social Experiment! Download from here \n[APP_INVITE_URL]";
    inviteContent.subject = 'Social Experiment';
    inviteContent.mediaAttachment = MediaAttachment.withImageUrl(imageUrl);

    Invites.send(
      inviteContent,
      'nativeshare',
      () => console.log("Success"),
      () => console.log("Cancel"),
      (error) => console.log(error)
    );
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      alwaysBounceVertical={false}
      overScrollMode={'never'}
      contentContainerStyle={{
        flexGrow: 1,
        alignItems: 'center',
      }}>
      {imageUrl
        ?
        <Image
          style={styles.image}
          source={{uri: imageUrl}}
          />
        :
        <FontAwesome
          name='user-circle'
          size={80}
          style={styles.image}
          color={COLORS.grey}
          />
        }
        <MyAppText
          family={FONTS.Bold}
          textColor={COLORS.text}
          textSize={25}>
          {name}
        </MyAppText>
        {admin
          ?
          <View
            style={{
              marginTop: -10,
            }}>
            <MyAppText
              textColor={COLORS.primary}
              textSize={14}>
              Admin
            </MyAppText>
          </View>
          :
          <View
            style={{
              marginTop: -10,
            }}>
            <MyAppText
              textColor={COLORS.green}
              textSize={14}>
              Member
            </MyAppText>
          </View>
        }
        <View
          style={{
            width: '90%',
            marginTop: 20,
          }}>
          <MyAppText
            textColor={COLORS.text}
            family={FONTS.SemiBold}
            textSize={20}
            marginBottom={10}>
            Ongoing Events
          </MyAppText>
          {data && <CustomBanner data={data} />}
        </View>
        <View
          style={{
            width: '90%',
            marginTop: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
          <MyAppText
            textColor={COLORS.text}
            family={FONTS.SemiBold}
            textSize={20}>
            Spaces
          </MyAppText>
          {admin &&
            <CustomButton
              title={"Create"}
              onPress={()=>{navigation.navigate('CreateGroupScreen', {userId: userId})}}
              />}
        </View>

        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            height: 'auto',
            alignItems: 'center',
            marginLeft: '5%'
          }}>
          {group && group.map((item, index)=>{
            if(index<3){
              return (
                <CustomCard
                  data={item}
                  navigation={navigation}
                  userId={userId}
                  key={index}
                  />
              )
            }
          })}
          {group &&
            Object.keys(group).length>3 &&
            <TouchableOpacity
              onPress={()=>navigation.navigate('ListScreen')}
              activeOpacity={0.75}
              style={{
                justifyContent:'center',
                marginRight: 30,
              }}>
              <MyAppText
                textColor={COLORS.primary}
                family={FONTS.SemiBold}>
                View All
              </MyAppText>
            </TouchableOpacity>
          }
        </ScrollView>
      {/* <View
        style={styles.headerContainer}>
        <View
          style={{
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontSize: 25,
              color: COLORS.text,
              fontWeight: '600',
            }}>
            Hola, {name}!
          </Text>
        </View>
        <View
          style={{
            width: 48,
            height: 48,
            borderRadius: 24,
          }}>
          {imageUrl
            ?
            <Image
              style={{
                flex: 1,
                borderRadius: 24,
                backgroundColor: COLORS.black,
              }}
              source={{uri: imageUrl}}
              />
            :
            <FontAwesome
              name='user-circle'
              size={48}
              color={COLORS.grey}
            />
          }
        </View>
      </View>
      <View
        style={styles.bannerContainer}>
        {data && <CustomBanner data={data} />}
        <View
          style={styles.spacesContainer}>
            <Text
              style={{
                color: COLORS.text,
                fontSize: 24,
              }}>
                Spaces
              </Text>
              {admin &&
                <CustomButton
                  title={"Create"}
                  onPress={()=>{navigation.navigate('CreateGroupScreen', {userId: userId})}}
                  />
              }
            </View>
            <ScrollView
              horizontal={true}
              contentContainerStyle={{
                height: 150,
              }}>
              {group && group.map((item, index)=>{
                if(index<3){
                  return (
                  <CustomCard
                    data={item}
                    navigation={navigation}
                    userId={userId}
                    key={index}
                    />
                  )
                }
              })}
              {group &&
                Object.keys(group).length>3 &&
                <TouchableOpacity
                  onPress={()=>navigation.navigate('ListScreen')}
                  activeOpacity={0.75}
                  style={{
                    justifyContent:'center',
                    alignSelf: 'center',
                    flex:1,
                  }}>
                  <Text
                    style={{
                      color: COLORS.text,
                      fontWeight: '600',
                    }}>
                    View All
                  </Text>
                </TouchableOpacity>
              }
            </ScrollView>
      </View>
      <TouchableOpacity
        onPress={()=>sendInvite()}
        activeOpacity={0.6}
        style={styles.share}>
        <AntDesign
          name='sharealt'
          size={40}
          color={COLORS.primary}
          />
      </TouchableOpacity> */}
      <StatusBar
        barStyle='dark-content'
        backgroundColor={COLORS.background}
        />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 80,
    width: 80,
    borderRadius: 40,
    marginTop: 25,
  },
  name: {
    fontFamily: 'Poppins-Bold',
    color: COLORS.text,
    fontSize: 25,
  },
  status: {
    fontFamily: 'Poppins-Regular',
    color: COLORS.green,
    marginTop: -10
  },
  // headerContainer: {
  //   width: '100%',
  //   padding: 20,
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   marginTop: 20,
  //   backgroundColor: COLORS.cardBg,
  //   borderRadius: 20,
  //   ...Platform.select({
  //     android: {
  //       elevation: 24,
  //       shadowColor: COLORS.shadowColor,
  //     },
  //     ios: {
  //       shadowRadius: 24,
  //       shadowOpacity: 1,
  //       shadowColor: COLORS.shadowColor,
  //       shadowOffset: { width: 0, height: 16 },
  //     }
  //   })
  // },
  // bannerContainer: {
  //   width: '100%',
  //   height: '100%',
  //   alignItems:'center',
  //   padding: '5%',
  // },
  // spacesContainer: {
  //   width: '100%',
  //   marginVertical: 12,
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   alignItems: 'center',
  // },
  // share: {
  //   position: 'absolute',
  //   bottom: 15,
  //   left: 15,
  //   borderRadius: 27,
  //   padding: 7,
  //   backgroundColor: COLORS.cardBg,
  //   ...Platform.select({
  //     android: {
  //       elevation: 24,
  //       shadowColor: COLORS.shadowColor,
  //     },
  //     ios: {
  //       shadowRadius: 24,
  //       shadowOpacity: 1,
  //       shadowColor: COLORS.shadowColor,
  //       shadowOffset: { width: 0, height: 16 },
  //     }
  //   })
  // },
});

export default HomeScreen;