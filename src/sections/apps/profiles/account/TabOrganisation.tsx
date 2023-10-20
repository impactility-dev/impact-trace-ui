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
  Typography,
  OutlinedInput,
  IconButton,
  InputAdornment
} from '@mui/material';

// third-party
import { PatternFormat } from 'react-number-format';

// project import
import MainCard from 'components/MainCard';
import Avatar from 'components/@extended/Avatar';
import LinearWithLabel from 'components/@extended/progress/LinearWithLabel';

// assets
import { AimOutlined, EnvironmentOutlined, EyeInvisibleOutlined, EyeOutlined, MailOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons';
import { values } from 'lodash';
import { useState } from 'react';

import useAuth from 'hooks/useAuth';

const avatarImage = require.context('assets/images/logo', true);

// ==============================|| ACCOUNT PROFILE - BASIC ||============================== //

const TabProfile = () => {

  const { user } = useAuth();

  const matchDownMD = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const [showPassword, setShowPassword] = useState(false);
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={3}>
            <MainCard sx={{ height: '100%' }}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Stack spacing={2.5} alignItems="center">
                    <Avatar sx={{border: '1px solid #E9E9E9'}} alt="Avatar 1" size='xl' src={avatarImage(`./Impactility.png`)} />
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h5" mb={2}>Contact Details</Typography>
                  <List component="nav" aria-label="main mailbox folders" sx={{ py: 0, '& .MuiListItem-root': { p: 0, py: 1 } }}>
                    <ListItem>
                      <ListItemIcon>
                        <UserOutlined />
                      </ListItemIcon>
                      <ListItemSecondaryAction>
                        <Typography align="right">John Doe</Typography>
                      </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <MailOutlined />
                      </ListItemIcon>
                      <ListItemSecondaryAction>
                        <Typography align="right">johndoe@xyz.com</Typography>
                      </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <PhoneOutlined />
                      </ListItemIcon>
                      <ListItemSecondaryAction>
                        <Typography align="right">+91 9876 543210</Typography>
                      </ListItemSecondaryAction>
                    </ListItem>
                  </List>
                </Grid>
              </Grid>
            </MainCard>
          </Grid>
          <Grid item xs={12} sm={9}>
            <MainCard sx={{ height: '100%' }}>
              <List sx={{ py: 0 }}>
                <ListItem divider={!matchDownMD}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Stack spacing={0.5}>
                        <Typography color="secondary">Organisation Legal Name</Typography>
                        <Typography>Impactitlity Pvt Ltd</Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Stack spacing={0.5}>
                        <Typography color="secondary">Type of Organisation</Typography>
                        <Typography>Lorem Ipsum</Typography>
                      </Stack>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem divider={!matchDownMD}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Stack spacing={0.5}>
                        <Typography color="secondary">Corporate Identity Number</Typography>
                        <Typography>
                          27AABCI1234P1Z5
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Stack spacing={0.5}>
                        <Typography color="secondary">Country</Typography>
                        <Typography>India</Typography>
                      </Stack>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem divider={!matchDownMD}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Stack spacing={0.5}>
                        <Typography color="secondary">Website</Typography>
                        <Link href="https://impactility.com" target='_blank'>https://impactility.com</Link>
                      </Stack>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Stack spacing={0.5}>
                        <Typography color="secondary">Head Office Address</Typography>
                        <Typography>Street 110-B Kalians Bag, Dewan, M.P. New York</Typography>
                      </Stack>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Stack spacing={0.5} sx={{ width: '100%' }}>
                    <Typography color="secondary">Decentralized Identity</Typography>
                    <OutlinedInput
                      id="outlined-adornment-password"
                      type={showPassword ? 'text' : 'password'}
                      contentEditable={false}
                      readOnly={true}
                      fullWidth
                      value={'did:polygonid:polygon:mumbai:2qD9iHSw8UDrSV2kW2bimVKqwmUFwVkan8rhth3n3L'}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => setShowPassword(!showPassword)}
                            onMouseDown={() => setShowPassword(!showPassword)}
                            edge="end"
                            color="secondary"
                          >
                            {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </Stack>

                </ListItem>
              </List>
            </MainCard>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default TabProfile;
