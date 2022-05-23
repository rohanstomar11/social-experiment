import { View, TouchableOpacity, Text, ScrollView } from 'react-native'
import React, {useState} from 'react'
import Pdf from 'react-native-pdf'
import AntDesign from 'react-native-vector-icons/AntDesign'

const CustomPdf = ({navigation, data}) => {

    const [current, setCurrent] = useState(0);
    const [total, setTotal] = useState(0)

  return (
    <View style={{flex:1,
        backgroundColor: '#F8FBFD', paddingBottom: 5}}>
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
                justifyContent: 'space-between',
                flexDirection: 'row',
                marginLeft: 15,
                marginRight: 15,
                alignItems: 'center'
            }}>
            <Text
                style={{
                    fontSize: 25,
                    color: '#3036D6',
                    fontWeight: '600'
                }}>
                {data.title}
            </Text>
            <View style={{borderRadius: 12, backgroundColor: '#3036D6', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 5, paddingVertical: 2}}>
                <Text
                    style={{
                        fontSize: 15,
                        color: '#F8FBFD',
                        fontWeight: '500'
                    }}>
                    {current}/{total}
                </Text>
            </View>
        </View>
        </View>
        <Pdf
          source={{uri: data.url}}
          trustAllCerts={false}
          onLoadComplete={(numberOfPages,filePath) => {
              setTotal(numberOfPages);
          }}
          onPageChanged={(page,numberOfPages) => {
              setCurrent(page);
          }}
          onError={(error) => {
              console.log(error);
          }}
          onPressLink={(uri) => {
              console.log(`Link pressed: ${uri}`);
          }}
          style={{
            flex:1,
            marginHorizontal: 5,
            backgroundColor: '#F8FBFD'
          }}
        />
      </View>
  )
}

export default CustomPdf