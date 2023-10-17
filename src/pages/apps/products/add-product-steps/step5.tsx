// material-ui
import ForestIcon from '@mui/icons-material/Forest';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import CloudIcon from '@mui/icons-material/Cloud';
import EnergySavingsLeafIcon from '@mui/icons-material/EnergySavingsLeaf';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';

import { Grid, InputLabel, Typography, TextField, Button, FormControlLabel, Checkbox, FormHelperText, IconButton, Stack } from '@mui/material';
import MainCard from 'components/MainCard';
import { AppstoreOutlined, UnorderedListOutlined, UploadOutlined } from '@ant-design/icons';
import * as yup from 'yup';
import UploadMultiFile from 'components/third-party/dropzone/MultiFile';
import list from '@fullcalendar/list';
import { Formik } from 'formik';
import { useState } from 'react';


// ==============================|| BASIC WIZARD - ADDRESS  ||============================== //

function Checklists({ list }: { list: string[] }) {
  return (
    <>
      {list.map((item) => (
        <Grid item xs={12} key={item}>
          <FormControlLabel control={<Checkbox />} label={item} />
        </Grid>
      ))}
    </>
  );
}

const Indicators = [{
  icon: <ForestIcon />,
  title: "Environmental",
  checklist: [
    "Land Usage",
    "Waste generation",
    "Raw material sourcing",
    "Toxic emission & waste",
    "Green building",
  ]
},
{
  icon: <WaterDropIcon />,
  title: "Water",
  checklist: [
    "Surface fresh water",
    "Renewable ground water",
    "Non-renewable ground water",
  ]
},
{
  icon: <CloudIcon />,
  title: "Air",
  checklist: [
    "Carbon Dioxide (CO2)",
    "Methane (CH4)",
    "Nitrous Oxide (N2O)",
    "Hydrofluorocarbons (HFCs)",
    "Perfluorocarbons (PFCs)"
  ]
},
{
  icon: <EnergySavingsLeafIcon />,
  title: "Energy",
  checklist: [
    "Fossil fuel",
    "Comulative energy demand",
    "Renewable energy consumption",
    "Non-renewable energy consumption",
  ]
},
{
  icon: <HealthAndSafetyIcon />,
  title: "Social",
  checklist: [
    "Health & safety",
    "Human capital development",
    "Labour Management",
    "Supply chain labour standards",
    "Privacy & data security",
  ]
}
]

export default function Step5() {
  return (
    <>
      <MainCard title=" Sustainability Indicators" sx={{ marginBottom: 2 }}>
        <Grid container spacing={2}>
          {Indicators.map((item) => (
            <Grid item xs={12} sm={4} md={4} lg={3} pb={1}>
              <MainCard sx={{
                minHeight: '100%',
                display: 'flex',
                flexDirection: 'column',
                // justifyContent: 'center'
              }}>
                <Grid container spacing={2} textAlign="center" >
                  <Grid item xs={12}>
                    {item.icon}
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="subtitle1" gutterBottom sx={{ mb: 2 }}>
                      {item.title}
                    </Typography>
                  </Grid>
                </Grid>
                <Checklists list={item.checklist} />
              </MainCard>
            </Grid>
          ))}
        </Grid>
      </MainCard>
      <MainCard
        title="Upload Certificates"
      >
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
                    <UploadMultiFile
                      showList={false}
                      setFieldValue={setFieldValue}
                      files={values.files}
                      error={touched.files && !!errors.files}
                    />
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
    </>
  );
}
