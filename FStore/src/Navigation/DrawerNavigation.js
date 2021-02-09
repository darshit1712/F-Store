import * as React from 'react';
import {View ,SafeAreaView,ScrollView,Image,TouchableOpacity,Text} from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../Screen/HomeScreen'
import ProfileScreen from '../Screen/ProfileScreen';
import EventScreen from '../Screen/EventScreen';
import FavoriteScreen from '../Screen/FavoriteScreen'
import EditeProfileScreen from '../Screen/EditeProfileScreen';
import EditEventScreen from '../Screen/EditEventScreen'

function CustomeDrawerContent(props) {
    return(
      <SafeAreaView style={{flex:1,justifyContent:'space-around'}}>

          <View style={{flex:2,alignItems:'center',justifyContent:'center',marginVertical:25}}>
            <Image source={require('../Image/profile.png')} style={{width:120,height:120 ,resizeMode:'contain'}} />
            <TouchableOpacity onPress={()=>props.navigation.navigate('EditeProfile')} >
              <Text style={{color:'#1abc9c',marginTop:5}}>Edit profile</Text>
             </TouchableOpacity>
          </View>
          <View style={{flex:4,marginLeft:'3%'}}>
            <TouchableOpacity  style={{marginBottom:'5%'}} onPress={()=>props.navigation.navigate('Home')}>
                <Text style={{fontSize:24}}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{marginBottom:'5%'}} onPress={()=>props.navigation.navigate('Favorit')}>
                <Text  style={{fontSize:24}}>Favorite</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{marginBottom:'5%'}} onPress={()=>props.navigation.navigate('Event')}>
                <Text  style={{fontSize:24}}>Event</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{marginBottom:'5%'}} onPress={()=>props.navigation.navigate('Editevent')}>
                <Text  style={{fontSize:24}}>EditeEvent</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{marginBottom:'5%'}} onPress={()=>props.navigation.navigate('Profile')}>
                <Text  style={{fontSize:24}}>Profile</Text>
            </TouchableOpacity>
          </View>
          <View style={{flex:1,alignSelf:'center',justifyContent:'flex-end',alignItems:'center'}}>
           <TouchableOpacity onPress={()=>props.navigation.navigate('SignIn')}>
             <Text style={{backgroundColor:'#16a085',paddingHorizontal:50,paddingVertical:10,color:'#fff',fontWeight:'bold'}}>
               LogOut
             </Text>
           </TouchableOpacity>
          </View>
      </SafeAreaView>
    )
    
  }


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
      <Stack.Screen name="Favorit" component={FavoriteScreen} options={{headerShown:false}}/>
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

function TabNavigation() {
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
          activeTintColor: '#16a085',
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
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function DrawerNavigation({navigation}) {
  return (
    <Drawer.Navigator initialRouteName="MenuTab" drawerContent={props=>CustomeDrawerContent(props)}>
     <Drawer.Screen name="MenuTab" component={TabNavigation} />
     <Drawer.Screen name="EditeProfile" component={EditeProfileScreen} />
     <Drawer.Screen name="Editevent" component={EditEventScreen} />
   </Drawer.Navigator>
  );
}