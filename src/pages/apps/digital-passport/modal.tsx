import { useEffect, useState, ChangeEvent } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Box,
    Button,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    FormHelperText,
    InputLabel,
    ListItemText,
    MenuItem,
    OutlinedInput,
    Select,
    SelectChangeEvent,
    Stack,
    Switch,
    TextField,
    Tooltip,
    Typography
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

// third-party
import _ from 'lodash';
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider, FormikValues } from 'formik';

// project imports
import Avatar from 'components/@extended/Avatar';
import IconButton from 'components/@extended/IconButton';

import { dispatch } from 'store';
import { openSnackbar } from 'store/reducers/snackbar';

// assets
import { CameraOutlined, DeleteFilled, UploadOutlined } from '@ant-design/icons';

// types
import { ThemeMode } from 'types/config';
import ModalBatchTable from './table/modal-table';

const avatarImage = require.context('assets/images/users', true);

// constant
const getInitialValues = (customer: FormikValues | null) => {
    const newCustomer = {
        name: '',
        email: '',
        location: '',
        orderStatus: ''
    };

    if (customer) {
        newCustomer.name = customer.fatherName;
        newCustomer.location = customer.address;
        return _.merge({}, newCustomer, customer);
    }

    return newCustomer;
};

const allStatus = ['Discover 125', 'Avenger 225', 'Pulsar 150'];

// ==============================|| CUSTOMER ADD / EDIT ||============================== //

export interface Props {
    customer?: any;
    onCancel: () => void;
}

const AddProductionPlant = ({ onCancel }: Props) => {


    const CustomerSchema = Yup.object().shape({
        name: Yup.string().max(255).required('Name is required'),
        orderStatus: Yup.string().required('Status is required'),
        email: Yup.string().max(255).required('Email is required').email('Must be a valid email'),
        location: Yup.string().max(500)
    });



    const formik = useFormik({
        initialValues: getInitialValues(null!),
        validationSchema: CustomerSchema,
        onSubmit: (values, { setSubmitting }) => {
            try {
                // const newCustomer = {
                //   name: values.name,
                //   email: values.email,
                //   location: values.location,
                //   orderStatus: values.orderStatus
                // };

                
                    // dispatch(createCustomer(newCustomer)); - add
                    dispatch(
                        openSnackbar({
                            open: true,
                            message: 'Customer added successfully.',
                            variant: 'alert',
                            alert: {
                                color: 'success'
                            },
                            close: false
                        })
                    );


                setSubmitting(false);
                onCancel();
            } catch (error) {
                console.error(error);
            }
        }
    });

    const { errors, touched, handleSubmit, isSubmitting, getFieldProps, setFieldValue } = formik;

    return (
        <>
            <FormikProvider value={formik}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                        <DialogTitle>{ 'Add Batch'}</DialogTitle>
                        <Divider />
                        <DialogContent sx={{ p: 2.5 }}>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12}>
                                            <Stack spacing={1.25}>
                                                <InputLabel htmlFor="customer-orderStatus">Product</InputLabel>
                                                <FormControl fullWidth>
                                                    <Select
                                                        id="column-hiding"
                                                        displayEmpty
                                                        {...getFieldProps('orderStatus')}
                                                        onChange={(event: SelectChangeEvent<string>) => setFieldValue('orderStatus', event.target.value as string)}
                                                        input={<OutlinedInput id="select-column-hiding" placeholder="Sort by" />}
                                                        renderValue={(selected) => {
                                                            if (!selected) {
                                                                return <Typography variant="subtitle1">Select Product</Typography>;
                                                            }

                                                            return <Typography variant="subtitle2">{selected}</Typography>;
                                                        }}
                                                    >
                                                        {allStatus.map((column: any) => (
                                                            <MenuItem key={column} value={column}>
                                                                <ListItemText primary={column} />
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                                {touched.orderStatus && errors.orderStatus && (
                                                    <FormHelperText error id="standard-weight-helper-text-email-login" sx={{ pl: 1.75 }}>
                                                        {errors.orderStatus}
                                                    </FormHelperText>
                                                )}
                                            </Stack>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Stack spacing={1.25}>
                                                <InputLabel htmlFor="customer-email">Quantity</InputLabel>
                                                <TextField
                                                    fullWidth
                                                    id="customer-email"
                                                    placeholder="Enter Quantity"
                                                    {...getFieldProps('email')}
                                                    // error={Boolean(touched.email && errors.email)}
                                                    // helperText={touched.email && errors.email}
                                                />
                                            </Stack>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Stack spacing={1.25}>
                                                <InputLabel sx={{display: 'contents'}} htmlFor="customer-name">Batch Number</InputLabel> or 
                                                <a href="#" style={{textDecoration:'none', color: 'green', display: 'contents'}} > Auto Generate</a>
                                                <TextField
                                                    fullWidth
                                                    id="customer-name"
                                                    placeholder="Enter Batch Number"
                                                    {...getFieldProps('name')}
                                                    // error={Boolean(touched.name && errors.name)}
                                                    // helperText={touched.name && errors.name}
                                                />
                                            </Stack>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Stack spacing={1.25}>
                                                <InputLabel htmlFor="customer-location">Serial Number</InputLabel>
                                            </Stack>
                                            <Grid item xs={12}>
                                                <Typography color="error.main">
                                                    *{' '}
                                                    <Typography component="span" color="textSecondary">
                                                        Recommended size is less than 2 MB with file size. (Filetype : csv)
                                                    </Typography>
                                                </Typography>
                                                <Button variant="outlined" color="secondary" startIcon={<UploadOutlined />} sx={{ mt: 1, textTransform: 'none' }}>
                                                    Click to Upload
                                                </Button>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Stack spacing={1.25}>
                                                <InputLabel htmlFor="customer-name">Material Required</InputLabel>
                                                <ModalBatchTable />
                                            </Stack>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </DialogContent>
                        <Divider />
                        <DialogActions sx={{ p: 2.5 }}>
                            <Grid container justifyContent="space-between" alignItems="center">
                                <Grid item>
                                </Grid>
                                <Grid item>
                                    <Stack direction="row" spacing={2} alignItems="center">
                                        <Button color="error" onClick={onCancel}>
                                            Cancel
                                        </Button>
                                        <Button type="submit" variant="contained" onClick={onCancel}>
                                            Add
                                        </Button>
                                    </Stack>
                                </Grid>
                            </Grid>
                        </DialogActions>
                    </Form>
                </LocalizationProvider>
            </FormikProvider>
        </>
    );
};

export default AddProductionPlant;
