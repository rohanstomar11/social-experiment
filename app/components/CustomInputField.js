import {
  Platform,
  TextInput,
  View,
  StyleSheet,
} from 'react-native';
import React, {useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {COLORS} from '../assets/color';
import MyAppText from './MyAppText';
import {FONTS} from '../assets/fontFamily';

const CustomInputField = ({
  header,
  errorText = '',
  formText,
  autoFocus = false,
  keyboard,
  onchange,
  placeholder,
  hide,
  iconType,
  multiline,
  maxLength,
  autoCapitalize,
  returnKeyType,
  noBottomMargin = false,
}) => {
  return (
    <View style={{
      width: 'auto',
      flexDirection: 'column',
    }}>
      {/* upperText */}
      <MyAppText
        family={FONTS.Medium}
        marginLeft={7}
        textSize={15}
        textColor={errorText !== '' ? COLORS.error : COLORS.primary}>
        {header}
      </MyAppText> 

      {/* InputForm */}


      <View
        style={[
          styles.inputContainer,
          styles.shadowProp,
          {borderColor: errorText !== '' ? COLORS.error : COLORS.primary},
        ]}>
        {/* Show Icon when required by a particular field in any page */}

        <View style={{padding: 10}}>
          <AntDesign
            name={iconType || "user"}
            size={25}
            color={COLORS.primary}
          />
        </View>

        <TextInput
          placeholder={placeholder}
          value={formText}
          autoFocus={autoFocus}
          keyboardType={keyboard || 'default'}
          maxLength={maxLength || 100}
          returnKeyType={returnKeyType || 'done'}
          style={styles.input}
          onChangeText={onchange}
          secureTextEntry={hide}
          multiline={multiline}
          autoCapitalize={autoCapitalize}
        />
      </View>

      {/* Error Text, will only show up when there is an error */}
      {errorText !== '' && (
        <View style={{marginTop: 2}}>
          <MyAppText
            textSize={11.5}
            family={FONTS.Regular}
            textColor={COLORS.error}>
            {errorText}
          </MyAppText>
        </View>
      )}

      {noBottomMargin === false && <View style={{marginBottom: 20}} />}
      
    {/* <View
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
            shadowColor: COLORS.shadowColor,
          },
          ios: {
            shadowRadius: 24,
            shadowOpacity: 1,
            shadowColor: COLORS.shadowColor,
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
    </View> */}
    </View>
  );
};

// const styles = StyleSheet.create({
//   iconStyle: {
//     padding: 10,
//     height: '100%',
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRightColor: COLORS.primary,
//     borderRightWidth: 1,
//     width: 50,
//   },
//   input: {
//     padding: 10,
//     flex: 1,
//     fontSize: 16,
//     color: COLORS.text,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });
const styles = StyleSheet.create({
  inputContainer: {
    borderWidth: 0.5,
    flexDirection: 'row',
    width: '90%',
    alignItems: 'center',
    padding: 5,
    paddingVertical: 0,
    marginTop: 5,
    borderRadius: 8,
  },
  input: {
    flex: 1,
    fontSize: 14,
    height: 60,
    fontFamily: FONTS.Bold,
  },
  shadowProp: {
    backgroundColor: COLORS.white,
    ...Platform.select({
      android: {
        elevation: 15,
        shadowOpacity: 1,
        shadowColor: COLORS.grey,
      },
      ios: {
        shadowColor: COLORS.grey,
        shadowOffset: {width: 0, height: 5},
        shadowOpacity: 0.8,
        shadowRadius: 12,
      },
    }),
  },
});


export default CustomInputField;