import { View, Text, FlatList, StyleSheet , Dimensions, TouchableOpacity,Image} from 'react-native'
import React, { memo, useEffect, useRef, useState } from 'react'
import { useftech } from '../Hooks/fetchURL'
import Colors from '../colors/Colors'
import { ActivityIndicator } from 'react-native-paper'

const {height,width} = Dimensions.get("window")
const Movies = ({genreId,navigation,setMount}) => {
  const page = Math.round(Math.random()*5)
    const moviesUrl = "https://api.themoviedb.org/3/discover/movie?api_key=8aacf88529975a0ccb507d6611700ec2&with_genres="+genreId+"&page="+page
    const imageUrl = "https://image.tmdb.org/t/p/w500"
  const {data , isSuccess , isloading} = useftech(moviesUrl,"results",genreId)
  const [viewedItemRef, setViewed] = useState()
   const onViewableItemsChanged = async({viewableItems, changed}) => {
    try {
        await setViewed(viewableItems[1].item.id)
    } catch (error) { 
      console.log(error)
      }
    };  
   
  return isloading?(
    <View style={{flex:1 ,justifyContent :"center" ,alignItems :"center"}}>
    </View>
  ):isSuccess?(
    <View >
        <FlatList data={data}
        renderItem={({item})=>(<TouchableOpacity onPress={()=>navigation.navigate("itemMovie",{posterUri:imageUrl+item.poster_path,backDropUri :imageUrl+item.backdrop_path,title : item.original_title,description:item.overview})} style={viewedItemRef===item.id?styles.activeMovieStyle:styles.movieStyle}><Image source={{uri:imageUrl+item.poster_path}} style={styles.imageStyle} resizeMode="stretch"></Image></TouchableOpacity>)}
        horizontal  
        keyExtractor={(item)=>(item.id)}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{itemVisiblePercentThreshold:3}}
        showsHorizontalScrollIndicator ={false}>



        </FlatList>
    </View>

  ):(
    <View style={{flex:1 ,justifyContent :"center" ,alignItems :"center"}}>
    
    </View>
  )
}

const styles = StyleSheet.create({
  movieStyle : {
    width: width * 0.4, 
    height: height * 0.3,
   marginVertical : 22,
   marginHorizontal : 12,
   borderRadius : 45,
   elevation : 10, 
   backgroundColor : Colors.tagsColor
   
  },
imageStyle : {
   flex :1,
   borderRadius : 45,
   padding : 12
},
activeMovieStyle : {
    width: width * 0.6, 
    height: height * 0.4,
   marginVertical : 22,
   marginHorizontal : 12,
   borderRadius : 45,
   elevation : 10, 
   backgroundColor : Colors.tagsColor
  },


})
export default memo(Movies)