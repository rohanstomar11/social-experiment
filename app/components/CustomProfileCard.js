import { 
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React from 'react';
import {DefaultUser} from '../assets/images/index';
import {COLORS} from '../assets/color';

const CustomProfileCard = ({data, navigation, userId}) => {

  if(data.userId===userId){
    return null;
  }

  const url = data.avatarUrl===''? DefaultUser:{uri: data.avatarUrl};

  const userProfile = () => {
    navigation.navigate('UserScreen', {userId: userId,data: data});
  }
  
  return (
    <TouchableOpacity
      onPress={()=>{userProfile()}}
      activeOpacity={0.75}
      style={styles.container}>
      <Image
        source={url}
        style={styles.image}/>
      <Text
        style={styles.name}>
          {data.displayName}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cardBg,
    marginTop: 20,
    borderWidth: 1,
    borderRadius: 12,
    padding: 10,
    borderColor: COLORS.primary,
  },
  image: {
    width:50, 
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  name: {
    marginLeft: 15,
    color: COLORS.text,
    fontSize: 20,
    fontWeight: '500',
  },
});

export default CustomProfileCard;