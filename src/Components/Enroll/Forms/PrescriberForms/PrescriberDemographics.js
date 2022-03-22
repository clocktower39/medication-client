import React from "react";
import Grid from "@mui/material/Grid";
import { TextField } from "@mui/material";

export default function PrescriberDemographics(props) {
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
            id="fax"
            name="fax"
            label="Fax Number"
            fullWidth
            value={values.faxNumber.value}
            error={values.faxNumber.error.length > 0}
            helperText={values.faxNumber.error}
            onChange={(e) => values.faxNumber.setValue(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="npi"
            name="npi"
            label="NPI Number"
            fullWidth
            value={values.npiNumber.value}
            error={values.npiNumber.error.length > 0}
            helperText={values.npiNumber.error}
            onChange={(e) => values.npiNumber.setValue(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="dea"
            name="dea"
            label="DEA Number"
            fullWidth
            value={values.deaNumber.value}
            error={values.deaNumber.error.length > 0}
            helperText={values.deaNumber.error}
            onChange={(e) => values.deaNumber.setValue(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="email"
            name="email"
            label="Email"
            fullWidth
            value={values.email.value}
            error={values.email.error.length > 0}
            helperText={values.email.error}
            onChange={(e) => values.email.setValue(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="practiceName"
            name="practiceName"
            label="Practice Name"
            fullWidth
            value={values.practiceName.value}
            error={values.practiceName.error.length > 0}
            helperText={values.practiceName.error}
            onChange={(e) => values.practiceName.setValue(e.target.value)}
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
          />
        </Grid>
      </Grid>
    </>
  );
}
