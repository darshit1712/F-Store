import * as React from 'react';
import { Text, View ,Image} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../Screen/HomeScreen';
import ProfileScreen from '../Screen/ProfileScreen';
import EditeProfileScreen from '../Screen/EditeProfileScreen';
import EditEventScreen from '../Screen/EditEventScreen'
import EventScreen from '../Screen/EventScreen';
import FavoriteScreen from '../Screen/FavoriteScreen';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack (){
    return(
      <Stack.Navigator initialRouteName='Home'>
      <Stack.Screen name="Home" component={HomeScreen} options={{headerShown:false}}/>
      </Stack.Navigator>
    )
  }
  function FavoriteStack (){
    return(
      <Stack.Navigator initialRouteName='FavoritS'>
      <Stack.Screen name="Favorite" component={FavoriteScreen} options={{headerShown:false}}/>
      </Stack.Navigator>
    )
  }
  function EventStack (){
    return(
      <Stack.Navigator initialRouteName='EventS'>
      <Stack.Screen name="Event" component={EventScreen} options={{headerShown:false}}/>
      <Stack.Screen name="EditEvent" component={EditEventScreen} options={{headerShown:false}}/>
      </Stack.Navigator>
    )
  }
  function ProfileStack (){
    return(
      <Stack.Navigator initialRouteName='ProfileS'>
      <Stack.Screen name="Profile" component={ProfileScreen} options={{headerShown:false}}/>
      <Stack.Screen name="EditeProfile" component={EditeProfileScreen} options={{headerShown:false}}/>
      </Stack.Navigator>
    )
  }

export default function TabNavigation() {
  return (
      <Tab.Navigator 
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused
                ? require('../Image/home-black.png')
                : require('../Image/home.png');
            } else if (route.name === 'Favorit') {
              iconName = focused 
              ? require('../Image/heart-black.png') 
              : require('../Image/heart.png');
            }else if (route.name === 'Event') {
              iconName = focused 
              ? require('../Image/event-black.png') 
              : require('../Image/event.png');
            }else if (route.name === 'Profile') {
              iconName = focused 
              ? require('../Image/user-black.png') 
              : require('../Image/user.png');
            }

            // You can return any component that you like here!
            return <Image source={iconName} style={{width:30,height:20 ,resizeMode:'contain'}} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Favorit" component={FavoriteStack} />
      <Tab.Screen name="Event" component={EventStack} />
      <Tab.Screen name="Profile" component={ProfileStack} />
    </Tab.Navigator>
   
  );
}