import { useRef, useState } from 'react';
import { useLocation, Link, Outlet } from 'react-router-dom';

// material-ui
import { Box, Grid, Tab, Tabs } from '@mui/material';

// project import
import MainCard from 'components/MainCard';

// assets
import { BuildOutlined, ContainerOutlined, FileTextOutlined, LockOutlined, SettingOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';
import ProfileCard from 'sections/apps/profiles/edit/ProfileCard';

// ==============================|| PROFILE - ACCOUNT ||============================== //

const AccountProfile = () => {
  const { pathname } = useLocation();

  let selectedTab = 0;
  switch (pathname) {
    case '/apps/profiles/account/user':
      selectedTab = 1;
      break;
    case '/apps/profiles/account/password':
      selectedTab = 2;
      break;
    case '/apps/profiles/account/verifiable-credential':
      selectedTab = 3;
      break;
    case '/apps/profiles/account/settings':
      selectedTab = 4;
      break;
    case '/apps/profiles/account/organisation':
      selectedTab = 0;
      break;
    default:
      selectedTab = 0;
  }

  const [value, setValue] = useState(selectedTab);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const inputRef = useRef<HTMLInputElement>(null);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <>
      <MainCard border={false} boxShadow>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '100%' }}>
          <Tabs value={value} onChange={handleChange} variant="scrollable" scrollButtons="auto" aria-label="account profile tab">
            <Tab label="Organisation Details" component={Link} to="/apps/profiles/account/organisation" icon={<BuildOutlined />} iconPosition="start" />
            <Tab label="Profile" component={Link} to="/apps/profiles/account/user" icon={<UserOutlined />} iconPosition="start" />
            <Tab label="Change Password" component={Link} to="/apps/profiles/account/password" icon={<LockOutlined />} iconPosition="start" />
            <Tab disabled label="Verifiable Credential" component={Link} to="/apps/profiles/account/verifiable-credential" icon={<TeamOutlined />} iconPosition="start" />
            <Tab disabled label="Settings" component={Link} to="/apps/profiles/account/settings" icon={<SettingOutlined />} iconPosition="start" />
          </Tabs>
        </Box>
        <Box sx={{ mt: 2.5 }}>
          {value === 0 && <ProfileCard url="/apps/profiles/edit/organisation" title="Edit Organisation details" focusInput={focusInput} percentage={45} />}
          {value === 1 && <ProfileCard url="/apps/profiles/edit/user" title="Edit your details" focusInput={focusInput} percentage={85} />}
          <Outlet />
        </Box>
      </MainCard>
    </>
  );
};

export default AccountProfile;
