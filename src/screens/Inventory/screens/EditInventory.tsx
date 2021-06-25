import React, {useState} from 'react';
import {View, Text, StyleSheet, Pressable, TextInput, SafeAreaView, Button, Alert, TouchableOpacity} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '../../../utils/Colors';
import {arrowLeft} from '../../constants';
import styled from 'styled-components/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Formik} from "formik";
import * as yup from 'yup';
import Header from '../../components/Header';
import InventoryForm from '../../components/InventoryForm';

export interface FormValuesType {
  name: string;
  description: string;
  price: number;
  totalStock: number;
  id: number;
}

const validationSchema = yup.object({
  name: yup
    .string('Enter name')
    .required('Name is required'),
  price: yup
    .string('Enter price')
    .min(1, 'Minimum value is 1')
    .matches(/^[0-9]+$/, "Must be only digits")
    .required('Price is required'),
  totalStock: yup
    .string('Enter total stock')
    .min(1, 'Minimum value is 1')
    .matches(/^[0-9]+$/, "Must be only digits")
    .required('Total stock is required'),
  description: yup
    .string('Enter description')
    .min(4, 'Minimum of 3 words')
    .required('Description is required'),
});

const EditInventory = () => {
  const route = useRoute();
  const navigation = useNavigation();
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
    id: inventory.id,
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
      const parsedPreviousData = JSON.parse(previousData)
      parsedPreviousData[inventory.id] = data;
      await AsyncStorage.setItem('@inventories', JSON.stringify(parsedPreviousData))
      navigation.navigate('InventoryListing')
    } catch (e) {
      // saving error
    }
  };

  const onDelete = async () => {
    try {
      const previousData = await AsyncStorage.getItem('@inventories');
      const parsedPreviousData = JSON.parse(previousData)
      const newRecord = parsedPreviousData.reverse().filter((invent, index) => {return index != inventory.id});
      await AsyncStorage.setItem('@inventories', JSON.stringify(newRecord))
      navigation.navigate('InventoryListing')
    } catch (e) {
      // saving error
    }
  };

  const displayAlert = () => {
    Alert.alert(
      'Delete Inventory',
      'Are you sure you want to delete this inventory?',
      [
        {
          text: 'Yes',
          onPress: () => {
            onDelete();
          },
        },
        {
          text: 'No',
          onPress: () => {
            cancelable: true
          },
        },
      ],
      {cancelable: true},
    );
  };

  return (
    <KeyboardAwareScrollView>
      <View>
        <Header canGoBack={true} title="Edit Inventory" />
        <InventoryForm onSubmit={onSubmit} onDelete={displayAlert} type="edit" {...initialValues} />
        {/* <Text style={styles.headText}>
          <Pressable
            {...{
              hitSlop,
              onPress,
            }}>
            <ArrowLeft source={arrowLeft} />
          </Pressable>
          Edit Inventory
        </Text> */}
      {/* <Formik
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
          <Text style={styles.error}>{touched.name && errors.name}</Text>
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
           <Text style={styles.error}>{touched.price && errors.price}</Text>
        </View>
        <View>
          <TextInput
            style={styles.input}
            onChangeText={handleChange("totalStock")}
            value={values.totalStock}
            keyboardType="numeric"
          />
          <Text style={styles.error}>{touched.totalStock && errors.totalStock}</Text>
        </View>
        <View>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.inputMulti}
            onChangeText={handleChange("description")}
            value={values.description}
            multiline
          />
         <Text style={styles.error}>{touched.description && errors.description}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.text}>Save Changes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={displayAlert}>
            <Text style={styles.text}>Delete</Text>
          </TouchableOpacity>
        </View> */}
      {/* <Button
        onPress={handleSubmit}
        title="Update Inventory"
      />
      <Button
        onPress={displayAlert}
        title="Delete Inventory"
      /> */}
    {/* </SafeAreaView>
        )}
        </Formik> */}
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
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderColor: Colors.AmberRed,
    borderRadius: 10,
    paddingLeft: 10,
  },
  inputMulti: {
    height: 100,
    margin: 12,
    borderWidth: 1,
    borderColor: Colors.AmberRed,
    borderRadius: 10,
    paddingLeft: 10,
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingLeft: 15,
    marginTop: 20,
  },
  button: {
    backgroundColor: Colors.AmberRed,
    padding: 18,
    width: '46%',
    height: 60,
    borderRadius: 10,
    marginTop: 20,
  },
  text: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
  },
  buttonContainer: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  error: {
    color: 'red',
    paddingLeft: 20,
  },
});

const ArrowLeft = styled.Image`
  width: 9.2px;
  height: 20px;
  margin-left: 2px;
  margin-right: 5px;
`;
