import { Fragment } from 'react';

// material-ui
import { Button, Grid, List, ListItem, ListItemText, Stack, Typography } from '@mui/material';
import MainCard from 'components/MainCard';
import BOMTable from './tables/BOM-table';
// ==============================|| BASIC WIZARD - REVIEW  ||============================== //

const products = [
  {
    name: 'Product 1',
    desc: 'A nice thing',
    price: '$9.99'
  },
  {
    name: 'Product 2',
    desc: 'Another thing',
    price: '$3.45'
  },
  {
    name: 'Product 3',
    desc: 'Something else',
    price: '$6.51'
  },
  {
    name: 'Product 4',
    desc: 'Best thing of all',
    price: '$14.11'
  },
  { name: 'Shipping', desc: '', price: 'Free' }
];

const addresses = ['1 Material-UI Drive', 'Reactville', 'Anytown', '99999', 'USA'];
const payments = [
  { name: 'Card type', detail: 'Visa' },
  { name: 'Card holder', detail: 'Mr John Smith' },
  { name: 'Card number', detail: 'xxxx-xxxx-xxxx-1234' },
  { name: 'Expiry date', detail: '04/2024' }
];

export default function Step3() {
  return (
    <MainCard title="Bill of Materials">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <BOMTable data={[]} />
        </Grid>
      </Grid>
    </MainCard>
  );
}
