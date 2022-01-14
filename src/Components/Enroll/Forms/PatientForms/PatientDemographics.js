import React from 'react';
import Grid from '@mui/material/Grid';
import { TextField } from '@mui/material';

export default function PatientDemographics(props) {
  const { values } = props;
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            autoComplete="given-name"
            value={values.firstName.value}
            error={values.firstName.error.length > 0}
            helperText={values.firstName.error}
            onChange={(e) => values.firstName.setValue(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            autoComplete="family-name"
            value={values.lastName.value}
            error={values.lastName.error.length > 0}
            helperText={values.lastName.error}
            onChange={(e) => values.lastName.setValue(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="phone"
            name="phone"
            label="Phone Number"
            fullWidth
            value={values.phoneNumber.value}
            error={values.phoneNumber.error.length > 0}
            helperText={values.phoneNumber.error}
            onChange={(e) => values.phoneNumber.setValue(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="dateOfBirth"
            name="dateOfBirth"
            label="Date of Birth"
            fullWidth
            value={values.dateOfBirth.value}
            error={values.dateOfBirth.error.length > 0}
            helperText={values.dateOfBirth.error}
            onChange={(e) => values.dateOfBirth.setValue(e.target.value)}
          />
        </Grid>

      </Grid>
    </>
  );
}