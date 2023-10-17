// material-ui
import { Button, Checkbox, FormControlLabel, Grid, InputLabel, Stack, TextField, Typography } from '@mui/material';
import MainCard from 'components/MainCard';
import SpecificationTable from './tables/specification-table';

// ==============================|| BASIC WIZARD - PAYMENT  ||============================== //

export default function Step2() {
  return (
    <MainCard title="Specifications">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <SpecificationTable data={[]} />
        </Grid>
      </Grid>
    </MainCard>
  );
}
