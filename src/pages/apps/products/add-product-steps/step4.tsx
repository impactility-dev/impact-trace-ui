// material-ui
import { UploadOutlined } from '@ant-design/icons';
import { Grid, InputLabel, Typography, TextField, Button, FormHelperText, Stack } from '@mui/material';
import MainCard from 'components/MainCard';
import { Formik } from 'formik';
import UploadSingleFile from 'components/third-party/dropzone/SingleFile';
import * as yup from 'yup';


// ==============================|| BASIC WIZARD - ADDRESS  ||============================== //

export default function Step4() {
  return (
    <>
      <Grid container spacing={4}>

        <Grid item xs={12}>

          <Grid container direction="column" spacing={2}>
            <Grid item xs={12}>
              <MainCard title="Upload Impact Analysis">
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
                            <UploadSingleFile setFieldValue={setFieldValue} file={values.files} error={touched.files && !!errors.files} />
                            {touched.files && errors.files && (
                              <FormHelperText error id="standard-weight-helper-text-password-login">
                                {errors.files}
                              </FormHelperText>
                            )}
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
    </>
  );
}
