import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Tabs from './Tabs';
import ItemSearch from './Screens/ItemSearch';
import ItemMovie from './Screens/ItemMovie';
import { useEffect ,createContext, useState } from 'react';
import { createTable } from './database/Db';

export const navContext =createContext()

export default function App() {
  const stack = createStackNavigator()
  const [mount , setMount] = useState(false)
  useEffect(()=>{
     createTable()
  }

  ,[])
  return (
    <navContext.Provider value={{mount,setMount}}>
    <NavigationContainer>
     <stack.Navigator>
     <stack.Screen name='tabs' component={Tabs} options={{headerShown :false}} ></stack.Screen>
      <stack.Screen name='ItemSearch' component={ItemSearch} options={{headerShown : false}} ></stack.Screen>
      <stack.Screen name='itemMovie' component={ItemMovie} options={{headerShown : false}}></stack.Screen>
     </stack.Navigator>
    </NavigationContainer>
    </navContext.Provider>
  );
}


