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
import ConsumptionTable from './tables/consumption';
import Impact_EmissionTable from './tables/impact-analysis';
import CertificateTable from './tables/certificate';

const avatarImage = require.context('assets/images/users', true);

// ==============================|| ACCOUNT PROFILE - BASIC ||============================== //

const SustainabilityIndicator = () => {
  const matchDownMD = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const data = useMemo(() => makeData(20), []);

  return (

    <Grid container spacing={3}>
      <Grid item xs={12}>
        <MainCard title="Sustainability Indicator">
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <ConsumptionTable data={data.slice(0, 5)} />
            </Grid>
            <Grid item xs={12} md={6}>
              <Impact_EmissionTable data={data.slice(0, 5)} />
            </Grid>
          </Grid>
        </MainCard>
      </Grid>
      <Grid item xs={12}>
        <MainCard title="Certificate">
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <CertificateTable data={data.slice(0, 5)} />
            </Grid>
          </Grid>
        </MainCard>
      </Grid>
    </Grid>

  );
};

export default SustainabilityIndicator;
