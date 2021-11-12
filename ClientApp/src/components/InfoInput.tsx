import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import BasicInfo from './BasicInfo';
import IncomeCal from './IncomeCal';
import IncomeAdjust from './IncomAdjust';
import Confirm from './Confirm';
import axios from 'axios';

import { Context } from './Context';

function getSteps(): string[] {
  return [
    '基本情報',
    '所得金額計算',
    '所得金額調整',
    '入力確認'
  ]
}

function InfoInput() {
  // const response = axios.get('/api/InfoInput');
  const [currentState, setCurrentState] = React.useState({});
  const value = {
      currentState,
      setCurrentState
  };
  const [activeStep, setActiveStep] = React.useState(0);
  const steps: string[] = getSteps();
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleReset = () => {
      setActiveStep(0);
  };

  function getStepContent(stepIndex: number) {
    switch (stepIndex) {
      case 0:
          return <BasicInfo handleNext={handleNext} />;
      case 1:
          return <IncomeCal handleNext={handleNext} handleBack={handleBack}/>;
      case 2:
          return <IncomeAdjust handleNext={handleNext} handleBack={handleBack}/>;
      case 3:
          return <Confirm handleBack={handleBack}/>;
      default:
          return 'Unknown stepIndex';
    }
  }
  
  return (
    <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 8, pb: 6 }}>
      <Grid container  spacing={10}>
        <Grid item sm={2}/>
        <Grid item lg={8} sm={8}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <Typography
            component="h1"
            variant="h4"
            align="center"
            color="text.primary"
            gutterBottom
          >
            {steps[activeStep]}
          </Typography>
          <Context.Provider value={value}>
              { getStepContent(activeStep) }
          </Context.Provider>
        </Grid>
      </Grid>
    </Container>
  );
}

export default InfoInput;