import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  Platform,
  ImageBackground
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
        style={{
          flex:1,
          justifyContent:'flex-end',
          alignItems: 'center',
          paddingBottom: 12,
          }}
        source={{uri:data.avatarUrl}}>
          <View
            style={{
              backgroundColor: COLORS.cardBg,
              width: '90%',
              alignItems: 'center',
              borderRadius: 15,
              paddingVertical: 5,
              borderWidth:  1,
              borderColor: COLORS.primary
            }}>
            <MyAppText
              family={FONTS.SemiBold}
              textColor={COLORS.primary}>
              {data.title}
            </MyAppText>
          </View>
      </ImageBackground>
        {/* <Image
            source={{uri: data.avatarUrl}}
            style={styles.image} />
        <Text style={styles.text}>
            {data.title}
        </Text> */}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container:{
    height: 200,
    width: 200,
    marginHorizontal: 10,
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
  // container:{
  //   backgroundColor: COLORS.cardBg,
  //   borderRadius: 12,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   marginRight: 12,
  //   marginTop: 12,
  //   paddingBottom: 12,
  //   paddingTop: 12,
  //   height: 130,
  //   width: 130,
  //   borderWidth:1,
  //   borderLeftColor: COLORS.primary,
  //   borderTopColor: COLORS.primary,
  //   borderBottomColor: COLORS.secondary,
  //   borderRightColor: COLORS.secondary,
  //   elevation: 3,
  // },
  // image: {
  //   height: '75%',
  //   width: '70%',
  //   marginTop:5,
  //   backgroundColor: COLORS.background,
  //   borderRadius: 12,
  // },
  // text: {
  //   marginTop: 5,
  //   fontSize:16,
  //   fontWeight: '900',
  //   color: COLORS.text,
  // },
});

export default CustomCard;