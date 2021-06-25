import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, Linking} from 'react-native';
import {FloatingAction} from "react-native-floating-action";
import { windowWidth, windowHeight} from '../../constants';
import {ScrollView} from 'react-native';
import Colors from '../../../utils/Colors';
import InventoryDetails from '../../components/InventoryDetails';
import close_24px_outlined from '../../../assets/close_24px_outlined.png';
import check2 from '../../../assets/check2.png';

const mockedInventories = [
  {
    name: 'Water Heater1',
    totalStock: 2000,
    price: 200000,
    description: 'This is s a water heater',
  },
  {
    name: 'Water Heater2',
    totalStock: 2000,
    price: 200000,
    description: 'This is s a water heater',
  },
  {
    name: 'Water Heater3',
    totalStock: 2000,
    price: 200000,
    description: 'This is s a water heater',
  },
  {
    name: 'Water Heater4',
    totalStock: 2000,
    price: 200000,
    description: 'This is s a water heater',
  },
  {
    name: 'Water Heater5',
    totalStock: 2000,
    price: 200000,
    description: 'This is s a water heater',
  },
];

const actions = [
  {
    text: 'Add Inventory',
    icon: close_24px_outlined,
    name: 'add_goal',
    position: 1,
  },
];

const InventoryListing = ({navigation}) => {
  return (
    <>
      <Text style={styles.headText}>Inventory Listing</Text>
      <View style={styles.wrapper}>
        <ScrollView>
          {mockedInventories.map(inventory => (
            <InventoryDetails
              key={inventory.name}
              name={inventory.name}
              price={inventory.price}
              totalStock={inventory.totalStock}
              description={inventory.description}
            />
          ))}
        </ScrollView>
        <FloatingAction
          actions={actions}
          overlayColor={"rgba(0, 0, 0, 0)"}
          color={Colors.AmberRed}
          onPressItem={name => navigation.navigate("AddInventory")}
        />
      </View>
    </>
  );
};

export default InventoryListing;

const styles = StyleSheet.create({
  wrapper: {
    margin: 10,
    alignItems: 'center',
    borderRadius: 10,
  },
  headText: {
    color: Colors.AmberRed,
    fontSize: 27,
    fontWeight: '700',
    marginTop: 20,
    marginLeft: 20,
  },
  img: {
    width: windowWidth * 0.9,
    height: 180,
    resizeMode: 'contain',
  },
});
