import {
  TouchableOpacity,
  View,
  StyleSheet,
  Platform,
  ImageBackground,
} from 'react-native';
import React, {useState} from 'react';
import {COLORS} from '../assets/color'
import MyAppText from './MyAppText';
import {FONTS} from '../assets/fontFamily';

const CustomCard = ({navigation, data, userId}) => {

  const [count, setCount] = useState(data.membersCount);
  const [title, setTitle] = useState(data.title.trim())

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
            <View
              style={{
                marginTop: 10,
                flexDirection: 'row',
                alignItems: 'center'
              }}>
              <MyAppText
                family={FONTS.Medium}
                textColor={COLORS.text}
                textSize={11}>
                TOTAL MEMBERS:
              </MyAppText>
              <MyAppText
                family={FONTS.Medium}
                textColor={COLORS.text}
                textSize={10}>
                {' '}{count}
              </MyAppText>
            </View>
            <View
              style={{
                marginTop: -5,
              }}>
              <MyAppText
                family={FONTS.Bold}
                textColor={COLORS.black}
                textSize={22}>
                {title} Club
              </MyAppText>
            </View>
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
    alignItems: 'flex-start',
    borderRadius: 18,
    paddingHorizontal: 20,
  },
});

export default CustomCard;