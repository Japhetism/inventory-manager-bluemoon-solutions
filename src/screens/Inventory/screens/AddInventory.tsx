import React from 'react';
import {View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import InventoryForm from '../../components/InventoryForm';
import Header from '../../components/Header';
import {displayAlert, recordExist} from '../../../utils/Helper';

export interface FormValuesType {
  name: string;
  price: number;
  totalStock: number;
  description: string;
}

const AddInventory = () => {
  const navigation = useNavigation();

  const initialValues: FormValuesType = {
    name: '',
    price: 0,
    totalStock: 0,
    description: '',
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
      if (!previousData) {
        const newData = [];
        newData.push(data);
        await AsyncStorage.setItem('@inventories', JSON.stringify(newData));
      } else {
        const parsedPreviousData = JSON.parse(previousData);
        if (recordExist(parsedPreviousData, name).length === 0) {
          parsedPreviousData.push(data);
          await AsyncStorage.setItem(
            '@inventories',
            JSON.stringify(parsedPreviousData),
          );
          navigation.navigate('InventoryListing');
        } else {
          displayAlert('Error', `Inventory ${name} already exist`, null);
        }
      }
    } catch (e) {
      displayAlert('Error', 'An error occurred.', null);
    }
  };

  return (
    <KeyboardAwareScrollView>
      <View>
        <Header canGoBack={true} title="Create Inventory" />
        <InventoryForm onSubmit={onSubmit} type="create" {...initialValues} />
      </View>
    </KeyboardAwareScrollView>
  );
};

export default AddInventory;
