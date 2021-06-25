import React from 'react';
import Typography from '../../components/Typography';
import {FONTS_MONTSERRAT_300} from '../../constants';

const AddInventory = () => {
  return (
    <Typography
      {...{
        fontSize: 34,
        fontWeight: 700,
        fontStyle: 'normal',
        lineHeight: 19.5,
        color: '#222222',
        style: {flex: 1, alignSelf: 'center', textAlign: 'center'},
      }}>
      Edit Inventory
    </Typography>
  );
};

export default AddInventory;
