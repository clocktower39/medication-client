import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Grid, TextField } from '@material-ui/core';


export default function PatientSearch(props) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [dob, setDob] = useState('');
    const [email, setEmail] = useState('');
    const [zip, setZip] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleChange = (e, setter) => {
        setter(e.target.value);
    }

    const handleSearch = () => {
        const params = {
            firstName,
            lastName,
            phoneNumber,
            dob,
            email,
            zip
        };
        // convert params into an array so we can filter
        const asArray = Object.entries(params);

        //filter the converted params array to remove unnecessary fields
        const notEmpty = asArray.filter(([key, value]) => value !== '');

        // convert back into an object
        const filteredParams = Object.fromEntries(notEmpty);

        fetch('http://localhost:5518/searchPatients', {
            method: 'post',
            dataType: 'json',
            body: JSON.stringify(filteredParams),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(res => res.json())
            .then(data => setSearchResults(data));
    }

    return (
        <>
            <Grid item xs={12} sm={4}>
                <TextField label="First Name" fullWidth value={firstName} onChange={(e) => handleChange(e, setFirstName)} />
            </Grid>
            <Grid item xs={12} sm={4}>
                <TextField label="Last Name" fullWidth value={lastName} onChange={(e) => handleChange(e, setLastName)} />
            </Grid>
            <Grid item xs={12} sm={4}>
                <TextField label="Phone Number" fullWidth value={phoneNumber} onChange={(e) => handleChange(e, setPhoneNumber)} />
            </Grid>
            <Grid item xs={12} sm={4}>
                <TextField label="Date of Birth" fullWidth value={dob} onChange={(e) => handleChange(e, setDob)} />
            </Grid>
            <Grid item xs={12} sm={4}>
                <TextField label="Email" fullWidth value={email} onChange={(e) => handleChange(e, setEmail)} />
            </Grid>
            <Grid item xs={12} sm={4}>
                <TextField label="Zip Code" fullWidth value={zip} onChange={(e) => handleChange(e, setZip)} />
            </Grid>
            <Grid container justifyContent="center" item xs={12}>
                <Button variant="contained" onClick={handleSearch} >Search</Button>
            </Grid>

            {searchResults.length>0 ? searchResults.map((result) => (
                <Grid key={result._id} container item xs={12}>
                    <Grid item xs={2}>{result.firstName}</Grid>
                    <Grid item xs={2}>{result.lastName}</Grid>
                    <Grid item xs={2}>{result.dateOfBirth.substr(0,10)}</Grid>
                    <Grid item xs={2}>{result.phoneNumber}</Grid>
                    <Grid item xs={2}>{result.zip}</Grid>
                    <Grid item xs={2}><Button component={Link} to={`/profile/${result._id}`}>Open</Button></Grid>
                </Grid>)) : <></>}
        </>
    )
}
