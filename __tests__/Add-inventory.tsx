import React from 'react';
import renderer from 'react-test-renderer';
import AddInventory from '../src/screens/Inventory/screens/AddInventory';

test('renders correctly', () => {
  const tree = renderer.create(<AddInventory />).toJSON();
  expect(tree).toMatchSnapshot();
});
