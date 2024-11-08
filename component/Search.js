import { StyleSheet, Text, View } from 'react-native'
import { Input } from '@rneui/base';
import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useEffect, useState } from 'react'
import Colors from '../colors/Colors';

const Search = ({navigation ,setMount}) => {
    const [value, setVlaue] = useState("")
  
  return (
    <View  >
    <Input
      placeholder="Search"
      style ={styles.input}
      inputContainerStyle ={styles.input}
      leftIcon={<Ionicons name="search" size={20} color="#888"/>}
      defaultValue={value}
      onChangeText={text=>(setVlaue(text))}
      onEndEditing={()=>{value?navigation.navigate("ItemSearch",{text : value}):null}}
      />
    </View>
  )
}

export default Search

const styles = StyleSheet.create({
  input :{
    color : Colors.secondColor
  }
})