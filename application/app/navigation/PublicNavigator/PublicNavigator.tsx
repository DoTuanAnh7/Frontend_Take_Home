import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import RegisterScreen from '../../screens/RegisterScreen';
import RegisterScreenStep2 from '../../screens/RegisterScreenStep2';

import LoginScreen from '../../screens/LoginScreen';
import Dashboard from '../../screens/Dashboard';
import MyAccount from '../../screens/MyAccount';
import AddProduct from '../../screens/AddProduct';
import UpdateUser from '../../screens/UpdateUser';

const Stack = createStackNavigator();

export const PublicNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={'LoginScreen'}
      screenOptions={{
        animationEnabled: false,
      }}>
      <Stack.Screen
        options={{headerShown: false}}
        name="RegisterScreen"
        component={RegisterScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="RegisterScreenStep2"
        component={RegisterScreenStep2}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="Dashboard"
        component={Dashboard}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="LoginScreen"
        component={LoginScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="MyAccount"
        component={MyAccount}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="AddProduct"
        component={AddProduct}
      />

      <Stack.Screen
        options={{headerShown: false}}
        name="UpdateUser"
        component={UpdateUser}
      />
    </Stack.Navigator>
  );
};
