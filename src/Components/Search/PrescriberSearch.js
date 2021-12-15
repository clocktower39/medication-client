import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';


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
        const params = {
            firstName,
            lastName,
            phoneNumber,
            faxNumber,
            email,
            npiNumber,
            deaNumber,
            zip
        };
        // convert params into an array so we can filter
        const asArray = Object.entries(params);

        //filter the converted params array to remove unnecessary fields
        const notEmpty = asArray.filter(([key, value]) => value !== '');

        // convert back into an object
        const filteredParams = Object.fromEntries(notEmpty);
        
        fetch('https://stark-garden-91538.herokuapp.com/searchPrescribers', {
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
            <Grid container justifyContent="center" item xs={12}>
                <Button variant="contained" onClick={handleSearch} >Search</Button>
            </Grid>
            
            <TableContainer component={Paper}>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>First Name</TableCell>
                            <TableCell>Last Name</TableCell>
                            <TableCell>Phone Number</TableCell>
                            <TableCell>NPI Number</TableCell>
                            <TableCell>DEA Number</TableCell>
                            <TableCell>Zip Code</TableCell>
                            <TableCell> </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {searchResults.length > 0 ? searchResults.map((result) => (
                            <TableRow key={result._id} >
                                <TableCell>{result.firstName}</TableCell>
                                <TableCell>{result.lastName}</TableCell>
                                <TableCell>{result.phoneNumber}</TableCell>
                                <TableCell>{result.npiNumber}</TableCell>
                                <TableCell>{result.deaNumber}</TableCell>
                                <TableCell>{result.zip}</TableCell>
                                <TableCell><Button variant="outlined" component={Link} to={`/prescriberProfile/${result._id}`}>Open</Button></TableCell>
                            </TableRow>
                        )) : <></>}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}
