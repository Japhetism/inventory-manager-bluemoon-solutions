import React from 'react';
import {View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import InventoryForm from '../../components/InventoryForm';
import Header from '../../components/Header';

export interface FormValuesType {
  name: string;
  price: number;
  totalStock: number;
  description: string;
}

const AddInventory = () => {
  const navigation = useNavigation();

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
        parsedPreviousData.push(data);
        await AsyncStorage.setItem(
          '@inventories',
          JSON.stringify(parsedPreviousData),
        );
      }
      navigation.navigate('InventoryListing');
    } catch (e) {
      // saving error
    }
  };

  return (
    <KeyboardAwareScrollView>
      <View>
        <Header canGoBack={true} title="Create Inventory" />
        <InventoryForm onSubmit={onSubmit} type="create" />
      </View>
    </KeyboardAwareScrollView>
  );
};

export default AddInventory;
