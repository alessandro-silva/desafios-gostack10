import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home  from './pages/Home';
import Cart  from './pages/Cart';

import Header from './components/Header';
import { navigationRef } from './services/navigation';

const Stack = createStackNavigator();

function Routes() {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
       initialRouteName="Home"
       headerMode="screen"
       screenOptions={{
         cardStyle: {
           backgroundColor: "#191920",
         },
         header: props => <Header {...props} />
       }}
       >
        <Stack.Screen name="Home" component={Home} options={{ title: null}} />
        <Stack.Screen name="Cart" component={Cart} options={{ title: null}} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Routes;
