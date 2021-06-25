import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, Linking, Pressable, TextInput, SafeAreaView, Button} from 'react-native';
import {FloatingAction} from "react-native-floating-action";
import { windowWidth, windowHeight} from '../../constants';
import {ScrollView} from 'react-native';
import Colors from '../../../utils/Colors';
import InventoryDetails from '../../components/InventoryDetails';
import close_24px_outlined from '../../../assets/close_24px_outlined.png';
import check2 from '../../../assets/check2.png';
import {arrowLeft} from '../../constants';
import styled from 'styled-components/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {Formik} from "formik";
import * as yup from 'yup';

export interface FormValuesType {
  name: string;
  description: string;
  price: number;
  totalCost: number;
}

const validationSchema = yup.object({
  name: yup
    .string('Enter your email')
    .required('Email is required'),
  price: yup
    .number('Enter price')
    .required('Price is required'),
  totalCost: yup
    .number('Enter total cost')
    .required('Total cost is required'),
  description: yup
    .string('Enter description')
    .required('Description is required'),
});

const EditInventory = ({navigation}) => {
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
  const onSubmit = async ({name, price, totalCost, description}: FormValuesType) => {
    console.log(name)
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
        validationSchema={validationSchema}>
        {({
          values,
          handleChange,
          handleBlur,
          handleSubmit,
          touched,
          errors,
        }) => (
      <SafeAreaView>
      <TextInput
        style={styles.input}
        onChangeText={handleChange("name")}
        value={values.name}
      />
      <TextInput
        style={styles.input}
        onChangeText={handleChange("price")}
        value={values.price}
        placeholder="Price"
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        onChangeText={handleChange("totalCost")}
        value={values.totalCost}
        placeholder="Total Cost"
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        onChangeText={handleChange("description")}
        value={values.description}
        placeholder="Description"
        multiline
      />
      <Button
        onPress={handleSubmit}
        title="Update Inventory"
      />
      <Button
        //onPress={handleSubmit}
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
  container: {
    backgroundColor: '#f5f5f5',
    flex: 1,
    alignItems: 'center',
  },
  headText: {
    color: Colors.AmberRed,
    fontSize: 27,
    fontWeight: '700',
    marginTop: 20,
    marginLeft: 20,
  },
  top: {
    backgroundColor: '#E35540',
    height: 30,
    width: 100,
  },
  text: {
    fontSize: 30,
    marginVertical: 20,
    color: '#E35540',
  },
  errorText: {
    color: 'red',
    //fontSize: Textsizes.Regular,
    marginBottom: 8
  },
  forgot: {
    color: Colors.AmberRed,
    //fontSize: Textsizes.xMedium,
    marginTop: 30
  },
  navButton: {
    marginTop: 15,
  },
  navButtonText: {
    fontSize: 20,
    color: '#6646ee',
  },
  loginForm: {
    justifyContent: 'center',
    height: 500,
    //height: Dimensions.get('window').height / 1.5,
    alignItems: 'center',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
  },
});

const ArrowLeft = styled.Image`
  width: 9.2px;
  height: 20px;
  margin-left: 2px;
  margin-right: 5px;
`;
