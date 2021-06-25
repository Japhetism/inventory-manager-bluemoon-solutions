import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {FloatingAction} from 'react-native-floating-action';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../../components/Header';
import {ScrollView} from 'react-native';
import Colors from '../../../utils/Colors';
import {displayAlert} from '../../../utils/Helper';
import InventoryDetails from '../../components/InventoryDetails';
import close_24px_outlined from '../../../assets/close_24px_outlined.png';
import check2 from '../../../assets/check2.png';

const actions = [
  {
    text: 'Add Inventory',
    name: 'add',
    icon: close_24px_outlined,
    position: 1,
  },
  {
    text: 'Delete All Inventories',
    name: 'delete',
    icon: check2,
    position: 2,
  },
];

export interface FormValuesType {
  name: string;
  price: number;
  totalStock: number;
  description: string;
  id: number;
}

const InventoryListing = () => {
  const [inventories, setInventories] = useState<any[]>([]);
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
      displayAlert('Error', 'An error occurred.', null);
    }
  };

  const getAction = (name: any) => {
    name === 'add' ? navigation.navigate('AddInventory') : deleteInventories();
  };

  const deleteInventories = async () => {
    try {
      await AsyncStorage.removeItem('@inventories');
      getInventories();
    } catch (e) {
      displayAlert('Error', 'An error occurred.', null);
    }
  };

  return (
    <>
      <Header canGoBack={false} title="Inventory Listing" />
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
        overlayColor={'rgba(0, 0, 0, 0)'}
        color={Colors.AmberRed}
        onPressItem={name => getAction(name)}
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
    marginBottom: 70,
  },
});
