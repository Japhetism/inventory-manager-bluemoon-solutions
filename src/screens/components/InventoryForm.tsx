import React, {useState} from 'react';
import {View, Text, StyleSheet, Pressable, TextInput, SafeAreaView,TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '../../utils/Colors';
import {arrowLeft} from '../constants';
import styled from 'styled-components/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Formik} from "formik";
import * as yup from 'yup';

export interface FormValuesType {
  name: string;
  description: string;
  price: string;
  totalStock: string;
  id?: string;
  onSubmit(): any;
  onDelete?(): any;
  type: string;
}

const validationSchema = yup.object({
  name: yup
    .string('Enter name')
    .required('Name is required'),
  price: yup
    .number('Enter price')
    .min(1, 'Minimum value is 1')
    .required('Price is required'),
  totalStock: yup
    .number('Enter total stock')
    .min(1, 'Minimum value is 1')
    .required('Total stock is required'),
  description: yup
    .string('Enter description')
    .min(4, 'Minimum of 3 words')
    .required('Description is required'),
});

const InventoryForm: React.FC<InventoryDetailsProps> = ({
  name,
  totalStock,
  price,
  description,
  id,
  onSubmit,
  onDelete,
  type,
}) => {
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
    name,
    price,
    totalStock,
    description,
  };

  return (
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
  );
};

export default InventoryForm;

const styles = StyleSheet.create({
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
