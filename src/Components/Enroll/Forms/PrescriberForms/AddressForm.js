import React from 'react';
import { Grid, TextField } from '@material-ui/core';

export default function AddressForm(props) {
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
            value={props.values[0]}
            onChange={(e)=>props.setters[0](e.target.value)}
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
            value={props.values[1]}
            onChange={(e)=>props.setters[1](e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="address2"
            name="address2"
            label="Address line 2"
            fullWidth
            autoComplete="shipping address-line2"
            value={props.values[2]}
            onChange={(e)=>props.setters[2](e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            fullWidth
            value={props.values[3]}
            onChange={(e)=>props.setters[3](e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField id="state" name="state" label="State/Province/Region" fullWidth 
            value={props.values[4]}
            onChange={(e)=>props.setters[4](e.target.value)}/>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="zip"
            label="Zip / Postal code"
            fullWidth
            autoComplete="shipping postal-code"
            value={props.values[5]}
            onChange={(e)=>props.setters[5](e.target.value)}
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
            value={props.values[6]}
            onChange={(e)=>props.setters[6](e.target.value)}
          />
        </Grid>
      </Grid>
    </>
  );
}