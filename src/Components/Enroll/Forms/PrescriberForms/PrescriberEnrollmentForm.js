import React, { useState } from 'react';
import { Button, Link, StepLabel, Paper, Stepper, Step, Typography, makeStyles } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import Review from './Review';
import AddressForm from './AddressForm';
import PrescriberDemographics from './PrescriberDemographics';


const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

const steps = ['Personal Information', 'Address', 'Review enrollment information'];

function getStepContent(step, page1, page2) {
  switch (step) {
    case 0:
      return <PrescriberDemographics values={page1.values} setters={page1.setters} />;
    case 1:
      return <AddressForm values={page2.values} setters={page2.setters} />;
    case 2:
      return <Review values={[...page1.values, ...page2.values]} />;
    default:
      throw new Error('Unknown step');
  }
}

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function PrescriberEnrollmentForm() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [faxNumber, setFaxNumber] = useState('');
  const [npiNumber, setNpiNumber] = useState('');
  const [deaNumber, setDeaNumber] = useState('');
  const [email, setEmail] = useState('');
  
  const [practiceName, setPracticeName] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [country, setCountry] = useState('');

  const page1 = {
    values:[firstName,lastName,phoneNumber,faxNumber,npiNumber,deaNumber, email],
    setters:[setFirstName, setLastName, setPhoneNumber, setFaxNumber, setNpiNumber, setDeaNumber, setEmail]
  }
  const page2 = {
    values:[practiceName, address1, address2, city, state, zip, country],
    setters:[setPracticeName, setAddress1, setAddress2, setCity, setState, setZip, setCountry]
  }

  const handleNext = () => {
    if(activeStep === 0){
      if(firstName !== "" && lastName !== "" && phoneNumber !== "" && faxNumber !== "" && npiNumber !== "" && deaNumber !== "" && email !== ""){
        setActiveStep(activeStep + 1);
      }
    }
    else if(activeStep === 1){
      if(practiceName !== "" && address1 !== "" && address2 !== "" && city !== "" && state !== "" && zip !== "" && country !== ""){
        setActiveStep(activeStep + 1);
      }
    }
    else {
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Prescriber Enrollment
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
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
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  Your order number is #2001539. We have emailed your order confirmation, and will
                  send you an update when your order has shipped.
                </Typography>
              </>
            ) : (
              <>
                {getStepContent(activeStep, page1, page2)}
                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} className={classes.button}>
                      Back
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                  </Button>
                </div>
              </>
            )}
          </>
        </Paper>
        <Copyright />
      </main>
    </>
  );
}