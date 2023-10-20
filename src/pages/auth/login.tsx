import { Link } from 'react-router-dom';

// material-ui
import { Divider, Grid, Stack, Typography } from '@mui/material';

// project import
import useAuth from 'hooks/useAuth';
import AuthWrapper from 'sections/auth/AuthWrapper';
import AuthLogin from 'sections/auth/auth-forms/AuthLogin';
import qrCode from '../../assets/images/qr-code.png'
// ================================|| LOGIN ||================================ //

const Login = () => {
  const { isLoggedIn } = useAuth();

  return (
    <AuthWrapper>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
              <Typography variant="h3">Login</Typography>
              <Typography
                component={Link}
                to={isLoggedIn ? '/auth/register' : '/register'}
                variant="body1"
                sx={{ textDecoration: 'none' }}
                color="primary"
              >
                Don&apos;t have an account?
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <AuthLogin isDemo={isLoggedIn} />
          </Grid>
        </Grid>
      <Grid item xs={12} textAlign={'center'} sx={{my: 2}}>
          OR
      </Grid>
      <Grid container spacing={3}>
      <Grid item xs={12} textAlign={'center'}>
            <Typography variant="body1">Scan the below QR code with Impact<span style={{color: 'green'}}>ID</span> app to login</Typography>
        </Grid>
        <Grid item xs={12} textAlign={'center'} sx={{pt: 0}}>
        <img
              src={qrCode}
              alt={'ImpactID'}
              style={{
                 height: 200,
                 marginLeft: 'auto',
                 marginRight: 'auto'
              }}
            />
        </Grid>
      </Grid>
    </AuthWrapper>
  );
};

export default Login;
