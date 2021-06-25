import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {windowWidth} from '../constants';
import Colors from '../../utils/Colors';

interface InventoryDetailsProps {
  name: string;
  totalStock: number;
  price: number;
  description: string;
  navigation: string;
  id: number;
}

const InventoryDetails: React.FC<InventoryDetailsProps> = ({
  name,
  totalStock,
  price,
  description,
  navigation,
  id,
}) => {
  return (
    <View style={styles.container}>
      <Text>{name}</Text>
      <Text style={styles.description}>{description}</Text>
      <Text>@ {price} per unit</Text>
      <View style={styles.section}>
        <Text>{totalStock} units available</Text>
        <Text style={styles.viewLink} onPress={() => navigation.navigate('EditInventory', {inventory: {name, totalStock, price, description, id}})}>View</Text>
      </View>
    </View>
  );
};

export default InventoryDetails;

const styles = StyleSheet.create({
  container: {
    width: windowWidth < 414 ? 345 : 380,
    minHeight: 110,
    backgroundColor: '#fff', // margin: 5,
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    padding: 5,
    marginLeft: 5,
    marginRight: 10,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 5,
    borderLeftWidth: 10,
    borderLeftColor: Colors.AmberRed,
    paddingLeft: 4,
    paddingTop: 5,
    paddingBottom: 0,
    alignItems: 'flex-start',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 5,
    shadowOpacity: 0.3,
  },
  description: {
    fontSize: 12,
    fontStyle: 'italic',
    fontWeight: 'bold',
    marginTop: 5,
  },
  totalStock: {
    fontSize: 12,
    color: 'black',
    textAlign: 'left',
    width: '50%',
  },
  section: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'relative',
    bottom: -15,
  },
  viewLink: {
    fontSize: 12,
    color: '#E35540',
    textAlign: 'right',
    width: '50%',
  },
});
