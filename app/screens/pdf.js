import { View, Text } from 'react-native'
import React from 'react'
import CustomPdf from '../components/CustomPdf'

const PdfScreen = ({navigation, route}) => {
    const {data} = route.params;
  return (
    <CustomPdf data={data} navigation={navigation} />
  )
}

export default PdfScreen