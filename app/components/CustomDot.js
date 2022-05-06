import { View } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'

const CustomDot = ({
    top,
    bottom,
    left,
    right,
    width,
    height,
    borderRadius,
}) => {
    return (
        <View style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            top: top,
            right: right,
            bottom: bottom,
            left: left,
        }}>
            <LinearGradient
                colors={['green', 'red']}
                style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: borderRadius ||150,
                    height: height || 200,
                    width: width || 200,
                }}
            >
            </LinearGradient>
        </View>
    )
}

export default CustomDot;