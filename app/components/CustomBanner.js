import {
  View,
  Image,
  Linking,
  StyleSheet,
  Platform,
} from 'react-native';
import React from 'react';
import {COLORS} from '../assets/color';
import CustomButton from './CustomButton';
import MyAppText from '../components/MyAppText';
import {FONTS} from '../assets/fontFamily';

const CustomBanner = ({data}) => {
  return (
    <View
      style={styles.container}>
      <MyAppText
        textColor={COLORS.white}
        family={FONTS.Bold}
        textSize={20}>
        {data[0].title}
      </MyAppText>
      <View
        style={styles.rowContainer}>
        <Image
          source={{uri: data[0].avatarUrl}}
          style={styles.image}/>
        <View
          style={{
            width: '75%'
          }}>
          <MyAppText
            textColor={COLORS.white}
            marginLeft={16}
            textSize={14}>
            {data[0].description}
          </MyAppText>
        </View>
      </View>
      <CustomButton
        title={"Know More"}
        style={styles.button}
        onPress={()=>{Linking.openURL(data[0].settings.properties.url)}}
        />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: COLORS.black,
    borderRadius: 20,
    paddingTop: 10,
    ...Platform.select({
      android: {
        elevation: 24,
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
  rowContainer: {
    alignItems: 'center',
    width: '100%',
    marginTop: 5,
    flexDirection: 'row',
    padding: 5,
  },
  image: {
    height: '100%',
    width: '19%',
    borderRadius: 8,
    borderWidth :1,
    borderColor: COLORS.background,
    marginLeft: 10,
  },
  button: {
    width: '90%',
    marginTop: 15,
    marginBottom: 20,
  },
});

export default CustomBanner;