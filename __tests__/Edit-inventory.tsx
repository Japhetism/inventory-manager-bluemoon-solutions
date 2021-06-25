import React from 'react';
import renderer from 'react-test-renderer';
import {EditInventory} from '../src/screens/Inventory/screens/';

test('renders correctly', () => {
  const tree = renderer.create(<EditInventory />).toJSON();
  expect(tree).toMatchSnapshot();
});
