import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {windowWidth, windowHeight} from '../screens/constants';

const Header = () => {
  return (
    <View style={styles.top}>
      <TouchableOpacity style={styles.menuStyle}>
        <Text style={styles.menuImageStyle}>Bluemoon Solutions</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  top: {
    backgroundColor: '#E35540',
    height: windowHeight * 0.1157,
    width: windowWidth,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 1,
  },
  menuStyle: {
    marginTop: windowHeight * 0.035,
    marginLeft: windowWidth * 0.056,
  },
  menuImageStyle: {
    fontSize: 30,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default Header;