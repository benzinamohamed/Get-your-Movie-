import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import Colors from './colors/Colors';
import Home from './Screens/Home';
import Saved from './Screens/Saved';

const Tabs = () => {
    const tab = createBottomTabNavigator()

    return (
        <tab.Navigator screenOptions={{
            tabBarActiveTintColor: Colors.secondColor,
            tabBarInactiveTintColor: Colors.bordercolor,
            tabBarStyle: { backgroundColor: Colors.primaryColor, height: 55 },
            tabBarLabelStyle: { fontSize: 14,fontWeight :"900" },
            headerShown: false,
          }}
   >
  <tab.Screen name='home' component={Home} options={{tabBarIcon : ()=>(<Ionicons name="home" size={32} color={Colors.secondColor}/>)} } />
  <tab.Screen name='Saved' component={Saved} options={{tabBarIcon : ()=>(<Ionicons name="heart" size={32} color={Colors.secondColor}/>)}}/>
  
        </tab.Navigator>
  
    );
}

export default Tabs