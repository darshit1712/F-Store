import React from 'react'
import { StyleSheet, Text, View ,Image,ImageBackground,TouchableOpacity} from 'react-native'

const Card = ({like,title,date,description,onPress,image,place}) => {
    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <ImageBackground style={{width:"100%",height:200,resizeMode:'cover',}} source={{uri:image}}  blurRadius={5}>
                  <View style={{flex:1}}>
                      {like===true? <TouchableOpacity style={{alignSelf:'flex-end'}} onPress={onPress}>
                        <Image style={{width:30,height:30,margin:10 }} source={require('../Image/like-black.png')}/> 
                        </TouchableOpacity>:
                        <TouchableOpacity style={{flex:1,alignItems:'flex-end'}} onPress={onPress}>
                        <Image style={{width:30,height:30,margin:10 }} source={require('../Image/like.png')}/>
                        </TouchableOpacity>
                      }
                      
                      <View style={{flex:1,flexDirection:'row',justifyContent:'space-between',alignItems:'flex-end'}}>
                       <Text style={{color:'#fff',fontSize:24,marginLeft:10,fontWeight:'bold',}}>{title}</Text>
                       <Text style={{color:'#fff',fontSize:16,marginRight:10,fontWeight:'500'}}>{date}</Text>
                      </View>
                  </View>
                </ImageBackground>
                <View >
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <Text style={{color:'#000',fontSize:22,marginLeft:10,fontWeight:'bold'}}>Place :-</Text>
                        <Text style={{color:'#000',fontSize:18,marginLeft:5,fontWeight:'300'}}>{place}</Text>
                     </View>
                 <Text style={{color:'#000',fontSize:22,marginLeft:10,fontWeight:'bold'}}>Description</Text>
                 <Text style={{color:'#000',fontSize:18,marginLeft:10,fontWeight:'300'}} >
                    {description}
                 </Text>
                </View>
            </View>
        </View>
    )
}

export default Card

const styles = StyleSheet.create({
    container:{
       flex:1,
    },
    card:{
        backgroundColor:"#fff",
        marginBottom:10,
        marginHorizontal:'2%',
        shadowOpacity:0.2,
        shadowColor:'#000',
        shadowOffset:{
            width:0,
            height: 1,
        },
    }
})
