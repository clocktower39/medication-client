import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, makeStyles } from '@material-ui/core';
import { AddCircle } from '@material-ui/icons';

const useStyles = makeStyles({
    root: {},
    rootGrid: {
        marginTop: '12.5px',
    },
    Paper: {
        margin: '5px',
        padding: '15px',
        width: '100%',
        maxWidth: '100%',
        overflow: 'hidden',
    },
})

export default function PrescriberProfile(props) {
    const classes = useStyles();
    const location = useLocation();
    const [prescriber, setPrescriber] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:5518${location.pathname}`).then(res => res.json()).then(data => setPrescriber(data[0]));
    }, [location]);

    return prescriber === null ? <>Loading</> : (
        <Container maxWidth="lg">
            <Grid container spacing={3} className={classes.rootGrid}>
                <Grid container item sm={4} xs={12}>
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
                <Grid container item sm={8} xs={12}>
                    <Grid container item xs={12}>
                        <Paper className={classes.Paper}>
                            <Typography variant="h5" align="center" gutterBottom >Relations/Affiliations</Typography>
                            <Typography variant="h6" align="center" >Prescribers</Typography>
                            <TableContainer component={Paper}>
                                <Table size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>First Name</TableCell>
                                            <TableCell>Last Name</TableCell>
                                            <TableCell>Phone Number</TableCell>
                                            <TableCell>Date of Birth</TableCell>
                                            <TableCell>Zip Code</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {prescriber.patients.active.length > 0 ? prescriber.patients.active.map(patient => (
                                            <TableRow>
                                                <TableCell>{patient.firstName}</TableCell>
                                                <TableCell>{patient.lastName}</TableCell>
                                                <TableCell>{patient.phoneNumber}</TableCell>
                                                <TableCell>{patient.dateOfBirth}</TableCell>
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
                            <TextField /><IconButton><AddCircle /></IconButton>
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
