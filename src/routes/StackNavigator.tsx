import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { RouteNames } from './RouteName';
import Home from '../screen/Home';
import Cart from '../screen/Cart';
import ProductDetails from '../screen/ProductDetails';

const StackNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{
        headerShown: false
    }}>
        <Stack.Screen name={RouteNames.HOME_SCREEN} component={Home} />
        <Stack.Screen name={RouteNames.PRODUCT_DETAILS_SCREEN} component={ProductDetails} />
        <Stack.Screen name={RouteNames.CART_SCREEN} component={Cart} />
    </Stack.Navigator>
  )
}

export default StackNavigator;