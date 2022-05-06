import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import CustomInputField from '../components/CustomInputField'
import CustomButton from '../components/CustomButton'
import { COLORS } from '../assets/color'

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('')
  return (
    <View style={{
      flex: 1,
      justifyContent: 'space-around',
      alignItems: 'center',
      backgroundColor: COLORS.black,
    }}>
      <View>
        <Text
          style={{ fontSize: 25, fontWeight: 'bold', color: COLORS.black,}}
        >
          LoginScreen
        </Text>
      </View>
      <View style={{width: '100%', alignItems: 'center'}}>
        <CustomInputField placeholder={"Email"} />
        <CustomInputField placeholder={"Password"} top={20} hide={true} />
        {/* <TouchableOpacity 
        onPress={()=>{navigation.navigate('SignupScreen')}}>
        <Text>LoginScreen</Text>
      </TouchableOpacity> */}
        <CustomButton
          title={'LogIn'}
          onPress={() => { navigation.navigate('SignupScreen') }}
          style={{ width: '85%', marginTop: 20, }}
          fontsize={20}
        />
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Text>Are you new here?</Text>
        <Text>SignUp</Text>
      </View>
    </View>
  )
}

export default LoginScreen;