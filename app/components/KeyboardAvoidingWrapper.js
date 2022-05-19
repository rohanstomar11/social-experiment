import React from 'react';
import {
    KeyboardAvoidingView,
    ScrollView,
    TouchableWithoutFeedback,
    Keyboard,
    Platform
} from 'react-native';

const KeyboardAvoidingWrapper = ({ children, style }) => {
    return (
        <KeyboardAvoidingView
            style={{ flex: 1, }}
        >
            <ScrollView
                contentContainerStyle= { style || {
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingTop: "20%"
                }}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    {children}
                </TouchableWithoutFeedback>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default KeyboardAvoidingWrapper;