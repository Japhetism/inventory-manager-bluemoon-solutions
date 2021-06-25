import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Pressable, TextInput, SafeAreaView, Button, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '../../../utils/Colors';
import {arrowLeft} from '../../constants';
import styled from 'styled-components/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Formik} from "formik";
import * as yup from 'yup';

export interface FormValuesType {
  name: string;
  description: string;
  price: number;
  totalStock: number;
}

const validationSchema = yup.object({
  name: yup
    .string('Enter your email')
    .required('Email is required'),
  price: yup
    .number('Enter price')
    .required('Price is required'),
  totalStock: yup
    .number('Enter total stock')
    .required('Total stock is required'),
  description: yup
    .string('Enter description')
    .required('Description is required'),
});

const AddInventory = ({navigation}) => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [error, setError] = useState('');
  const onPress = () => {
    navigation.goBack();
  };
  const hitSlop = {
    top: 15,
    bottom: 15,
    left: 15,
    right: 15,
  };
  const initialValues: FormValuesType = {
    name: '',
    price: 0,
    totalCost: 0,
    description: '',
  };

  const onSubmit = async ({name, price, totalStock, description}: FormValuesType) => {
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
        newData.push(data)
        await AsyncStorage.setItem('@inventories', JSON.stringify(newData))
      } else {
        const parsedPreviousData = JSON.parse(previousData);
        parsedPreviousData.push(data);
        await AsyncStorage.setItem('@inventories', JSON.stringify(parsedPreviousData))
      }
      navigation.navigate('InventoryListing')
    } catch (e) {
      // saving error
    }
  }

  return (
    <KeyboardAwareScrollView>
      <View>
        <Text style={styles.headText}>
          <Pressable
            {...{
              hitSlop,
              onPress,
            }}>
            <ArrowLeft source={arrowLeft} />
          </Pressable>
          Create Inventory
        </Text>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({
          values,
          handleChange,
          handleBlur,
          handleSubmit,
          touched,
          errors,
        }) => (
      <SafeAreaView>
        <View>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            onChangeText={handleChange("name")}
            value={values.name}
          />
          <Text>{errors.name}</Text>
        </View>
        <View>
          <Text style={styles.label}>Price</Text>
         <TextInput
          style={styles.input}
          onChangeText={handleChange("price")}
          value={values.price}
          keyboardType="numeric"
         />
           <Text style={styles.label}>Total Stock</Text>
           <Text>{errors.price}</Text>
        </View>
        <View>
          <TextInput
            style={styles.input}
            onChangeText={handleChange("totalStock")}
            value={values.totalCost}
            keyboardType="numeric"
          />
          <Text>{errors.totalStock}</Text>
        </View>
        <View>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.inputMulti}
            onChangeText={handleChange("description")}
            value={values.description}
            multiline
          />
         <Text>{errors.description}</Text>
        </View>
      <Button
        onPress={handleSubmit}
        title="Add Inventory"
      />
    </SafeAreaView>
        )}
        </Formik>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default AddInventory;

const styles = StyleSheet.create({
  headText: {
    color: Colors.AmberRed,
    fontSize: 27,
    fontWeight: '700',
    marginTop: 20,
    marginLeft: 20,
  },
  input: {
    height: 50,
    margin: 12,
    borderWidth: 1,
    borderColor: Colors.AmberRed,
    borderRadius: 10,
  },
  inputMulti: {
    height: 100,
    margin: 12,
    borderWidth: 1,
    borderColor: Colors.AmberRed,
    borderRadius: 10,
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingLeft: 15,
    marginTop: 20,
  }
});

const ArrowLeft = styled.Image`
  width: 9.2px;
  height: 20px;
  margin-left: 2px;
  margin-right: 5px;
`;
