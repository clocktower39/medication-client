import React from "react";
import { Grid, TextField } from "@mui/material";

export default function AddressForm(props) {
  const { values, setters, errors } = props;
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            id="practiceName"
            name="practiceName"
            label="Practice Name"
            fullWidth
            value={values.practiceName}
            error={errors.practiceNameError.length > 0}
            helperText={errors.practiceNameError}
            onChange={(e) => setters.setPracticeName(e.target.value)}
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
            value={values.address1}
            error={errors.address1Error.length > 0}
            helperText={errors.address1Error}
            onChange={(e) => setters.setAddress1(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="address2"
            name="address2"
            label="Address line 2"
            fullWidth
            autoComplete="shipping address-line2"
            value={values.address2}
            error={errors.address2Error.length > 0}
            helperText={errors.address2Error}
            onChange={(e) => setters.setAddress2(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            fullWidth
            value={values.city}
            error={errors.cityError.length > 0}
            helperText={errors.cityError}
            onChange={(e) => setters.setCity(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="state"
            name="state"
            label="State/Province/Region"
            fullWidth
            value={values.state}
            error={errors.stateError.length > 0}
            helperText={errors.stateError}
            onChange={(e) => setters.setState(e.target.value)}
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
            value={values.zip}
            error={errors.zipError.length > 0}
            helperText={errors.zipError}
            onChange={(e) => setters.setZip(e.target.value)}
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
            value={values.country}
            error={errors.countryError.length > 0}
            helperText={errors.countryError}
            onChange={(e) => setters.setCountry(e.target.value)}
          />
        </Grid>
      </Grid>
    </>
  );
}
