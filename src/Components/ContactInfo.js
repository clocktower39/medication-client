import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField } from "@mui/material";
import { } from '../Redux/actions';

export default function ContactInfo({ open, handleContactInfoClose }) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");

  const handleChange = (e, setter) => setter(e.target.value);

  const handleSubmitChange = () => {
    if(email !== ''){
      // dispatch(updateContactInfo(email)).then(()=> handleContactInfoClose())
    }
  }

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
