import React, { useState } from 'react'
import { Button, Grid, TextField } from '@material-ui/core';


export default function PrescriberSearch(props) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [faxNumber, setFaxNumber] = useState('');
    const [email, setEmail] = useState('');
    const [npiNumber, setNpiNumber] = useState('');
    const [deaNumber, setDeaNumber] = useState('');
    const [zip, setZip ] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleChange = (e, setter) => {
        setter(e.target.value);
    }

    const handleSearch = () => {
        const params = JSON.stringify({
            // firstName,
            lastName
            // phoneNumber,
            // faxNumber,
            // email,
            // npiNumber,
            // deaNumber,
            // zip
        });
        fetch('http://localhost:5518/searchPrescribers', {
            method: 'post',
            dataType: 'json',
            body: params,
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
                <TextField label="First Name" fullWidth value={firstName} onChange={(e)=>handleChange(e, setFirstName)}/>
            </Grid>
            <Grid item xs={12} sm={4}>
                <TextField label="Last Name" fullWidth value={lastName} onChange={(e)=>handleChange(e, setLastName)}/>
            </Grid>
            <Grid item xs={12} sm={4}>
                <TextField label="Phone Number" fullWidth value={phoneNumber} onChange={(e)=>handleChange(e, setPhoneNumber)}/>
            </Grid>
            <Grid item xs={12} sm={4}>
                <TextField label="Fax Number" fullWidth value={faxNumber} onChange={(e)=>handleChange(e, setFaxNumber)}/>
            </Grid>
            <Grid item xs={12} sm={4}>
                <TextField label="Email" fullWidth value={email} onChange={(e)=>handleChange(e, setEmail)}/>
            </Grid>
            <Grid item xs={12} sm={4}>
                <TextField label="NPI" fullWidth value={npiNumber} onChange={(e)=>handleChange(e, setNpiNumber)}/>
            </Grid>
            <Grid item xs={12} sm={4}>
                <TextField label="DEA" fullWidth value={deaNumber} onChange={(e)=>handleChange(e, setDeaNumber)}/>
            </Grid>
            <Grid item xs={12} sm={4}>
                <TextField label="Zip Code" fullWidth value={zip} onChange={(e)=>handleChange(e, setZip)}/>
            </Grid>
            <Grid container justify="center" item xs={12}>
                <Button variant="contained" onClick={handleSearch} >Search</Button>
            </Grid>
            
            {searchResults?searchResults.map(result => (<Grid item xs={12}>{result.firstName} {result.lastName}</Grid>)):<></>}
        </>
    )
}
