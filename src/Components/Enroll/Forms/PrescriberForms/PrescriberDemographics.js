import React from 'react';
import Grid from '@material-ui/core/Grid';
import { TextField } from '@material-ui/core';

export default function PrescriberDemographics(props) {
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
            value={props.values[0]}
            onChange={(e)=>props.setters[0](e.target.value)}
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
            value={props.values[1]}
            onChange={(e)=>props.setters[1](e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="phone"
            name="phone"
            label="Phone Number"
            fullWidth
            value={props.values[2]}
            onChange={(e)=>props.setters[2](e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="fax"
            name="fax"
            label="Fax Number"
            fullWidth
            value={props.values[3]}
            onChange={(e)=>props.setters[3](e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="npi"
            name="npi"
            label="NPI Number"
            fullWidth
            value={props.values[4]}
            onChange={(e)=>props.setters[4](e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="dea"
            name="dea"
            label="DEA Number"
            fullWidth
            value={props.values[5]}
            onChange={(e)=>props.setters[5](e.target.value)}
          />
        </Grid>

      </Grid>
    </>
  );
}