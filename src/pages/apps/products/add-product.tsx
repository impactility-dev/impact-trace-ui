import { useState } from 'react';

import { useNavigate } from 'react-router-dom';


// material-ui
import { Button, Step, Stepper, StepLabel, Stack, Typography } from '@mui/material';

// project imports
import Step1 from './add-product-steps/step1'
import Step2 from './add-product-steps/step2';
import Step3 from './add-product-steps/step3';
import Step4 from './add-product-steps/step4';
import Step5 from './add-product-steps/step5';
import Step6 from './add-product-steps/step6';
import MainCard from 'components/MainCard';
import AnimateButton from 'components/@extended/AnimateButton';

// step options
const steps = ['Product Information', 'Specification', 'Bill of Materials', 'LCA Details', 'Sustainability Indicators', 'Summary'];

function getStepContent(step: number) {
  switch (step) {
    case 0:
      return <Step1 />;
    case 1:
      return <Step2 />;
    case 2:
      return <Step3 />;
    case 3:
      return <Step4 />;
    case 4:
      return <Step5 />;
    case 5:
      return <Step6 />;
    default:
      throw new Error('Unknown step');
  }
}

// ==============================|| FORMS WIZARD - BASIC ||============================== //

const AddNewProduct = () => {

  const history = useNavigate();

  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <MainCard>
      <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <>
        {activeStep === steps.length ? (
          <>
            <Typography variant="h5" gutterBottom>
              Product has been created successfully!
            </Typography>
            <Typography variant="subtitle1">
              It has been sent for approval and will be available in the catalog once approved.
            </Typography>
            <Stack direction="row" justifyContent="flex-end">
              <AnimateButton>
                <Button variant="contained" color="success" onClick={
                  () => {
                    history("/apps/products/product-list");
                  }
                } sx={{ my: 3, ml: 1 }}>
                  Done
                </Button>
              </AnimateButton>
            </Stack>
          </>
        ) : (
          <>
            {getStepContent(activeStep)}
            <Stack direction="row" justifyContent={activeStep !== 0 ? 'space-between' : 'flex-end'}>
              {activeStep !== 0 && (
                <Button onClick={handleBack} sx={{ my: 3, ml: 1 }}>
                  Back
                </Button>
              )}
              <AnimateButton>
                <Button variant="contained" onClick={handleNext} sx={{ my: 3, ml: 1 }}>
                  {activeStep === steps.length - 1 ? 'Create Now' : activeStep === steps.length - 2 ? 'Summary' : 'Next'}
                </Button>
              </AnimateButton>
            </Stack>
          </>
        )}
      </>
    </MainCard>
  );
};

export default AddNewProduct;
