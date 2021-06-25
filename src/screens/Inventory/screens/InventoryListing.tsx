import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {FloatingAction} from "react-native-floating-action";
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {windowWidth} from '../../constants';
import {ScrollView} from 'react-native';
import Colors from '../../../utils/Colors';
import InventoryDetails from '../../components/InventoryDetails';
import close_24px_outlined from '../../../assets/close_24px_outlined.png';
import check2 from '../../../assets/check2.png';

const actions = [
  {
    text: 'Add Inventory',
    icon: close_24px_outlined,
    position: 1,
  },
  {
    text: 'Delete Inventories',
    icon: check2,
    position: 2,
  },
];

const InventoryListing = () => {
  const [inventories, setInventories] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getInventories();
    });
    return unsubscribe;
  }, [navigation]);

  const getInventories = async () => {
    try {
      const response = await AsyncStorage.getItem('@inventories');
      setInventories(response ? JSON.parse(response) : []);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Text style={styles.headText}>Inventory Listing</Text>
      <View style={styles.wrapper}>
        <ScrollView>
          {inventories.reverse().map((inventory, index) => (
            <InventoryDetails
              key={index}
              id={index}
              name={inventory.name}
              price={inventory.price}
              totalStock={inventory.totalStock}
              description={inventory.description}
            />
          ))}
        </ScrollView>
      </View>
      <FloatingAction
        actions={actions}
        overlayColor={"rgba(0, 0, 0, 0)"}
        color={Colors.AmberRed}
        onPressItem={name => navigation.navigate("AddInventory")}
      />
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
