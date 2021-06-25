import React, {useState} from 'react';
import {View, Text, StyleSheet, Pressable, TextInput, SafeAreaView,TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
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
  price: string;
  totalStock: string;
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

const AddInventory = () => {
  const navigation = useNavigation();
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
    price: '',
    totalStock: '',
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
           <Text style={styles.error}>{touched.price && errors.price}</Text>
        </View>
        <View>
          <Text style={styles.label}>Total Stock</Text>
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
            <Text style={styles.text}>Add Inventory</Text>
          </TouchableOpacity>
        </View>
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
