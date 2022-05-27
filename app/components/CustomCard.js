import {
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
} from 'react-native';
import React from 'react';
import {COLORS} from '../assets/color'

const CustomCard = ({navigation, data, userId}) => {

  return (
    <TouchableOpacity 
        activeOpacity={0.75}
        onPress={()=>{navigation.navigate('GroupScreen', {id: data.id, userId: userId})}}
        style={styles.container}>
        <Image
            source={{uri: data.avatarUrl}}
            style={styles.image} />
        <Text style={styles.text}>
            {data.title}
        </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container:{
    backgroundColor: COLORS.cardBg,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginTop: 12,
    paddingBottom: 12,
    paddingTop: 12,
    height: 130,
    width: 130,
    elevation: 2,
  },
  image: {
    height: '75%',
    width: '70%',
    marginTop:5,
    backgroundColor: COLORS.background,
    borderRadius: 12,
  },
  text: {
    marginTop: 5,
    fontSize:16,
    fontWeight: '900',
    color: COLORS.text,
  },
});

export default CustomCard;