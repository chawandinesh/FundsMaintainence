import React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import CashScreen from '../screens/CashScreen';
import AddDataScreen from '../screens/AddData';
import Login from '../screens/Login';
const Stack = createStackNavigator();
export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName={'CashScreen'}>
        <Stack.Screen name="CashScreen" component={CashScreen} />
        <Stack.Screen name="AddDataScreen" component={AddDataScreen} />
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
