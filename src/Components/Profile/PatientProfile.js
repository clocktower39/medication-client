import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    root: {},
    rootGrid: {
        marginTop: '12.5px',
    },
    Paper: {
        padding: '12.5px',
        width: '100%',
    },
})

export default function PatientProfile(props) {
    const classes = useStyles();
    const location = useLocation();
    const [patient, setPatient] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:5518${location.pathname}`).then(res => {
            console.log(res);
            return res.json()
        }).then(data => {
            console.log(data);
            setPatient(data[0])
        });
    }, [location]);

    return patient === null ? <>Loading</> : (
        <Container maxWidth="lg">
            <Grid container spacing={3} className={classes.rootGrid}>
                <Grid container item xs={12}>
                    <Paper className={classes.Paper}>
                        <Typography variant="h5" align="center" gutterBottom >Patient Profile Summary</Typography>
                        <Grid container>
                            <Grid container item sm={6} xs={12} >
                                <Grid item xs={6}><Typography variant="body1">First Name</Typography></Grid>
                                <Grid item xs={6}><Typography variant="body2">{patient.firstName}</Typography></Grid>
                                <Grid item xs={6}><Typography variant="body1">Last Name</Typography></Grid>
                                <Grid item xs={6}><Typography variant="body2">{patient.lastName}</Typography></Grid>
                                <Grid item xs={6}><Typography variant="body1">Date of Birth</Typography></Grid>
                                <Grid item xs={6}><Typography variant="body2">{patient.dateOfBirth.substr(0, 10)}</Typography></Grid>
                                <Grid item xs={6}><Typography variant="body1">Phone Number</Typography></Grid>
                                <Grid item xs={6}><Typography variant="body2">{patient.phoneNumber}</Typography></Grid>
                            </Grid>
                            <Grid container item sm={6} xs={12} >
                                <Grid item xs={6}><Typography variant="body1">Address 1</Typography></Grid>
                                <Grid item xs={6}><Typography variant="body2">{patient.address1}</Typography></Grid>
                                <Grid item xs={6}><Typography variant="body1">Address 2</Typography></Grid>
                                <Grid item xs={6}><Typography variant="body2">{patient.address2}</Typography></Grid>
                                <Grid item xs={6}><Typography variant="body1">City</Typography></Grid>
                                <Grid item xs={6}><Typography variant="body2">{patient.city}</Typography></Grid>
                                <Grid item xs={6}><Typography variant="body1">State</Typography></Grid>
                                <Grid item xs={6}><Typography variant="body2">{patient.state}</Typography></Grid>
                                <Grid item xs={6}><Typography variant="body1">Zip Code</Typography></Grid>
                                <Grid item xs={6}><Typography variant="body2">{patient.zip}</Typography></Grid>
                                <Grid item xs={6}><Typography variant="body1">Country</Typography></Grid>
                                <Grid item xs={6}><Typography variant="body2">{patient.country}</Typography></Grid>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
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
                                        <TableCell>NPI Number</TableCell>
                                        <TableCell>DEA Number</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {patient.prescribers.active.length > 0 ? patient.prescribers.active.map(prescriber => (
                                        <TableRow>
                                            <TableCell>{prescriber.firstName}</TableCell>
                                            <TableCell>{prescriber.lastName}</TableCell>
                                            <TableCell>{prescriber.phoneNumber}</TableCell>
                                            <TableCell>{prescriber.npiNumber}</TableCell>
                                            <TableCell>{prescriber.deaNumber}</TableCell>
                                        </TableRow>
                                    )) :
                                        <TableRow>
                                            <TableCell>No active prescribers</TableCell>
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
                                        <TableCell>Start Date</TableCell>
                                        <TableCell>Service</TableCell>
                                        <TableCell>Service Type</TableCell>
                                        <TableCell>Status</TableCell>
                                        <TableCell>Status Date</TableCell>
                                        <TableCell>Outcome</TableCell>
                                        <TableCell>Outcome Reason</TableCell>
                                        <TableCell>Created By</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>STUFF</TableCell>
                                        <TableCell>STUFF</TableCell>
                                        <TableCell>STUFF</TableCell>
                                        <TableCell>STUFF</TableCell>
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
                        <Typography variant="h5" align="center" gutterBottom >Contact Log</Typography>
                        <TableContainer component={Paper}>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Date</TableCell>
                                        <TableCell>Channel</TableCell>
                                        <TableCell>Direction</TableCell>
                                        <TableCell>Contact Reason</TableCell>
                                        <TableCell>Contact Name</TableCell>
                                        <TableCell>Outcome</TableCell>
                                        <TableCell>Outcome Reason</TableCell>
                                        <TableCell>Created By</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>STUFF</TableCell>
                                        <TableCell>STUFF</TableCell>
                                        <TableCell>STUFF</TableCell>
                                        <TableCell>STUFF</TableCell>
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
        </Container>
    );
}
