import {Platform, TextInput } from 'react-native';
import React from 'react';

export default function CustomInputField({
  height,
  width,
  background,
  radius,
  keyboard,
  onchange,
  placeholder,
  hide,
  top,
  }) {
  return (
    <TextInput
        style={{
            height: height || 56,
            width: width || '85%',
            backgroundColor: background || '#FFFFFF',
            borderRadius: radius || 8,
            paddingHorizontal: '5%',
            color: '#354354',
            borderWidth: 1,
            borderColor: '#2D6CDF',
            fontSize: 16,
            marginTop: top || 0,
            ...Platform.select({
              android: {
                elevation: 24,
                shadowColor: 'rgba(146, 170, 212, 0.12)',
              },
              ios: {
                shadowRadius: 24,
                shadowOpacity: 1,
                shadowColor: 'rgba(146, 170, 212, 0.12)',
                shadowOffset: {width: 0, height: 16},
              }
            })
          }}
        selectionColor={'#2D6CDF'}
        keyboardType={keyboard}
        onChangeText={onchange}
        placeholder={placeholder}
        secureTextEntry={hide}
    />
  );
}