import React, { useState } from 'react'
import { Grid, TextField } from '@material-ui/core';


export default function PatientSearch(props) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [dob, setDob] = useState('');
    const [email, setEmail] = useState('');
    const [zip, setZip ] = useState('');

    const handleChange = (e, setter) => {
        setter(e.target.value);
    }
    return (
        <>
            <Grid item xs={12} sm={4}>
                <TextField label="First Name" fullWidth value={firstName} onChange={(e)=>handleChange(e, setFirstName)}/>
            </Grid>
            <Grid item xs={12} sm={4}>
                <TextField label="Last Name" fullWidth value={lastName} onChange={(e)=>handleChange(e, setLastName)}/>
            </Grid>
            <Grid item xs={12} sm={4}>
                <TextField label="Phone Number" fullWidth value={phoneNumber} onChange={(e)=>handleChange(e, setPhoneNumber)}/>
            </Grid>
            <Grid item xs={12} sm={4}>
                <TextField label="Date of Birth" fullWidth value={dob} onChange={(e)=>handleChange(e, setDob)}/>
            </Grid>
            <Grid item xs={12} sm={4}>
                <TextField label="Email" fullWidth value={email} onChange={(e)=>handleChange(e, setEmail)}/>
            </Grid>
            <Grid item xs={12} sm={4}>
                <TextField label="Zip Code" fullWidth value={zip} onChange={(e)=>handleChange(e, setZip)}/>
            </Grid>
        </>
    )
}
