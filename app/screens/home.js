import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
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
    <View
      style={{
        flex:1,
      }}>
      <ScrollView
      showsVerticalScrollIndicator={false}
      alwaysBounceVertical={false}
      overScrollMode={'never'}
      contentContainerStyle={{
        flex: 1,
        alignItems: 'center',
      }}>
      <View
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
      </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    padding: 20,
    elevation: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    backgroundColor: COLORS.cardBg,
    borderRadius: 20,
  },
  bannerContainer: {
    width: '100%',
    height: '100%',
    alignItems:'center',
    padding: '5%',
  },
  spacesContainer: {
    width: '100%',
    marginVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  share: {
    position: 'absolute',
    bottom: 15,
    left: 15,
    elevation: 20,
    borderRadius: 27,
    padding: 7,
    backgroundColor: COLORS.background,
  },
});

export default HomeScreen;