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
      </Grid>
    </>
  );
}
