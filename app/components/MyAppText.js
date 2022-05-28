import React from 'react';
import {View, Text} from 'react-native';
import {FONTS} from '../assets/fontFamily';

const MyAppText = (props) => {
  

  return (
    <View>
      {/* Styling as per the text size */}
      <Text
        suppressHighlighting={true} // iOS - this disables showing grey color on press
        style={{
          fontFamily: props.family || FONTS.Regular,
          color: props.textColor || 'black',
          fontSize: props.textSize || 16,
          textAlign: props.textAlign || 'left',
          marginLeft: props.marginLeft,
          textDecorationLine: props.underline,
          marginBottom: props.marginBottom,
        }}>
        {props.children}
      </Text>
    </View>
  );
};

export default MyAppText;
