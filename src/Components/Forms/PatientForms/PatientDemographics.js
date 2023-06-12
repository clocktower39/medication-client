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
            size="small"
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
            size="small"
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
            size="small"
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
            size="small"
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            required
            id="address1"
            name="address1"
            label="Address line 1"
            fullWidth
            autoComplete="shipping address-line1"
            value={values.address1.value}
            error={values.address1.error.length > 0}
            helperText={values.address1.error}
            onChange={(e) => values.address1.setValue(e.target.value)}
            size="small"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="address2"
            name="address2"
            label="Address line 2"
            fullWidth
            autoComplete="shipping address-line2"
            value={values.address2.value}
            error={values.address2.error.length > 0}
            helperText={values.address2.error}
            onChange={(e) => values.address2.setValue(e.target.value)}
            size="small"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            fullWidth
            value={values.city.value}
            error={values.city.error.length > 0}
            helperText={values.city.error}
            onChange={(e) => values.city.setValue(e.target.value)}
            size="small"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="state"
            name="state"
            label="State/Province/Region"
            fullWidth
            value={values.state.value}
            error={values.state.error.length > 0}
            helperText={values.state.error}
            onChange={(e) => values.state.setValue(e.target.value)}
            size="small"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="zip"
            label="Zip / Postal code"
            fullWidth
            autoComplete="shipping postal-code"
            value={values.zip.value}
            error={values.zip.error.length > 0}
            helperText={values.zip.error}
            onChange={(e) => values.zip.setValue(e.target.value)}
            size="small"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            name="country"
            label="Country"
            fullWidth
            autoComplete="shipping country"
            value={values.country.value}
            error={values.country.error.length > 0}
            helperText={values.country.error}
            onChange={(e) => values.country.setValue(e.target.value)}
            size="small"
          />
        </Grid>
      </Grid>
    </>
  );
}