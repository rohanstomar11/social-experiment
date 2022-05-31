import {
  TouchableOpacity,
  View,
  StyleSheet,
  Platform,
  ImageBackground,
} from 'react-native';
import React from 'react';
import {COLORS} from '../assets/color'
import MyAppText from './MyAppText';
import {FONTS} from '../assets/fontFamily';

const CustomCard = ({navigation, data, userId}) => {

  return (
    <TouchableOpacity 
      activeOpacity={0.75}
      onPress={()=>{navigation.navigate('GroupScreen', {id: data.id, userId: userId})}}
      style={styles.container}>
      <ImageBackground
        style={styles.image}
        source={{uri:data.avatarUrl}}>
          <View
            style={styles.title}>
            <MyAppText
              family={FONTS.Bold}
              textColor={COLORS.text}>
              {data.title}
            </MyAppText>
          </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container:{
    height: 300,
    width: 240,
    margin: 10,
    borderRadius: 20,
    overflow: 'hidden',
    ...Platform.select({
      android: {
        elevation: 25,
        shadowColor: COLORS.shadowColor,
      },
      ios: {
        shadowRadius: 24,
        shadowOpacity: 1,
        shadowColor: COLORS.shadowColor,
        shadowOffset: { width: 0, height: 16 },
      }
    })
  },
  image: {
    flex:1,
    justifyContent:'flex-end',
    alignItems: 'center',
    paddingBottom: 12,
  },
  title: {
    backgroundColor: COLORS.background,
    width: '90%',
    alignItems: 'center',
    borderRadius: 15,
    paddingVertical: 5,
  },
});

export default CustomCard;