import { View, Text, FlatList, TouchableOpacity, StyleSheet , Dimensions , Image,  } from 'react-native'
import React, { useState } from 'react'
import { useftech } from '../Hooks/fetchURL'
const  {height,width} = Dimensions.get("window")
import Colors from '../colors/Colors'
const ItemSearch = ({navigation,route}) => {
    const {text} = route.params
    const searchURl ="https://api.themoviedb.org/3/search/movie?api_key=8aacf88529975a0ccb507d6611700ec2&query="+text
    const imageUrl = "https://image.tmdb.org/t/p/w500"
    const {data ,isSuccess , isLoading} = useftech(searchURl,"results")
  return (
        
    <View style={{flex :1,backgroundColor:Colors.primaryColor}}>
        <FlatList 
        ListHeaderComponent={<Text style = {styles.textstyle}>You searched about :{text}</Text>}
        data={data}
        renderItem={({item})=>(<TouchableOpacity onPress={()=>(navigation.navigate("itemMovie",{posterUri:imageUrl+item.poster_path,backDropUri :imageUrl+item.backdrop_path,title : item.original_title,description:item.overview}))} style={styles.movieStyle}><Image source={{uri:imageUrl+item.poster_path}} style={styles.imageStyle} resizeMode="stretch"></Image><Text style ={styles.title}>{item.original_title}</Text></TouchableOpacity>)}
        keyExtractor={(item)=>(item.id)}
        numColumns={2}
        >

        </FlatList>
    </View>
  )
}
const styles = StyleSheet.create({
    movieStyle : {
        flex :1,
       marginVertical : 22,
       marginHorizontal : 18,
       borderRadius : 45,
       elevation : 10, 
       backgroundColor : Colors.secondColor,
       alignItems :"center",
      },
    imageStyle : {
        width: width * 0.4, 
        height: height * 0.27,
       borderTopLeftRadius : 45,
       borderTopRightRadius : 45,
       borderBottomLeftRadius : 12,
       borderBottomRightRadius : 12,
     },
       textstyle :{
        padding : 16,
        margin : 16,  
        fontSize : 36,
        fontWeight :"600",
        color : Colors.secondColor
      },
      title :{
        alignSelf : "center",
        fontWeight :"900",
        fontSize : 12,
        paddingVertical : 10,
        paddingHorizontal : 15
         
       }
})

export default ItemSearch