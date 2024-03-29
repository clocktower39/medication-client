import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, Container, Grid, LinearProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import Relationships from '../../Components/Profile/Relationships';
import Notes from '../../Components/Profile/Notes';
import serverURL from '../../serverURL';

const classes = {
    rootGrid: {
        marginTop: '12.5px',
    },
    Paper: {
        margin: '7.5px',
        padding: '7.5px',
        width: '100%',
        overflow: 'hidden',
    },
};

export default function PrescriberProfile(props) {
    const location = useLocation();
    const [prescriber, setPrescriber] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [faxNumber, setFaxNumber] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [npiNumber, setNpiNumber] = useState('');
    const [deaNumber, setDeaNumber] = useState('');
    const [practiceName, setPracticeName] = useState('');
    const [address1, setAddress1] = useState('');
    const [address2, setAddress2] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zip, setZip] = useState('');
    const [country, setCountry] = useState('');

    const handleAccountChange = (e, setter) => {
        setter(e.target.value)
    }

    const updatePrescriberEdit = () => {
        const bearer = `Bearer ${localStorage.getItem("JWT_AUTH_TOKEN")}`;

        fetch(`${serverURL}/updatePrescriber`, {
            method: 'post',
            dataType: 'json',
            body: JSON.stringify({ filter: { _id: prescriber._id }, update: { firstName, lastName, phoneNumber, faxNumber, email, npiNumber, deaNumber, practiceName, address1, address2, city, state, zip, country } }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Authorization": bearer,
            }
        }).then(() => {
            setPrescriber({ firstName, lastName, phoneNumber, faxNumber, email, npiNumber, deaNumber, practiceName, address1, address2, city, state, zip, country })
        })
    }

    const resetEditData = (matchObject) => {
        setFirstName(matchObject.firstName);
        setLastName(matchObject.lastName);
        setPhoneNumber(matchObject.phoneNumber);
        setFaxNumber(matchObject.faxNumber);
        setEmail(matchObject.email);
        setNpiNumber(matchObject.npiNumber);
        setDeaNumber(matchObject.deaNumber);
        setPracticeName(matchObject.practiceName);
        setAddress1(matchObject.address1);
        setAddress2(matchObject.address2);
        setCity(matchObject.city);
        setState(matchObject.state);
        setZip(matchObject.zip);
        setCountry(matchObject.country);
    }

    useEffect(() => {
        const getAccountInfo = async () => {
            const bearer = `Bearer ${localStorage.getItem("JWT_AUTH_TOKEN")}`;
            // fetch the prescriber object
            const prescriberObject = await fetch(`${serverURL}${location.pathname}`, { headers: { "Authorization": bearer }} ).then(res => res.json()).then(data => data[0]);

            return prescriberObject;
        }
        getAccountInfo().then(res => {
            setPrescriber(res);
            resetEditData(res);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return prescriber === null ? <LinearProgress variant="indeterminate" /> : (
        <Container maxWidth="lg">
            <Grid container spacing={3} sx={classes.rootGrid}>
                <Grid container item lg={4} xs={12}>
                    <Paper sx={classes.Paper}>
                        <Typography variant="h5" align="center" gutterBottom >Prescriber Profile Summary</Typography>
                        <Typography variant="body1" align="center" gutterBottom >ID: {prescriber._id}</Typography>
                        <Grid container item xs={12} >
                            {!editMode ?
                                <Grid container item xs={12} spacing={1} sx={{ justifyContent: 'center', }}>
                                    <Grid container item xs={12} md={6} lg={12} spacing={1} >
                                        <Grid container item xs={6}><Typography variant="body1">First Name</Typography></Grid>
                                        <Grid container item xs={6}><Typography variant="body2">{prescriber.firstName}</Typography></Grid>
                                        <Grid container item xs={6}><Typography variant="body1">Last Name</Typography></Grid>
                                        <Grid container item xs={6}><Typography variant="body2">{prescriber.lastName}</Typography></Grid>
                                        <Grid container item xs={6}><Typography variant="body1">Phone Number</Typography></Grid>
                                        <Grid container item xs={6}><Typography variant="body2">{prescriber.phoneNumber}</Typography></Grid>
                                        <Grid container item xs={6}><Typography variant="body1">Fax Number</Typography></Grid>
                                        <Grid container item xs={6}><Typography variant="body2">{prescriber.faxNumber}</Typography></Grid>
                                        <Grid container item xs={6}><Typography variant="body1">Email</Typography></Grid>
                                        <Grid container item xs={6}><Typography variant="body2">{prescriber.email}</Typography></Grid>
                                        <Grid container item xs={6}><Typography variant="body1">NPI Number</Typography></Grid>
                                        <Grid container item xs={6}><Typography variant="body2">{prescriber.npiNumber}</Typography></Grid>
                                        <Grid container item xs={6}><Typography variant="body1">DEA Number</Typography></Grid>
                                        <Grid container item xs={6}><Typography variant="body2">{prescriber.deaNumber}</Typography></Grid>
                                    </Grid>

                                    <Grid container item xs={12} md={6} lg={12} spacing={1} >
                                        <Grid container item xs={6}><Typography variant="body1">Practice Name</Typography></Grid>
                                        <Grid container item xs={6}><Typography variant="body2">{prescriber.practiceName}</Typography></Grid>
                                        <Grid container item xs={6}><Typography variant="body1">Address 1</Typography></Grid>
                                        <Grid container item xs={6}><Typography variant="body2">{prescriber.address1}</Typography></Grid>
                                        <Grid container item xs={6}><Typography variant="body1">Address 2</Typography></Grid>
                                        <Grid container item xs={6}><Typography variant="body2">{prescriber.address2}</Typography></Grid>
                                        <Grid container item xs={6}><Typography variant="body1">City</Typography></Grid>
                                        <Grid container item xs={6}><Typography variant="body2">{prescriber.city}</Typography></Grid>
                                        <Grid container item xs={6}><Typography variant="body1">State</Typography></Grid>
                                        <Grid container item xs={6}><Typography variant="body2">{prescriber.state}</Typography></Grid>
                                        <Grid container item xs={6}><Typography variant="body1">Zip Code</Typography></Grid>
                                        <Grid container item xs={6}><Typography variant="body2">{prescriber.zip}</Typography></Grid>
                                        <Grid container item xs={6}><Typography variant="body1">Country</Typography></Grid>
                                        <Grid container item xs={6}><Typography variant="body2">{prescriber.country}</Typography></Grid>
                                    </Grid>
                                    <Grid container item xs={12} justifyContent="center" ><Button variant="outlined" onClick={() => setEditMode(!editMode)} >Edit</Button></Grid>
                                </Grid> :
                                <Grid container item xs={12} spacing={1} >
                                    <Grid container item xs={12} md={6} lg={12} spacing={1} >
                                        <Grid container item xs={4} sx={{ alignContent: 'center', }}><Typography variant="body1">First Name</Typography></Grid>
                                        <Grid container item xs={8} sx={{ alignContent: 'center', }}><TextField fullWidth size="small" value={firstName} onChange={(e) => handleAccountChange(e, setFirstName)} /></Grid>
                                        <Grid container item xs={4} sx={{ alignContent: 'center', }}><Typography variant="body1">Last Name</Typography></Grid>
                                        <Grid container item xs={8} sx={{ alignContent: 'center', }}><TextField fullWidth size="small" value={lastName} onChange={(e) => handleAccountChange(e, setLastName)} /></Grid>
                                        <Grid container item xs={4} sx={{ alignContent: 'center', }}><Typography variant="body1">Phone Number</Typography></Grid>
                                        <Grid container item xs={8} sx={{ alignContent: 'center', }}><TextField fullWidth size="small" value={phoneNumber} onChange={(e) => handleAccountChange(e, setPhoneNumber)} /></Grid>
                                        <Grid container item xs={4} sx={{ alignContent: 'center', }}><Typography variant="body1">Fax Number</Typography></Grid>
                                        <Grid container item xs={8} sx={{ alignContent: 'center', }}><TextField fullWidth size="small" value={faxNumber} onChange={(e) => handleAccountChange(e, setFaxNumber)} /></Grid>
                                        <Grid container item xs={4} sx={{ alignContent: 'center', }}><Typography variant="body1">Email</Typography></Grid>
                                        <Grid container item xs={8} sx={{ alignContent: 'center', }}><TextField fullWidth size="small" value={email} onChange={(e) => handleAccountChange(e, setEmail)} /></Grid>
                                        <Grid container item xs={4} sx={{ alignContent: 'center', }}><Typography variant="body1">NPI Number</Typography></Grid>
                                        <Grid container item xs={8} sx={{ alignContent: 'center', }}><TextField fullWidth size="small" value={npiNumber} onChange={(e) => handleAccountChange(e, setNpiNumber)} /></Grid>
                                        <Grid container item xs={4} sx={{ alignContent: 'center', }}><Typography variant="body1">DEA Number</Typography></Grid>
                                        <Grid container item xs={8} sx={{ alignContent: 'center', }}><TextField fullWidth size="small" value={deaNumber} onChange={(e) => handleAccountChange(e, setDeaNumber)} /></Grid>
                                    </Grid>

                                    <Grid container item xs={12} md={6} lg={12} spacing={1} >
                                        <Grid container item xs={4} sx={{ alignContent: 'center', }}><Typography variant="body1">Practice Name</Typography></Grid>
                                        <Grid container item xs={8} sx={{ alignContent: 'center', }}><TextField fullWidth size="small" value={practiceName} onChange={(e) => handleAccountChange(e, setPracticeName)} /></Grid>
                                        <Grid container item xs={4} sx={{ alignContent: 'center', }}><Typography variant="body1">Address 1</Typography></Grid>
                                        <Grid container item xs={8} sx={{ alignContent: 'center', }}><TextField fullWidth size="small" value={address1} onChange={(e) => handleAccountChange(e, setAddress1)} /></Grid>
                                        <Grid container item xs={4} sx={{ alignContent: 'center', }}><Typography variant="body1">Address 2</Typography></Grid>
                                        <Grid container item xs={8} sx={{ alignContent: 'center', }}><TextField fullWidth size="small" value={address2} onChange={(e) => handleAccountChange(e, setAddress2)} /></Grid>
                                        <Grid container item xs={4} sx={{ alignContent: 'center', }}><Typography variant="body1">City</Typography></Grid>
                                        <Grid container item xs={8} sx={{ alignContent: 'center', }}><TextField fullWidth size="small" value={city} onChange={(e) => handleAccountChange(e, setCity)} /></Grid>
                                        <Grid container item xs={4} sx={{ alignContent: 'center', }}><Typography variant="body1">State</Typography></Grid>
                                        <Grid container item xs={8} sx={{ alignContent: 'center', }}><TextField fullWidth size="small" value={state} onChange={(e) => handleAccountChange(e, setState)} /></Grid>
                                        <Grid container item xs={4} sx={{ alignContent: 'center', }}><Typography variant="body1">Zip Code</Typography></Grid>
                                        <Grid container item xs={8} sx={{ alignContent: 'center', }}><TextField fullWidth size="small" value={zip} onChange={(e) => handleAccountChange(e, setZip)} /></Grid>
                                        <Grid container item xs={4} sx={{ alignContent: 'center', }}><Typography variant="body1">Country</Typography></Grid>
                                        <Grid container item xs={8} sx={{ alignContent: 'center', }}><TextField fullWidth size="small" value={country} onChange={(e) => handleAccountChange(e, setCountry)} /></Grid>
                                    </Grid>
                                    <Grid container item xs={12} justifyContent="center" >
                                        <Button variant="outlined" sx={{ margin: '5px' }} onClick={() => {
                                            resetEditData(prescriber);
                                            setEditMode(!editMode)
                                        }} >Cancel</Button>
                                        <Button variant="outlined" sx={{ margin: '5px' }} onClick={() => {
                                            updatePrescriberEdit();
                                            setEditMode(!editMode)
                                        }
                                        } >Save</Button>
                                    </Grid>
                                </Grid>}
                        </Grid>
                    </Paper>
                </Grid>
                <Grid container item lg={8} xs={12}>

                    <Relationships account={prescriber} accountType="prescriber" searchType={"patient"} />
                    
                    <Notes account={prescriber} setAccount={setPrescriber} accountType="prescriber" />

                    <Grid container item xs={12}>
                        <Paper sx={classes.Paper}>
                            <Typography variant="h5" align="center" gutterBottom >Services</Typography>
                            <TableContainer component={Paper}>
                                <Table size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Date</TableCell>
                                            <TableCell>Service</TableCell>
                                            <TableCell>Status</TableCell>
                                            <TableCell>Created By</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell></TableCell>
                                            <TableCell></TableCell>
                                            <TableCell></TableCell>
                                            <TableCell></TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
}
