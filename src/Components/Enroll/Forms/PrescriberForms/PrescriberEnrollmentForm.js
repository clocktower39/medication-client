import React, { useState } from "react";
import { Button, Link, StepLabel, Paper, Stepper, Step, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Review from "./Review";
import AddressForm from "./AddressForm";
import PrescriberDemographics from "./PrescriberDemographics";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto",
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
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

const steps = ["Personal Information", "Address", "Review enrollment information"];

function getStepContent(step, page1, page2) {
  switch (step) {
    case 0:
      return <PrescriberDemographics values={page1.values} />;
    case 1:
      return <AddressForm values={page2.values} />;
    case 2:
      return <Review values={{ ...page1.values, ...page2.values }} />;
    default:
      throw new Error("Unknown step");
  }
}

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        MattKearns.dev
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function PrescriberEnrollmentForm() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);

  const [firstName, setFirstName] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastName, setLastName] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [faxNumber, setFaxNumber] = useState("");
  const [faxNumberError, setFaxNumberError] = useState("");
  const [npiNumber, setNpiNumber] = useState("");
  const [npiNumberError, setNpiNumberError] = useState("");
  const [deaNumber, setDeaNumber] = useState("");
  const [deaNumberError, setDeaNumberError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const [practiceName, setPracticeName] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [country, setCountry] = useState("");
  const [practiceNameError, setPracticeNameError] = useState("");
  const [address1Error, setAddress1Error] = useState("");
  const [address2Error, setAddress2Error] = useState("");
  const [cityError, setCityError] = useState("");
  const [stateError, setStateError] = useState("");
  const [zipError, setZipError] = useState("");
  const [countryError, setCountryError] = useState("");

  const page1 = {
    values: {
      firstName: {
        value: firstName,
        setValue: setFirstName,
        error: firstNameError,
        setError: setFirstNameError,
      },
      lastName: {
        value: lastName,
        setValue: setLastName,
        error: lastNameError,
        setError: setLastNameError,
      },
      phoneNumber: {
        value: phoneNumber,
        setValue: setPhoneNumber,
        error: phoneNumberError,
        setError: setPhoneNumberError,
      },
      faxNumber: {
        value: faxNumber,
        setValue: setFaxNumber,
        error: faxNumberError,
        setError: setFaxNumberError,
      },
      npiNumber: {
        value: npiNumber,
        setValue: setNpiNumber,
        error: npiNumberError,
        setError: setNpiNumberError,
      },
      deaNumber: {
        value: deaNumber,
        setValue: setDeaNumber,
        error: deaNumberError,
        setError: setDeaNumberError,
      },
      email: {
        value: email,
        setValue: setEmail,
        error: emailError,
        setError: setEmailError,
      },
    },
  };
  const page2 = {
    values: {
      practiceName: {
        value: practiceName,
        setValue: setPracticeName,
        error: practiceNameError,
        setError: setPracticeNameError,
      },
      address1: {
        value: address1,
        setValue: setAddress1,
        error: address1Error,
        setError: setAddress1Error,
      },
      address2: {
        value: address2,
        setValue: setAddress2,
        error: address2Error,
        setError: setAddress2Error,
      },
      city: {
        value: city,
        setValue: setCity,
        error: cityError,
        setError: setCityError,
      },
      state: {
        value: state,
        setValue: setState,
        error: stateError,
        setError: setStateError,
      },
      zip: {
        value: zip,
        setValue: setZip,
        error: zipError,
        setError: setZipError,
      },
      country: {
        value: country,
        setValue: setCountry,
        error: countryError,
        setError: setCountryError,
      },
    },
  };

  const handleNext = () => {
    if (activeStep === 0) {
      if (
        firstName !== "" &&
        lastName !== "" &&
        phoneNumber !== "" &&
        faxNumber !== "" &&
        npiNumber !== "" &&
        deaNumber !== "" &&
        email !== ""
      ) {
        Object.keys(page1.values).forEach((value) => page1.values[value].setError(""));
        setActiveStep(activeStep + 1);
      } else {
        Object.keys(page1.values).forEach((value) => {
          if (page1.values[value].value === "") {
            page1.values[value].setError("Required Field Empty");
          } else {
            page1.values[value].setError("");
          }
        });
      }
    } else if (activeStep === 1) {
      if (
        practiceName !== "" &&
        address1 !== "" &&
        address2 !== "" &&
        city !== "" &&
        state !== "" &&
        zip !== "" &&
        country !== ""
      ) {
        setActiveStep(activeStep + 1);
      }
    } else {
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
                <Typography variant="subtitle1">Prescriber Enrolled</Typography>
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
                    {activeStep === steps.length - 1 ? "Enroll" : "Next"}
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
