import {
  Platform,
  TextInput,
  View,
  StyleSheet,
} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {COLORS} from '../assets/color';

const CustomInputField = ({
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
  multiline,
  maxLength,
  autoCapitalize,
}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        height: height || 56,
        width: width || '90%',
        backgroundColor: background || COLORS.background,
        borderRadius: radius || 8,
        color: COLORS.grey,
        borderWidth: 1,
        borderColor: COLORS.primary,
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
      <View
        style={styles.iconStyle}>
        <AntDesign
          name={iconType || "user"}
          size={25}
          color={COLORS.primary} 
          />
      </View>
      <TextInput
        selectionColor={COLORS.primary}
        style={styles.input}
        keyboardType={keyboard}
        onChangeText={onchange}
        placeholder={placeholder}
        secureTextEntry={hide}
        multiline={multiline}
        maxLength={maxLength}
        autoCapitalize={autoCapitalize}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  iconStyle: {
    padding: 10,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRightColor: COLORS.primary,
    borderRightWidth: 1,
    width: 50,
  },
  input: {
    padding: 10,
    flex: 1,
    fontSize: 16,
    color: COLORS.text,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CustomInputField;