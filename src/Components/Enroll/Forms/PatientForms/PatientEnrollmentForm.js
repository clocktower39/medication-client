import React, { useState } from "react";
import { Button, Grid, StepLabel, Paper, Stepper, Step, Typography } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Review from "./Review";
import PatientDemographics from "./PatientDemographics";

const classes = {
  appBar: {
    position: "relative",
  },
  paper: (theme) => ({
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  }),
  stepper: (theme) => ({
    padding: theme.spacing(3, 0, 5),
  }),
  button: (theme) => ({
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  }),
};

const steps = ["Demographics", "Review", "Status"];

function getStepContent(step, page1) {
  switch (step) {
    case 0:
      return <PatientDemographics values={page1.values} />;
    case 1:
      return <Review values={{ ...page1.values }} />;
    case 2:
      return <div>Patient enrolled</div>;
    default:
      throw new Error("Unknown step");
  }
}

export default function PatientEnrollmentForm() {
  const [activeStep, setActiveStep] = useState(0);

  const [firstName, setFirstName] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastName, setLastName] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [dateOfBirthError, setDateOfBirthError] = useState("");

  const [address1, setAddress1] = useState("");
  const [address1Error, setAddress1Error] = useState("");
  const [address2, setAddress2] = useState("");
  const [address2Error, setAddress2Error] = useState("");
  const [city, setCity] = useState("");
  const [cityError, setCityError] = useState("");
  const [state, setState] = useState("");
  const [stateError, setStateError] = useState("");
  const [zip, setZip] = useState("");
  const [zipError, setZipError] = useState("");
  const [country, setCountry] = useState("");
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
      dateOfBirth: {
        value: dateOfBirth,
        setValue: setDateOfBirth,
        error: dateOfBirthError,
        setError: setDateOfBirthError,
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
        dateOfBirth !== "" &&
        address1 !== "" &&
        city !== "" &&
        state !== "" &&
        zip !== "" &&
        country !== ""
      ) {
        Object.keys(page1.values).forEach((value) => page1.values[value].setError(""));
        setActiveStep(activeStep + 1);
      } else {
        Object.keys(page1.values).forEach((value) => {
          if (page1.values[value].value === "" && value !== "address2") {
            page1.values[value].setError("Required Field Empty");
          } else {
            page1.values[value].setError("");
          }
        });
      }
    } else if (activeStep === 1) {
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <>
      <CssBaseline />
      <main>
        <Paper sx={(theme) => classes.paper(theme)}>
          <Typography variant="h4" align="center">
            Patient Enrollment
          </Typography>
          <Stepper activeStep={activeStep} sx={(theme) => classes.stepper(theme)}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <>
            {getStepContent(activeStep, page1)}
            <Grid
              container
              item
              xs={12}
              spacing={2}
              sx={{ justifyContent: "center", marginTop: "15px" }}
            >
              {activeStep !== 0 && (
                <Button
                  onClick={handleBack}
                  sx={(theme) => classes.button(theme)}
                  variant="outlined"
                >
                  Back
                </Button>
              )}
              <Button variant="contained" color="primary" onClick={handleNext} sx={classes.button}>
                {activeStep === steps.length - 1 ? "Enroll" : "Next"}
              </Button>
            </Grid>
          </>
        </Paper>
      </main>
    </>
  );
}
