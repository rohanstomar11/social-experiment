import {
  View, 
  Text,
  Image,
  TouchableOpacity,
  Linking,
  StyleSheet,
} from 'react-native';
import React from 'react';

const CustomBanner = ({data}) => {
  return (
    <TouchableOpacity 
      activeOpacity={0.75}
      style={styles.touch}
      onPress={()=>{Linking.openURL(data[0].settings.properties.url)}}
      >
      <Text
        style={styles.title}>
        {data[0].title}
      </Text>
      <View
        style={styles.container}>
        <View
          style={styles.textContainer}>
          <Text
            style={styles.text}>
            {data[0].description}
          </Text>
        </View>
        <Image 
          source={{uri: data[0].avatarUrl}} 
          style={styles.image}/>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touch: {
    width:'100%',
    backgroundColor:'#CBC3E3',
    borderRadius: 12,
    alignItems: 'center',
    elevation:2,
  },
  title: {
    fontSize:20,
    color: '#354354',
    fontWeight: '700',
    marginTop:10,
    textDecorationLine:'underline',
  },
  container: {
    flexDirection: 'row',
    width:'100%',
    padding: '5%',
    justifyContent:'space-between',
  },
  textContainer: {
    flex:1,
    marginRight:'2%',
    justifyContent: 'center',
  },
  text: {
    fontSize:16,
    color:'#354354',
  },
  image: {
    height:75,
    width:75,
    borderRadius: 12,
    borderColor:'#354354',
    borderWidth:1,
    padding:1,
  },
});

export default CustomBanner;