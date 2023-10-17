// material-ui
import { UploadOutlined } from '@ant-design/icons';
import UploadAvatar from 'components/third-party/dropzone/Avatar';
import { Grid, InputLabel, Typography, TextField, Button, FormHelperText, Stack } from '@mui/material';
import MainCard from 'components/MainCard';
import { Formik } from 'formik';
import * as yup from 'yup';

// ==============================|| BASIC WIZARD - ADDRESS  ||============================== //

export default function Step1() {
  return (
      <MainCard title="Product Information">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <Grid container spacing={1} direction="column">
              <Grid item xs={12}>
                <InputLabel sx={{ mb: 1 }}>Product Name</InputLabel>
                <TextField placeholder="Enter product name" fullWidth />
              </Grid>
              <Grid item xs={12}>
                <InputLabel sx={{ mb: 1 }}>Model No.</InputLabel>
                <TextField placeholder="Enter your model number" fullWidth />
              </Grid>
              <Grid item xs={12}>
                <InputLabel sx={{ mb: 1 }}>Category</InputLabel>
                <TextField placeholder="Enter your category" fullWidth />
              </Grid>
              <Grid item xs={12}>
                <InputLabel sx={{ mb: 1 }}>Product Description</InputLabel>
                <TextField placeholder="Enter product description" fullWidth multiline rows={3} />
              </Grid>
            </Grid>

          </Grid>
          <Grid item xs={12} sm={6}>

            <Grid container direction="column" spacing={2}>
              <Grid item xs={12}>
                <MainCard title="Upload Logo">
                  <Formik
                    initialValues={{ files: null }}
                    onSubmit={(values: any) => {
                      // submit form
                    }}
                    validationSchema={yup.object().shape({
                      files: yup.mixed().required('Avatar is a required.')
                    })}
                  >
                    {({ values, handleSubmit, setFieldValue, touched, errors }) => (
                      <form onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                          <Grid item xs={12}>
                            <Stack spacing={1.5} alignItems="center">
                              <UploadAvatar setFieldValue={setFieldValue} file={values.files} error={touched.files && !!errors.files} />
                              {touched.files && errors.files && (
                                <FormHelperText error id="standard-weight-helper-text-password-login">
                                  {errors.files}
                                </FormHelperText>
                              )}
                              <Stack spacing={0}>
                                <Typography align="center" variant="caption" color="secondary">
                                  Allowed 'image/*'
                                </Typography>
                                <Typography align="center" variant="caption" color="secondary">
                                  *.png, *.jpeg, *.jpg, *.gif
                                </Typography>
                              </Stack>
                            </Stack>
                          </Grid>
                          <Grid item xs={12}>
                            <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={2}>
                              <Button color="error" onClick={() => setFieldValue('files', null)}>
                                Cancel
                              </Button>
                              <Button type="submit" variant="contained">
                                Submit
                              </Button>
                            </Stack>
                          </Grid>
                        </Grid>
                      </form>
                    )}
                  </Formik>
                </MainCard>
              </Grid>

            </Grid>

          </Grid>
        </Grid>
      </MainCard>
  );
}
