import { View, Text , StyleSheet , Dimensions , FlatList  , TouchableOpacity} from 'react-native'
import React, { useCallback, useEffect, useState ,memo} from 'react'
import Colors from '../colors/Colors';
import { fetchURl, useftech } from '../Hooks/fetchURL';
import { ActivityIndicator } from 'react-native';


const {width, height} = Dimensions.get("screen")
const GenreItem = ({clicked,setClicked}) => {
    const genresURl ="https://api.themoviedb.org/3/genre/movie/list?api_key=8aacf88529975a0ccb507d6611700ec2"
    const {data ,isSuccess ,isloading} = useftech(genresURl,"genres")
  const handleCLick = useCallback((id)=>{ setClicked(id)})


  if(isloading){return (
    <View style={{flex:1 ,justifyContent :"center" ,alignItems :"center"}}>
     <ActivityIndicator size ="2000" color={Colors.secondColor} />
    </View>
  )}


if(isSuccess){  return (
    <View>
    <FlatList
    data={data}
    horizontal = {true}
    renderItem={({item})=>(<TouchableOpacity activeOpacity={0.7} style={clicked === item.id? styles.activeGenres:styles.genresStyle} onPress={()=>(handleCLick(item.id))}><Text style={clicked ===item.id ? styles.activeTextGenre:styles.textgenres} >{item.name}</Text></TouchableOpacity>)}
    keyExtractor={item => item.id}
    extraData={clicked}
    removeClippedSubviews ={true}
    initialNumToRender={10} 
    maxToRenderPerBatch={5}
    showsHorizontalScrollIndicator ={false}
    ></FlatList>
    </View>
  )}
  if(!isSuccess){return (
    <View style={{flex:1 ,justifyContent :"center" ,alignItems :"center"}}>
      <Text style={{fontSize :33 , fontWeight :"900" , color :"#fff"}}>
        NO INTERNET.
      </Text>
    </View>
  )}
}
const styles = StyleSheet.create({
    genresStyle : {
        flex : 1,
       width : 0.32*width,
       height : 0.05*height,
       marginHorizontal : 4,
       borderWidth: 2,
       borderRadius : 20,
       borderColor : Colors.secondary,
       color :Colors.tagsColor,
       justifyContent: "center",
       margin : 10
      },
      textgenres :{
    fontSize : 16,
    fontWeight : "500",
    alignSelf : "center",
    color : Colors.secondColor
      },
      activeGenres:{
        flex : 1,
        width : 0.35*width,
        height : 0.05*height,
        marginHorizontal : 4,
        borderWidth: 2,
        borderRadius : 20,
        borderColor : Colors.secondary,
        justifyContent: "center",
        backgroundColor : Colors.secondColor,
        elevation : 7,
        margin : 10

      },
      activeTextGenre :{
        fontSize : 16,
        fontWeight : "500",
        alignSelf : "center",
        color : Colors.primaryColor
      }


})

export default memo(GenreItem) 