import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Inventory} from '../screens';

const AppStack = createStackNavigator();

const Navigation = () => {
  return (
    <AppStack.Navigator headerMode="none">
      <AppStack.Screen name="Inventory" component={Inventory} />
    </AppStack.Navigator>
  );
};

export default Navigation;
