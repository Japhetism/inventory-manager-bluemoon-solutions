import React from 'react';
import renderer from 'react-test-renderer';
import {InventoryListing} from '../src/screens/Inventory/screens/';

test('renders correctly', () => {
  const tree = renderer.create(<InventoryListing />).toJSON();
  expect(tree).toMatchSnapshot();
});
