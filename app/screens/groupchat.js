import React, {useEffect} from 'react'
import {
  Channel,
  MessageList,
  OverlayProvider,
  Chat,
  MessageInput,
} from 'stream-chat-react-native';
import {CONFIG} from '../utility/config';
import {StreamChat} from 'stream-chat';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const client = StreamChat.getInstance(CONFIG.getStreamApiKey);

const GroupChatScreen = ({navigation, route}) => {
  const {id, title} = route.params;

  const channel = client.channel('team', id, {
    name: title,
  });

  useEffect(()=>{
    return ()=>channel._disconnect();
  })

  return (
    <GestureHandlerRootView>
      <OverlayProvider>
        <Chat client={client}>
          <Channel channel={channel}>
            <MessageList />
            <MessageInput />
          </Channel>
        </Chat>
      </OverlayProvider>
    </GestureHandlerRootView>
  )
}

export default GroupChatScreen;