import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Container, Grid, IconButton, LinearProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, makeStyles } from '@material-ui/core';
import { AddCircle } from '@material-ui/icons';

const useStyles = makeStyles({
    root: {},
    rootGrid: {
        marginTop: '12.5px',
    },
    Paper: {
        margin: '7.5px',
        padding: '7.5px',
        width: '100%',
        overflow: 'hidden',
    },
})

export default function PrescriberProfile(props) {
    const classes = useStyles();
    const location = useLocation();
    const [prescriber, setPrescriber] = useState(null);
    const [patients, setPatients] = useState([]);

    useEffect(()=>{
        const getAccountInfo = async()=>{
            // fetch the prescriber object
            const prescriberObject = await fetch(`http://localhost:5518${location.pathname}`).then(res => res.json()).then(data => data[0]);

            // fetch the prescriber relationships
            const relationshipsArray = await fetch(`http://localhost:5518/relationships/prescriber/${prescriberObject._id}`).then(res => res.json());
            const uniqueRelationshipsArray = [...new Set(relationshipsArray.map(item => item.patientId))];

            // add each PT from the relationship history
            uniqueRelationshipsArray.forEach(id => {
                fetch(`http://localhost:5518/patientProfile/${id}`)
                .then(res=>res.json())
                .then(ptData => {
                    setPatients(prevPatientList => [...prevPatientList, {...ptData[0]}]);
                })
            })
            return prescriberObject;
        }
        getAccountInfo().then(res => setPrescriber(res));
        }, [location]);

    return prescriber === null ? <LinearProgress variant="indeterminate" /> : (
        <Container maxWidth="lg">
            <Grid container spacing={3} className={classes.rootGrid}>
                <Grid container item md={4} xs={12}>
                    <Paper className={classes.Paper}>
                        <Typography variant="h5" align="center" >Prescriber Profile Summary</Typography>
                        <Grid container>
                            <Grid container item xs={12} >
                                <Grid item xs={6}><Typography variant="body1">First Name</Typography></Grid>
                                <Grid item xs={6}><Typography variant="body2">{prescriber.firstName}</Typography></Grid>
                                <Grid item xs={6}><Typography variant="body1">Last Name</Typography></Grid>
                                <Grid item xs={6}><Typography variant="body2">{prescriber.lastName}</Typography></Grid>
                                <Grid item xs={6}><Typography variant="body1">Phone Number</Typography></Grid>
                                <Grid item xs={6}><Typography variant="body2">{prescriber.phoneNumber}</Typography></Grid>
                                <Grid item xs={6}><Typography variant="body1">Address 1</Typography></Grid>
                                <Grid item xs={6}><Typography variant="body2">{prescriber.address1}</Typography></Grid>
                                <Grid item xs={6}><Typography variant="body1">Address 2</Typography></Grid>
                                <Grid item xs={6}><Typography variant="body2">{prescriber.address2}</Typography></Grid>
                                <Grid item xs={6}><Typography variant="body1">City</Typography></Grid>
                                <Grid item xs={6}><Typography variant="body2">{prescriber.city}</Typography></Grid>
                                <Grid item xs={6}><Typography variant="body1">State</Typography></Grid>
                                <Grid item xs={6}><Typography variant="body2">{prescriber.state}</Typography></Grid>
                                <Grid item xs={6}><Typography variant="body1">Zip Code</Typography></Grid>
                                <Grid item xs={6}><Typography variant="body2">{prescriber.zip}</Typography></Grid>
                                <Grid item xs={6}><Typography variant="body1">Country</Typography></Grid>
                                <Grid item xs={6}><Typography variant="body2">{prescriber.country}</Typography></Grid>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid container item md={8} xs={12}>
                    <Grid container item xs={12}>
                        <Paper className={classes.Paper}>
                            <Typography variant="h5" align="center" gutterBottom >Relations/Affiliations</Typography>
                            <Typography variant="h6" align="center" >Patients</Typography>
                            <TableContainer component={Paper}>
                                <Table size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>ID</TableCell>
                                            <TableCell>First Name</TableCell>
                                            <TableCell>Last Name</TableCell>
                                            <TableCell>Date of Birth</TableCell>
                                            <TableCell>Zip Code</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {patients.length > 0 ? patients.map(patient => (
                                            <TableRow>
                                                <TableCell><Link to={`/patientProfile/${patient._id}`}>{patient._id}</Link></TableCell>
                                                <TableCell>{patient.firstName}</TableCell>
                                                <TableCell>{patient.lastName}</TableCell>
                                                <TableCell>{patient.dateOfBirth.substr(0,10)}</TableCell>
                                                <TableCell>{patient.zip}</TableCell>
                                            </TableRow>
                                        )) :
                                            <TableRow>
                                                <TableCell>No active patients</TableCell>
                                            </TableRow>
                                        }
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>
                    </Grid>
                    <Grid container item xs={12}>
                        <Paper className={classes.Paper}>
                            <Typography variant="h5" align="center" gutterBottom >Notes</Typography>
                            <Grid container>
                                <Grid item xs={11}><TextField multiline fullWidth/></Grid>
                                <Grid item xs={1}><IconButton><AddCircle /></IconButton></Grid>
                            </Grid>
                            <TableContainer component={Paper}>
                                <Table size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Date</TableCell>
                                            <TableCell>Note Type</TableCell>
                                            <TableCell>Created By</TableCell>
                                            <TableCell>Note Summary</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>
                    </Grid>
                    <Grid container item xs={12}>
                        <Paper className={classes.Paper}>
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
                                            <TableCell>STUFF</TableCell>
                                            <TableCell>STUFF</TableCell>
                                            <TableCell>STUFF</TableCell>
                                            <TableCell>STUFF</TableCell>
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
