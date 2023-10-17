// material-ui
import { Theme } from '@mui/material/styles';
import {
  useMediaQuery,
  Chip,
  Divider,
  Grid,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  Stack,
  Typography
} from '@mui/material';


import { useMemo } from 'react';
import makeData from 'data/react-table';

// third-party
import { PatternFormat } from 'react-number-format';

// project import
import MainCard from 'components/MainCard';
import Avatar from 'components/@extended/Avatar';
import LinearWithLabel from 'components/@extended/progress/LinearWithLabel';

// assets
import { AimOutlined, EnvironmentOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import InventoryTable from './tables/inventory';
import ImpactAnalysisTable from './tables/impact-analysis';
import ApexMixedChart from 'sections/charts/apexchart/ApexMixedChart';
import ApexPieChart from 'sections/charts/apexchart/ApexPieChart';

const avatarImage = require.context('assets/images/users', true);

// ==============================|| ACCOUNT PROFILE - BASIC ||============================== //

const LCA = () => {
  const matchDownMD = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const data = useMemo(() => makeData(20), []);

  return (

    <Grid container spacing={3}>
      <Grid item xs={12}>
        <MainCard title="Overview">
          <List sx={{ py: 0 }}>
            <ListItem>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Stack spacing={0.5}>
                    <Typography color="secondary">Product</Typography>
                    <Typography>Pulser 220 DTSi</Typography>
                  </Stack>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Stack spacing={0.5}>
                    <Typography color="secondary">Location</Typography>
                    <Typography>Nagar Rd, Waluj, Sambhaji Nagar, Maharashtra 431136</Typography>
                  </Stack>
                </Grid>
              </Grid>
            </ListItem>
            <ListItem>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Stack spacing={0.5}>
                    <Typography color="secondary">Reference Process</Typography>
                    <Typography>
                      Final Assembly
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Stack spacing={0.5}>
                    <Typography color="secondary">Date</Typography>
                    September 01, 2023
                  </Stack>
                </Grid>
              </Grid>
            </ListItem>
            <ListItem>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Stack spacing={0.5}>
                    <Typography color="secondary">Amount/Qty section</Typography>
                    <Typography>1 Unit</Typography>
                  </Stack>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Stack spacing={0.5}>
                    <Typography color="secondary">Allocation method</Typography>
                    <Typography>Process defaults</Typography>
                  </Stack>
                </Grid>
              </Grid>
            </ListItem>
          </List>
        </MainCard>
      </Grid>
      <Grid item xs={12}>
        <MainCard title="Inventory">
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <InventoryTable title='Input' data={data.slice(0, 5)} />
            </Grid>
            <Grid item xs={12} md={6}>
              <InventoryTable title='Output' data={data.slice(0, 5)} />
            </Grid>
          </Grid>
        </MainCard>
      </Grid>
      <Grid item xs={12}>
        <MainCard title="Impact Analysis">
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <ImpactAnalysisTable data={data.slice(0, 5)} />
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <ApexMixedChart />
                </Grid>
                <Grid item xs={12} md={6}>
                  <ApexPieChart />
                </Grid>
              </Grid>

            </Grid>
          </Grid>
        </MainCard>
      </Grid>
    </Grid>

  );
};

export default LCA;
