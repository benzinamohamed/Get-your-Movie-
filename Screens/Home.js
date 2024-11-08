import { View, Text , StyleSheet, SafeAreaView, Pressable, Touchable, TouchableOpacity, Dimensions, FlatList} from 'react-native'
import { useContext, useState } from 'react';
import Colors from '../colors/Colors';
import GenreItem from '../component/GenreItem';
import Movies from '../component/movies';
import Ionicons from '@expo/vector-icons/Ionicons';
import Search from '../component/Search';
const {width, height} = Dimensions.get("screen")
const Home = ({navigation}) => {
  const [clicked , setClicked] = useState(28)
  return (
    <SafeAreaView style ={styles.container}>
      <View style = {styles.settings}>
       
      </View>
        <View  > 
      <Text style = {styles.textstyle}>Get your movie today!</Text>
    </View>
    <Search navigation={navigation} ></Search>
   <GenreItem clicked={clicked} setClicked={setClicked}></GenreItem>
   <Movies navigation={navigation} genreId={clicked}  ></Movies>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container :{
    flex : 1,
    backgroundColor : Colors.primaryColor
  },
  textstyle :{
    padding : 16,
    margin : 16,  
    fontSize : 36,
    fontWeight :"600",
    color : Colors.secondColor
  },
  settings :{
    marginTop : 56,
    marginHorizontal : 30,
    alignSelf :"flex-end"
  },
  input :{
    width : width*0.9,
    height : height*0.075,
    marginHorizontal : 10,
    borderBottomColor : Colors.secondary,
    borderBottomWidth : 2.9,
    fontSize :20
  },
  

  
})

export default Home

