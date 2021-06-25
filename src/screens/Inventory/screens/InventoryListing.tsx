import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, Linking} from 'react-native';
import { windowWidth, windowHeight} from '../../constants';
import {ScrollView} from 'react-native';
import Colors from '../../../utils/Colors';
import InventoryDetails from '../../components/InventoryDetails';

const mockedInventories = [
  {
    name: 'Water Heater',
    totalStock: 2000,
    price: 200000,
    description: 'This is s a water heater',
  },
  {
    name: 'Water Heater',
    totalStock: 2000,
    price: 200000,
    description: 'This is s a water heater',
  },
  {
    name: 'Water Heater',
    totalStock: 2000,
    price: 200000,
    description: 'This is s a water heater',
  },
  {
    name: 'Water Heater',
    totalStock: 2000,
    price: 200000,
    description: 'This is s a water heater',
  },
  {
    name: 'Water Heater',
    totalStock: 2000,
    price: 200000,
    description: 'This is s a water heater',
  },
];

const InventoryListing = () => {
  return (
    <>
      <Text style={styles.headText}>Inventory Listing</Text>
      <View style={styles.wrapper}>
        <ScrollView>
          {mockedInventories.map(inventory => (
            <InventoryDetails
              name={inventory.name}
              price={inventory.price}
              totalStock={inventory.totalStock}
              description={inventory.description}
            />
          ))}
        </ScrollView>
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
