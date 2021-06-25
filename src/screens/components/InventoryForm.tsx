import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import Colors from '../../utils/Colors';
import {Formik} from 'formik';
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
  name: yup.string().required('Name is required'),
  price: yup
    .number()
    .min(1, 'Minimum value is 1')
    .required('Price is required'),
  totalStock: yup
    .number()
    .min(1, 'Minimum value is 1')
    .required('Total stock is required'),
  description: yup
    .string()
    .min(4, 'Minimum of 3 words')
    .required('Description is required'),
});

const InventoryForm: React.FC<FormValuesType> = ({
  name,
  totalStock,
  price,
  description,
  onSubmit,
  onDelete,
  type,
  id,
}) => {
  const initialValues: FormValuesType = {
    name,
    price,
    totalStock,
    description,
    id,
    type,
    onSubmit,
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}>
      {({values, handleChange, handleSubmit, touched, errors}) => (
        <SafeAreaView>
          <View>
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange('name')}
              value={values.name}
            />
            <Text style={styles.error}>{touched.name && errors.name}</Text>
          </View>
          <View>
            <Text style={styles.label}>Price</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange('price')}
              value={values.price}
              keyboardType="numeric"
            />
            <Text style={styles.error}>{touched.price && errors.price}</Text>
          </View>
          <View>
            <Text style={styles.label}>Total Stock</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange('totalStock')}
              value={values.totalStock}
              keyboardType="numeric"
            />
            <Text style={styles.error}>
              {touched.totalStock && errors.totalStock}
            </Text>
          </View>
          <View>
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={styles.inputMulti}
              onChangeText={handleChange('description')}
              value={values.description}
              multiline
            />
            <Text style={styles.error}>
              {touched.description && errors.description}
            </Text>
          </View>
          {type === 'create' && (
            <View style={styles.buttonCreateContainer}>
              <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.text}>Add Inventory</Text>
              </TouchableOpacity>
            </View>
          )}
          {type === 'edit' && (
            <View style={styles.buttonEditContainer}>
              <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.text}>Save Changes</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={onDelete}>
                <Text style={styles.text}>Delete</Text>
              </TouchableOpacity>
            </View>
          )}
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
  buttonCreateContainer: {
    alignItems: 'center',
  },
  buttonEditContainer: {
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
