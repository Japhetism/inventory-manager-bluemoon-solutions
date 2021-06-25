import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {InventoryListing, AddInventory, EditInventory} from '../screens';
import Header from '../../../components/Header';

export type InventoryStackParamsType = {
  InventoryListing: undefined;
  AddInventory: {
    name: string;
    totalStock: number;
    price: number;
    description: string;
  };
  EditInventory: {
    name: string;
    totalStock: number;
    price: number;
    description: string;
  };
};

const InventoryStack = createStackNavigator<InventoryStackParamsType>();

const navigation = () => {
  return (
    <>
      <Header />
      <InventoryStack.Navigator headerMode="screen" initialRouteName="InventoryListing">
        <InventoryStack.Screen
          options={{
            headerShown: false,
          }}
          name="InventoryListing"
          component={InventoryListing}
        />
        <InventoryStack.Screen
          options={{
            headerShown: false,
          }}
          name="AddInventory"
          component={AddInventory}
        />
        <InventoryStack.Screen
          options={{
            headerShown: false,
          }}
          name="EditInventory"
          component={EditInventory}
        />
      </InventoryStack.Navigator>
    </>
  );
};

export default navigation;
