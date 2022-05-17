import { Platform, TextInput, View, StyleSheet } from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';

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
  iconType,
}) {
  return (
    <View style={{
      flexDirection: 'row',
      alignItems: 'center',
      height: height || 56,
      width: width || '90%',
      backgroundColor: background || '#FFFFFF',
      borderRadius: radius || 8,
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
          shadowOffset: { width: 0, height: 16 },
        }
      })
    }}>
      <View style={styles.iconStyle}>
        <AntDesign name={iconType} size={25} color="#2D6CDF" />
      </View>
      <TextInput
        selectionColor={'#2D6CDF'}
        style={styles.input}
        keyboardType={keyboard}
        onChangeText={onchange}
        placeholder={placeholder}
        secureTextEntry={hide}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  iconStyle: {
    padding: 10,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRightColor: '#ccc',
    borderRightWidth: 1,
    width: 50,
  },
  input: {
    padding: 10,
    flex: 1,
    fontSize: 16,
    color: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
});