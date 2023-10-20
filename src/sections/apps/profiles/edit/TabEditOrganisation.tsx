import { ChangeEvent, RefObject, useEffect, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router';

// material-ui
import {
  Autocomplete,
  Avatar,
  Box,
  Button,
  CardHeader,
  Chip,
  Divider,
  FormHelperText,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
  useTheme
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project import
import { dispatch } from 'store';
import { openSnackbar } from 'store/reducers/snackbar';
import countries from 'data/countries';
import MainCard from 'components/MainCard';

// assets
import { CameraOutlined, CloseOutlined } from '@ant-design/icons';
import theme from 'themes/theme';
import { ThemeMode } from 'types/config';

// styles & constant
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP
    }
  }
};

const skills = [
  'Adobe XD',
  'After Effect',
  'Angular',
  'Animation',
  'ASP.Net',
  'Bootstrap',
  'C#',
  'CC',
  'Corel Draw',
  'CSS',
  'DIV',
  'Dreamweaver',
  'Figma',
  'Graphics',
  'HTML',
  'Illustrator',
  'J2Ee',
  'Java',
  'Javascript',
  'JQuery',
  'Logo Design',
  'Material UI',
  'Motion',
  'MVC',
  'MySQL',
  'NodeJS',
  'npm',
  'Photoshop',
  'PHP',
  'React',
  'Redux',
  'Reduxjs & tooltit',
  'SASS',
  'SCSS',
  'SQL Server',
  'SVG',
  'UI/UX',
  'User Interface Designing',
  'Wordpress'
];

function useInputRef() {
  return useOutletContext<RefObject<HTMLInputElement>>();
}

// ==============================|| TAB - PERSONAL ||============================== //

const TabPersonal = () => {
  const handleChangeDay = (event: SelectChangeEvent<string>, date: Date, setFieldValue: (field: string, value: any) => void) => {
    setFieldValue('dob', new Date(date.setDate(parseInt(event.target.value, 10))));
  };

  const handleChangeMonth = (event: SelectChangeEvent<string>, date: Date, setFieldValue: (field: string, value: any) => void) => {
    setFieldValue('dob', new Date(date.setMonth(parseInt(event.target.value, 10))));
  };

  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() - 18);

  const inputRef = useInputRef();

  const avatarImage = require.context('assets/images/users', true);

  const theme = useTheme();
  const [selectedImage, setSelectedImage] = useState<File | undefined>(undefined);
  const [avatar, setAvatar] = useState<string | undefined>(avatarImage(`./default.png`));

  useEffect(() => {
    if (selectedImage) {
      setAvatar(URL.createObjectURL(selectedImage));
    }
  }, [selectedImage]);

  const history = useNavigate();

  return (
    <MainCard content={false} title="Personal Information" sx={{ '& .MuiInputLabel-root': { fontSize: '0.875rem' } }}>
      <Grid item xs={12}>
        <Stack spacing={2.5} alignItems="center">
          <FormLabel
            htmlFor="change-avtar"
            sx={{
              position: 'relative',
              borderRadius: '50%',
              overflow: 'hidden',
              '&:hover .MuiBox-root': { opacity: 1 },
              cursor: 'pointer'
            }}
          >
            <Avatar alt="Avatar 1" src={avatar} sx={{ width: 124, height: 124, border: '1px dashed' }} />
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                backgroundColor: theme.palette.mode === ThemeMode.DARK ? 'rgba(255, 255, 255, .75)' : 'rgba(0,0,0,.65)',
                width: '100%',
                height: '100%',
                opacity: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Stack spacing={0.5} alignItems="center">
                <CameraOutlined style={{ color: theme.palette.secondary.lighter, fontSize: '2rem' }} />
                <Typography sx={{ color: 'secondary.lighter' }}>Upload</Typography>
              </Stack>
            </Box>
          </FormLabel>
          <TextField
            type="file"
            id="change-avtar"
            placeholder="Outlined"
            variant="outlined"
            sx={{ display: 'none' }}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setSelectedImage(e.target.files?.[0])}
          />
        </Stack>
      </Grid>
      <Formik
        initialValues={{
          firstname: 'Impact Trace',
          lastname: 'Admin',
          email: 'admin@impacttrace.com',
          countryCode: '+91',
          contact: '',
          designation: 'Super Admin',
          address: '',
          address1: '',
          country: 'IN',
          state: '',
          submit: null,
          did: '',
          website: '',
        }}
        validationSchema={Yup.object().shape({
          firstname: Yup.string().max(255).required('First Name is required.'),
          lastname: Yup.string().max(255).required('Last Name is required.'),
          email: Yup.string().email('Invalid email address.').max(255).required('Email is required.'),
          dob: Yup.date().max(maxDate, 'Age should be 18+ years.').required('Date of birth is requird.'),
          contact: Yup.number()
            .test('len', 'Contact should be exactly 10 digit', (val) => val?.toString().length === 10)
            .required('Phone number is required'),
          designation: Yup.string().required('Designation is required'),
          address: Yup.string().min(50, 'Address to short.').required('Address is required'),
          country: Yup.string().required('Country is required'),
          state: Yup.string().required('State is required'),
          note: Yup.string().min(150, 'Not shoulde be more then 150 char.')
        })}
        onSubmit={(values, { setErrors, setStatus, setSubmitting }) => {
          try {
            dispatch(
              openSnackbar({
                open: true,
                message: 'Personal profile updated successfully.',
                variant: 'alert',
                alert: {
                  color: 'success'
                },
                close: false
              })
            );
            setStatus({ success: false });
            setSubmitting(false);
          } catch (err: any) {
            setStatus({ success: false });
            setErrors({ submit: err.message });
            setSubmitting(false);
          }
        }}
      >
        {({ handleBlur, handleChange, handleSubmit, setFieldValue, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Box sx={{ p: 2.5 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="personal-first-name">First Name</InputLabel>
                    <TextField
                      fullWidth
                      id="personal-first-name"
                      value={values.firstname}
                      name="firstname"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="First Name"
                      autoFocus
                      inputRef={inputRef}
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="personal-last-name">Last Name</InputLabel>
                    <TextField
                      fullWidth
                      id="personal-last-name"
                      value={values.lastname}
                      name="lastname"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Last Name"
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="personal-email">Email Address</InputLabel>
                    <TextField
                      type="email"
                      fullWidth
                      value={values.email}
                      name="email"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      id="personal-email"
                      placeholder="Email Address"
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="personal-email">Decentralized Identity</InputLabel>
                    <TextField
                      type="text"
                      fullWidth
                      value={values.did}
                      name="did"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      id="personal-email"
                      placeholder="Enter did"
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="personal-phone">Phone Number</InputLabel>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                      <Select value={values.countryCode} name="countryCode" onBlur={handleBlur} onChange={handleChange}>
                        <MenuItem value="+91">+91</MenuItem>
                        <MenuItem value="1-671">1-671</MenuItem>
                        <MenuItem value="+36">+36</MenuItem>
                        <MenuItem value="(225)">(255)</MenuItem>
                        <MenuItem value="+39">+39</MenuItem>
                        <MenuItem value="1-876">1-876</MenuItem>
                        <MenuItem value="+7">+7</MenuItem>
                        <MenuItem value="(254)">(254)</MenuItem>
                        <MenuItem value="(373)">(373)</MenuItem>
                        <MenuItem value="1-664">1-664</MenuItem>
                        <MenuItem value="+95">+95</MenuItem>
                        <MenuItem value="(264)">(264)</MenuItem>
                      </Select>
                      <TextField
                        fullWidth
                        id="personal-contact"
                        value={values.contact}
                        name="contact"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder="Contact Number"
                      />
                    </Stack>
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="personal-designation">Designation</InputLabel>
                    <TextField
                      fullWidth
                      id="personal-designation"
                      value={values.designation}
                      name="designation"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Designation"
                    />
                  </Stack>
                </Grid>
              </Grid>
            </Box>
            <CardHeader title="Address" />
            <Divider />
            <Box sx={{ p: 2.5 }}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="personal-addrees1">Address line 1</InputLabel>
                    <TextField
                      fullWidth
                      id="personal-addrees1"
                      value={values.address}
                      name="address"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Line 1"
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="personal-addrees2">Address line 2</InputLabel>
                    <TextField
                      fullWidth
                      id="personal-addrees2"
                      value={values.address1}
                      name="address1"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Line 2"
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="personal-country">Country</InputLabel>
                    <Autocomplete
                      id="personal-country"
                      fullWidth
                      value={countries.filter((item) => item.code === values?.country)[0]}
                      onBlur={handleBlur}
                      onChange={(event, newValue) => {
                        setFieldValue('country', newValue === null ? '' : newValue.code);
                      }}
                      options={countries}
                      autoHighlight
                      isOptionEqualToValue={(option, value) => option.code === value?.code}
                      getOptionLabel={(option) => option.label}
                      renderOption={(props, option) => (
                        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                          {option.code && (
                            <img
                              loading="lazy"
                              width="20"
                              src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                              srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                              alt=""
                            />
                          )}
                          {option.label}
                          {option.code && `(${option.code}) ${option.phone}`}
                        </Box>
                      )}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder="Choose a country"
                          name="country"
                          inputProps={{
                            ...params.inputProps,
                            autoComplete: 'new-password' // disable autocomplete and autofill
                          }}
                        />
                      )}
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="personal-state">State</InputLabel>
                    <TextField
                      fullWidth
                      id="personal-state"
                      value={values.state}
                      name="state"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="State"
                    />
                  </Stack>
                </Grid>
              </Grid>
              <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={2} sx={{ mt: 2.5 }}>
                <Button variant="outlined" color="secondary" onClick={()=>(
                  history('/apps/profiles/account/basic')
                )} >
                Cancel
              </Button>
              <Button type="submit" variant="contained" onClick={()=>(
                  history('/apps/profiles/account/basic')
                )} >
                Save
              </Button>
            </Stack>
          </Box>
          </form>
        )}
    </Formik>
    </MainCard >
  );
};

export default TabPersonal;
