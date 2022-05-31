// This widget is used for CircularProgressBar/ActivityIndicator throughout the app
import React from 'react';
import {
    View,
    ActivityIndicator,
    Dimensions,
    Platform,
    Modal
} from 'react-native';
import {COLORS} from '../assets/color';
const {height, width} = Dimensions.get('screen');

const AppSpinner = ({color, bgColor}) => {
    return(
        <View 
        style={{
            width, 
            height,
            position:'absolute', 
            backgroundColor: bgColor || 'rgba(0,0,0,0.54)'
        }}>
            <Modal
                animationType='none'
                transparent={true}
                visible={true}>
                {/* Numerical size only works on Android, for iOS only large or small. Hence platform specific code */}
                <ActivityIndicator 
                    style={{flex: 1, alignSelf: 'center'}} 
                    color={color || COLORS.secondaryColor} 
                    size={Platform.OS === "ios" ? 'large' : 50} />
            </Modal>
        </View>
    );
}

export default AppSpinner;