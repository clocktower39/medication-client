import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField } from "@mui/material";
import { updateContactInfo } from '../Redux/actions';

export default function ContactInfo({ open, handleContactInfoClose }) {
  const dispatch = useDispatch();
  const agent = useSelector(state => state.agent)
  const [email, setEmail] = useState(agent.email);
  const [firstName, setFirstName] = useState(agent.firstName);
  const [lastName, setLastName] = useState(agent.lastName);

  const handleChange = (e, setter) => setter(e.target.value);

  const handleSubmitChange = () => {
    if(email !== '' && firstName !== '' && lastName !== '' ){
      dispatch(updateContactInfo({email, firstName, lastName})).then(()=> handleContactInfoClose())
    }
  }

  useEffect(()=>{
    setEmail(agent.email);
    setFirstName(agent.firstName);
    setLastName(agent.lastName);
  },[agent])

  return (
    <Dialog
      open={open}
      onClose={handleContactInfoClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Update Contact Information"}
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={1} sx={{ padding: "10px 0px" }}>
          <Grid item container xs={12}>
            <TextField
              type="email"
              value={email}
              onChange={(e) => handleChange(e, setEmail)}
              fullWidth
              label="Email"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item container xs={12}>
            <TextField
              type="text"
              value={firstName}
              onChange={(e) => handleChange(e, setFirstName)}
              fullWidth
              label="FirstName"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item container xs={12}>
            <TextField
              type="text"
              value={lastName}
              onChange={(e) => handleChange(e, setLastName)}
              fullWidth
              label="Last Name"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleContactInfoClose}>Cancel</Button>
        <Button onClick={handleSubmitChange} autoFocus>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
