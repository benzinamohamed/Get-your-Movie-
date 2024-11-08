import { View, Text, FlatList ,StyleSheet, SafeAreaView, Pressable, TouchableOpacity} from 'react-native'
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { deleteFromDb, getAllFromDb } from '../database/Db'
import Colors from '../colors/Colors'
import Ionicons from '@expo/vector-icons/Ionicons';
import { navContext } from '../App';

const Saved = () => {
  const [data,setData] = useState()
  const [expanded, setExpanded] =useState(null)
  const toggleItem = useCallback((itemId)=>{
   
      setExpanded(expanded === itemId ? null : itemId)
  
  })
  const {mount , setMount} = useContext(navContext)
 useEffect(()=>{
 const getData =  async()=>{
    try {
     await getAllFromDb().then(req=>(setData(req)))
    } catch (error) {   
    } }
    getData()
  },[mount])
  const handleDeletion = useCallback((title)=>{
   deleteFromDb(title,setMount)
  })
  return (
    <SafeAreaView style={styles.container}>
   <FlatList 
   data={data}
   renderItem={({item})=>(<TouchableOpacity onPress={()=>{toggleItem(item.id)}} style={styles.movies}><Text style={styles.text}>{item.title}</Text>{expanded === item.id &&(
    <View style={{flex :1}}> 
    <Text style={styles.itemContent}>
        {item.overview}
    </Text>
    <Pressable onPress={()=>handleDeletion(item.title)}> 
      <Ionicons name="trash" size={32} color={Colors.secondColor} style={{alignSelf:"center"} }/>
</Pressable>
  </View>
)}</TouchableOpacity>)}
   keyExtractor={(item)=>item.id}
   >
   </FlatList>
    </SafeAreaView>
  )
} 

const styles = StyleSheet.create({
  container :{
flex :1,
backgroundColor : Colors.primaryColor,
  },
  movies : {
    flex :1,
    borderWidth : 2,
    borderColor : Colors.secondColor,
    padding : 10 ,
    fontWeight : "bold",
    borderTopLeftRadius : 20,
    borderBottomRightRadius : 20 ,
    fontSize : 20,
    margin : 10 ,
    marginTop : 56,
},

text :{
color : "#fff"
},

itemContent: {
  marginTop: 10,
  fontSize: 14,
  color: "#fff",
},


})

export default Saved