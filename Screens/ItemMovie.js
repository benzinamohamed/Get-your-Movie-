import { ImageBackground, Text, View , StyleSheet , Dimensions, Image, SafeAreaView,Button, Pressable} from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import Colors from '../colors/Colors'
import Ionicons from '@expo/vector-icons/Ionicons';
import {  deleteFromDb, insertToDb, isThere } from '../database/Db';
import { navContext } from '../App';
const {height , width} = Dimensions.get("window")
const ItemMovie = ({route}) => {
  const [heartIsPressed,setPressed] = useState(false)
   const {posterUri,backDropUri,title,description} = route.params
   const {mount ,setMount} = useContext(navContext)
   const handleLike =useCallback(()=>{
    heartIsPressed?deleteFromDb(title,setMount):insertToDb(title,description,setMount)
    setPressed((prev)=>(!prev));
})
 useEffect(()=>{
isThere(title).then(req=>(req?setPressed(true):setPressed(false)))
 },[])
  return (
    <SafeAreaView style={{flex:1,backgroundColor : Colors.primaryColor,}}>
      <View style={{flex :0.30,}}>
  <ImageBackground style={styles.background} source={{uri :backDropUri }} blurRadius={1.5} resizeMode="cover" >
  </ImageBackground>
 <View style={styles.movieContainer}>
   <Image source={{uri :posterUri}} style={styles.imageStyle} resizeMode="stretch"></Image>
   <View style={styles.textContainer}>
   <Text style={styles.titleStyle}>{title}</Text>
   </View>
  </View>
  </View>
  <View style={styles.overviewContainer}>
  <Text style={styles.overviewStyle}>“{description}”</Text>
  </View>
  <Pressable onPress={handleLike} style={{alignSelf:"center",marginBottom:22,marginTop:16,flexShrink:1}}><Ionicons name='heart' size={90} color={heartIsPressed?Colors.tagsColor:Colors.bordercolor}></Ionicons></Pressable>
  </SafeAreaView>
  )
}
const styles = StyleSheet.create({
    background : {
     flex : 1,
    },
    movieContainer:{
      flex:1,
      flexDirection :"row",
      position :"absolute",
      bottom : -120,
    },
    imageStyle : {
        width: width * 0.3, 
        height: height * 0.20,
       borderTopLeftRadius : 12,
       borderTopRightRadius : 12,
       borderBottomLeftRadius : 12,
       borderBottomRightRadius : 12,
       padding : 12,
       margin : 12,
      
     },
     titleStyle : {
        flex : 1,
      fontSize : 26,
      color :"#fff",
     fontWeight : "900",
     padding :6,
     },
     textContainer :{
alignContent :"center",
flex :1,
position :"relative",
bottom :-80
     },
     overviewStyle:{
      color:"#fff",
      margin:12,
      fontWeight:"700",
      fontSize:12,
      bottom:-182
     },
     overviewContainer:{
      flex :1,
      margin:22
     }
    
    })
export default ItemMovie

