import {Text, TouchableOpacity} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS} from '../assets/color';

const CustomButton = ({
  colors, 
  style, 
  activeopacity, 
  onPress, 
  textcolor, 
  fontsize, 
  fontweight, 
  title,
  radius,
  letterSpacing,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={activeopacity || 0.65}
      onPress={onPress}
      style={style}>
      <LinearGradient
        colors={colors || ['#2D6CDF', '#6757D8']}
        start={{x:0, y:0}}
        end={{x:1, y:0}}
        style={{
          width: '100%',
          padding: 13,
          alignItems: 'center',
          borderRadius: radius || 12,
        }}>
        <Text style={{
          color: textcolor || COLORS.white,
          fontSize: fontsize || 16,
          fontWeight: fontweight || '700',
          letterSpacing: letterSpacing || 3,
        }}>
          {title}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default CustomButton;