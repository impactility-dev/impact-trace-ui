import { useEffect, useState } from 'react';

import { dispatch } from 'store';
import { openSnackbar } from 'store/reducers/snackbar';


// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Grid,
  List,
  ListItemButton,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography
} from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import IconButton from 'components/@extended/IconButton';
import AnalyticsDataCard from 'components/cards/statistics/AnalyticsDataCard';

import WelcomeBanner from 'sections/dashboard/analytics/WelcomeBanner';
import IncomeChart from 'sections/dashboard/analytics/IncomeChart';
import MarketingCardChart from 'sections/dashboard/analytics/MarketingCardChart';
import OrdersCardChart from 'sections/dashboard/analytics/OrdersCardChart';
import OrdersList from 'sections/dashboard/analytics/OrdersList';
import PageViews from 'sections/dashboard/analytics/PageViews';
import ReportChart from 'sections/dashboard/analytics/ReportChart';
import SalesCardChart from 'sections/dashboard/analytics/SalesCardChart';
import SalesChart from 'sections/dashboard/SalesChart';
import TransactionHistory from 'sections/dashboard/analytics/TransactionHistory';
import UsersCardChart from 'sections/dashboard/analytics/UsersCardChart';
import LabelledTasks from 'sections/dashboard/analytics/LabelledTasks';
import ReaderCard from 'sections/dashboard/analytics/ReaderCard';
import AcquisitionChannels from 'sections/dashboard/analytics/AcquisitionChannels';

// assets
import { DownloadOutlined, CaretDownOutlined } from '@ant-design/icons';

// sales report status
const status = [
  {
    value: 'today',
    label: 'Today'
  },
  {
    value: 'month',
    label: 'This Month'
  },
  {
    value: 'year',
    label: 'This Year'
  }
];

// ==============================|| DASHBOARD - ANALYTICS ||============================== //

const DashboardAnalytics = () => {

  useEffect(() => {
    
      dispatch(
        openSnackbar({
          open: true,
          message: 'Your Profile is incomplete. Please complete your profile.',
          variant: 'alert',
          alert: {
            color: 'error'
          },
          close: false
        })
      );
      }, []);

  return (
    <Grid container rowSpacing={4.5} columnSpacing={3}>
      <Grid item xs={12}>
        <WelcomeBanner />
      </Grid>
    </Grid>
  );
};

export default DashboardAnalytics;
