import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignInScreen from './src/Screen/SignInScreen';
import SignUpScreen from './src/Screen/SignUpScreen';
import DrawerNavigation from './src/Navigation/DrawerNavigation';
import { Provider } from './src/context/FStoreContext';
import { Context } from './src/context/FStoreContext'

const Stack = createStackNavigator();

const App =()=> {
  const {gettoken,state} =React.useContext(Context);
  const [show,hide]=React.useState(true)
  React.useEffect(() => {
    gettoken()
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator>
      {state.email !==null ? 
      <Stack.Screen name="Drawer" component={DrawerNavigation} options={{headerShown:false}}/> :
       <Stack.Screen name="SignIn" component={SignInScreen} options={{headerShown:false}}/>}
        <Stack.Screen name="SignUp" component={SignUpScreen} options={{headerShown:false}}/>
        <Stack.Screen name="SignIn" component={SignInScreen} options={{headerShown:false}}/>
   
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default () => {
  return (
    <Provider>
      <App />
    </Provider>
  );
};
