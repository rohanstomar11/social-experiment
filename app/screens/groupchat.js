import React, {useState, useEffect} from 'react'
import { Channel, MessageList, OverlayProvider, Chat, MessageInput } from 'stream-chat-react-native'
import { CONFIG } from '../utility/config';
import { StreamChat, } from 'stream-chat';
import GetSocial from 'getsocial-react-native-sdk/GetSocial';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const client = StreamChat.getInstance(CONFIG.getStreamApiKey);

const GroupChatScreen = ({navigation, route}) => {
  const {id, title} = route.params;
  const [clientReady, setClientReady] = useState(false);

  useEffect(()=>{
    const setupClient = async () => {
      GetSocial.getCurrentUser().then((currentUser)=>{
        client.connectUser({
          id: currentUser.id,
          name: currentUser.displayName,
          image: currentUser.avatarUrl,  
        },client.devToken(currentUser.id)).
        then(()=>{
          console.log('GetStream: User Connected')
          setClientReady(true);
        }),
        (error)=>{
          console.log(error);
        }
      })
    }
    setupClient();

    return ()=>{client.disconnectUser()}
  }, [])

  if (!clientReady) return null;

  const channel = client.channel('team', id, {
    name: title,
  });

  return (
    <GestureHandlerRootView>
    <OverlayProvider>
      <Chat client={client}>
        <Channel channel={channel}>
          <MessageList />
          <MessageInput />
        </Channel>
      </Chat>
    </OverlayProvider></GestureHandlerRootView>
  )
}

export default GroupChatScreen