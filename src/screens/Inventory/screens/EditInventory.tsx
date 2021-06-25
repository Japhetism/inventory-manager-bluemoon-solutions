import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Pressable, TextInput, SafeAreaView, Button} from 'react-native';
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
  id: number,
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

const EditInventory = ({ route, navigation }) => {
  console.log("route is ", route)
  const {inventory} = route.params;
  console.log("passed inventory ", inventory)
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
    name: inventory.name,
    price: inventory.price,
    totalStock: inventory.totalStock,
    description: inventory.description,
  };

  // React.useEffect(() => {
  //   const {inventory} = route.params;
  //   console.log("passed inventory ", inventory)
  //   // initialValues: FormValuesType = {
  //   //   name: inventory.name,
  //   //   price: inventory.price,
  //   //   totalCost: inventory.totalCost,
  //   //   description: inventory.description,
  //   // };
  // }, [])

  const onSubmit = async ({name, price, totalStock, description}: FormValuesType) => {
    const data = {
      name,
      price,
      totalStock,
      description,
    };
    console.log(data)
    console.log("key passed is ", inventory.id)
    try {
      const previousData = await AsyncStorage.getItem('@inventories');
      const parsedPreviousData = JSON.parse(previousData)
      parsedPreviousData[inventory.id] = data;
      console.log(parsedPreviousData[inventory.id])
      await AsyncStorage.setItem('@inventories', JSON.stringify(parsedPreviousData))
      navigation.navigate('InventoryListing')
    } catch (e) {
      // saving error
    }
  }

  const onDelete = async () => {
    console.log("delete...", inventory.id)
    try {
      const previousData = await AsyncStorage.getItem('@inventories');
      const parsedPreviousData = JSON.parse(previousData)
      console.log('before delete.... ', parsedPreviousData.length);
      const newRecord = parsedPreviousData.reverse().filter((invent, index) => {return index != inventory.id});
      console.log('after delete.... ', newRecord);
      // parsedPreviousData[inventory.id] = data;
      // console.log(parsedPreviousData[inventory.id])
      await AsyncStorage.setItem('@inventories', JSON.stringify(newRecord))
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
          Edit Inventory
        </Text>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        //onDelete={onDelete}
        validationSchema={validationSchema}
      >
        {({
          values,
          handleChange,
          handleBlur,
          handleSubmit,
          //handleDelete,
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
           <Text style={styles.label}>Total Cost</Text>
           <Text>{errors.price}</Text>
        </View>
        <View>
          <TextInput
            style={styles.input}
            onChangeText={handleChange("totalStock")}
            value={values.totalStock}
            keyboardType="numeric"
          />
          <Text>{errors.totalCost}</Text>
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
        title="Update Inventory"
      />
      <Button
        onPress={onDelete}
        title="Delete Inventory"
      />
    </SafeAreaView>
        )}
        </Formik>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default EditInventory;

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
