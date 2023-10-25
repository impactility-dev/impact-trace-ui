import { useRef } from 'react';

// material-ui
import { Grid } from '@mui/material';
import { Outlet } from 'react-router';

// project import
import ProfileCard from 'sections/apps/profiles/edit/ProfileCard';
import ProfileTabs from 'sections/apps/profiles/edit/ProfileTabs';

// ==============================|| PROFILE - USER ||============================== //

const UserProfile = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={0} sm={1}  />
      <Grid item xs={12} sm={10}  >
        <Outlet context={inputRef} />
      </Grid>
      <Grid item xs={0} sm={1}  />
    </Grid>
  );
};

export default UserProfile;
