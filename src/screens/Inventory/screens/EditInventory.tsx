import React from 'react';
import {View} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Header from '../../components/Header';
import InventoryForm from '../../components/InventoryForm';
import {displayAlert, recordExist} from '../../../utils/Helper';

export interface FormValuesType {
  name: string;
  description: string;
  price: number;
  totalStock: number;
  id: number;
}

const EditInventory = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const {inventory}: any = route.params;
  const initialValues: FormValuesType = {
    name: inventory.name,
    price: inventory.price,
    totalStock: inventory.totalStock,
    description: inventory.description,
    id: inventory.id,
  };

  const onSubmit = async ({
    name,
    price,
    totalStock,
    description,
  }: FormValuesType) => {
    const data = {
      name,
      price,
      totalStock,
      description,
    };
    try {
      const previousData = await AsyncStorage.getItem('@inventories');
      const parsedPreviousData = previousData && JSON.parse(previousData);
      parsedPreviousData.reverse()[inventory.id] = data;
      if (recordExist(parsedPreviousData, name).length === 0) {
        await AsyncStorage.setItem(
          '@inventories',
          JSON.stringify(parsedPreviousData.reverse()),
        );
        navigation.navigate('InventoryListing');
      } else {
        displayAlert('Error', `Inventory ${name} already exist`, null);
      }
    } catch (e) {
      displayAlert('Error', 'An error occurred.', null);
    }
  };

  const onDelete = async () => {
    try {
      const previousData = await AsyncStorage.getItem('@inventories');
      const parsedPreviousData = previousData && JSON.parse(previousData);
      const newRecord = parsedPreviousData
        .reverse()
        .filter((invent: any, index: number) => {
          return index !== inventory.id;
        });
      await AsyncStorage.setItem('@inventories', JSON.stringify(newRecord));
      navigation.navigate('InventoryListing');
    } catch (e) {
      displayAlert('Error', 'An error occurred.', null);
    }
  };

  return (
    <KeyboardAwareScrollView>
      <View>
        <Header canGoBack={true} title="Edit Inventory" />
        <InventoryForm
          onSubmit={onSubmit}
          onDelete={() =>
            displayAlert(
              'Delete Inventory',
              'Are you sure you want to delete this inventory',
              onDelete,
            )
          }
          type="edit"
          {...initialValues}
        />
      </View>
    </KeyboardAwareScrollView>
  );
};

export default EditInventory;
