import { View, Text, Image, TouchableOpacity, Linking} from 'react-native'
import React from 'react'

const CustomBanner = ({data}) => {
  return (
    <TouchableOpacity activeOpacity={0.75} style={{width:'100%', backgroundColor:'#CBC3E3', borderRadius: 12, alignItems: 'center', elevation:2}} onPress={()=>{Linking.openURL(data[0].settings.properties.url)}}>
        <Text style={{fontSize:20, color: '#354354', fontWeight: '700', marginTop:10, textDecorationLine:'underline'}}>
          {data[0].title}
        </Text>
        <View style={{flexDirection: 'row', width:'100%', padding: '5%', justifyContent:'space-between'}}>
            <View style={{flex:1, marginRight:'2%', justifyContent: 'center'}}>
                <Text style={{fontSize:16, color:'#354354'}}>
                    {data[0].description}
                </Text>
            </View>
            <Image 
                source={{uri: data[0].avatarUrl}} 
                style={{height:75, width:75, borderRadius: 12, borderColor:'#354354', borderWidth:1, padding:1}}/>
            </View>
    </TouchableOpacity>
  )
}

export default CustomBanner