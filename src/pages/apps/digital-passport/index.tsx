import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import MainCard from 'components/MainCard';
import Overview from './tabs/overview';
import Trace from './tabs/trace';
import { useMemo } from 'react';
import makeData from 'data/react-table';



interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function Sites() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const data = useMemo(() => makeData(20), []);

  return (
    <MainCard>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
        <Tab label="Overview" {...a11yProps(0)} />
          <Tab label="Trace" {...a11yProps(1)} />
          <Tab label="Transactions" {...a11yProps(2)} />
          <Tab label="Sustainability" {...a11yProps(3)} />
          <Tab label="Components" {...a11yProps(4)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Overview />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Trace />
      </CustomTabPanel>
    </MainCard>
  );
}
