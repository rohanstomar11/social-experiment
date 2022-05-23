import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'

const PdfListScreen = ({navigation}) => {

  const data = [
    {
      url: 'https://assets.thecareerlabs.com/pdf/CLIPP-Plus-FullCurriculum.pdf',
      title: 'Clipp Plus',
    },
    {
      url: 'https://thecareerlabs.com/wp-content/uploads/2021/08/GMAT-Quant_-Sample-Questions-Solutions.pdf',
      title: 'GMAT Sample - 1',
    },
    {
      url: 'https://thecareerlabs.com/wp-content/uploads/2022/01/GMAT-Quant-meanmedian-and-mode-solutions-Junaid.docx-1.pdf',
      title: 'GMAT Sample - 2',
    },
    {
      url: 'https://assets.thecareerlabs.com/pdf/Terms&Conditions-CareerLabsCurriculum.pdf',
      title: 'Terms & Conditions',
    },
  ]

  return (
  <ScrollView
    contentContainerStyle={{
      alignItems: 'center',
    }}
  >
    <View style={{
      width: '100%',
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
      <TouchableOpacity
          activeOpacity={0.6}
          onPress={()=>{navigation.goBack()}}
          style={{height: '100%', justifyContent: 'center', marginLeft: 15}}
      >
          <AntDesign
              name={'arrowleft'}
              color={'#3036D6'}
              size={25}
          />
      </TouchableOpacity>
      <View
          style={{
              flex: 1,
              justifyContent: 'center',
              marginLeft: 15,
              marginRight: 15,
              alignItems: 'center'
          }}>
          <Text
              style={{
                  fontSize: 25,
                  color: '#3036D6',
              }}>
              PDF List
          </Text>
      </View>
      <TouchableOpacity
          activeOpacity={0.6}
          onPress={()=>{}}
          style={{
              height: '100%',
              justifyContent: 'center', 
              marginRight: 15
          }}>
          <AntDesign
              name={'arrowright'}
              color={'#3036D6'}
              size={25}
          />
      </TouchableOpacity>
    </View>
    {data.map((item, index)=>{
      return (
      <TouchableOpacity 
        activeOpacity={0.75}
        onPress={()=>{ navigation.navigate('PdfScreen', {data: item}) }}
        style={{
          backgroundColor: '#3036D6', 
          width: '80%', 
          alignItems: 'center', 
          justifyContent: 'center', 
          marginVertical:12, 
          paddingVertical: 10, 
          borderRadius: 12
        }}
        key={index}>
        <Text
          style={{
            fontSize: 20,
            color: '#F0FEFE',
            fontWeight: '600'
          }}>
          {item.title}
        </Text>
      </TouchableOpacity>)
    })
    }
    </ScrollView>
  )
}

export default PdfListScreen