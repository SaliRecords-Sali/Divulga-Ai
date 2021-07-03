import React from 'react';
import { StatusBar} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Inicio from './src/screens/Inicio';
import Login from './src/screens/Login';
import Verifica from './src/screens/Verifica';
import Registre from './src/screens/Registre';




const Stack = createStackNavigator();

export default function App() {
      
  return ( 
    <>

    <StatusBar
      hidden={true}
      translucent
      barStyle="light-content"
    />
    <NavigationContainer> 
      
    <Stack.Navigator 
    screenOptions={{
    headerShown: false,
    }}>
      <Stack.Screen name="Verifica" component={Verifica} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Inicio" component={Inicio} />
      <Stack.Screen name="Registre" component={Registre} />
    </Stack.Navigator>
    
  </NavigationContainer>

  </>
  );
}
