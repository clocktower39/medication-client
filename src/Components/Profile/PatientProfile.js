import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
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

export default function PatientProfile(props) {
    const classes = useStyles();
    const location = useLocation();
    const [newNote, setNewNote] = useState('');
    const [patient, setPatient] = useState(null);
    const [prescribers, setPrescribers] = useState([]);
    const [notes, setNotes] = useState([]);
    const agent = useSelector(state=> state.agent);

    const handleNoteChange = (e) => {
        setNewNote(e.target.value);
    }

    const submitNote = () => {
        fetch('http://localhost:5518/submitNote', {
            method: 'post',
            dataType: 'json',
            body: JSON.stringify({
                note: newNote,
                accountId: patient._id,
                noteType: 'user',
                createdBy: agent.username,
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then(res => res.json())
        .then(data => setNotes(prevNotes => [...prevNotes, data.note]))
        setNewNote('');
    }

    useEffect(() => {
        setPrescribers([]);
        const getAccountInfo = async () => {
            // fetch the patient object
            const patientObject = await fetch(`http://localhost:5518${location.pathname}`).then(res => res.json()).then(data => data[0]);

            // fetch the patient relationships
            const relationshipsArray = await fetch(`http://localhost:5518/relationships/patient/${patientObject._id}`).then(res => res.json());
            const uniqueRelationshipsArray = [...new Set(relationshipsArray.map(item => item.prescriberId))];

            // add each PR from the relationship history
            uniqueRelationshipsArray.forEach((id) => {
                fetch(`http://localhost:5518/prescriberProfile/${id}`)
                    .then(res => res.json())
                    .then(prData => {
                        setPrescribers(prevPrescriberList => [...prevPrescriberList, { ...prData[0] }]);
                    })
            })

            // fetch the account notes
            fetch(`http://localhost:5518/notes/${patientObject._id}`).then(res => res.json()).then(data => setNotes(data));
            
            return patientObject;
        }
        getAccountInfo().then(res => setPatient(res));
    }, [location]);

    return patient === null ? <LinearProgress variant="indeterminate" /> : (
        <Container maxWidth="lg">
            <Grid container spacing={3} className={classes.rootGrid}>
                <Grid container item md={4} xs={12}>
                    <Paper className={classes.Paper}>
                        <Typography variant="h5" align="center" gutterBottom >Patient Profile Summary</Typography>
                        <Grid container>
                            <Grid container item xs={12} >
                                <Grid item xs={6}><Typography variant="body1">First Name</Typography></Grid>
                                <Grid item xs={6}><Typography variant="body2">{patient.firstName}</Typography></Grid>
                                <Grid item xs={6}><Typography variant="body1">Last Name</Typography></Grid>
                                <Grid item xs={6}><Typography variant="body2">{patient.lastName}</Typography></Grid>
                                <Grid item xs={6}><Typography variant="body1">Date of Birth</Typography></Grid>
                                <Grid item xs={6}><Typography variant="body2">{patient.dateOfBirth.substr(0, 10)}</Typography></Grid>
                                <Grid item xs={6}><Typography variant="body1">Phone Number</Typography></Grid>
                                <Grid item xs={6}><Typography variant="body2">{patient.phoneNumber}</Typography></Grid>
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
                <Grid container item md={8} xs={12}>
                    <Grid container item xs={12}>
                        <Paper className={classes.Paper}>
                            <Typography variant="h5" align="center" gutterBottom >Relations/Affiliations</Typography>
                            <Typography variant="h6" align="center" >Prescribers</Typography>
                            <TableContainer component={Paper}>
                                <Table size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>ID</TableCell>
                                            <TableCell>First Name</TableCell>
                                            <TableCell>Last Name</TableCell>
                                            <TableCell>NPI Number</TableCell>
                                            <TableCell>DEA Number</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {prescribers.length > 0 ? prescribers.map((prescriber, index) => (
                                            <TableRow key={prescriber._id}>
                                                <TableCell><Link to={`/prescriberProfile/${prescriber._id}`}>{prescriber._id}</Link></TableCell>
                                                <TableCell>{prescriber.firstName}</TableCell>
                                                <TableCell>{prescriber.lastName}</TableCell>
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
                            <Grid container>
                                <Grid item xs={11}><TextField onChange={handleNoteChange} multiline fullWidth value={newNote} /></Grid>
                                <Grid item xs={1}><IconButton onClick={submitNote}><AddCircle /></IconButton></Grid>
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
                                        {notes.length > 0?
                                        notes.map(n => (
                                            <TableRow key={n._id}>
                                                <TableCell>{n.date}</TableCell>
                                                <TableCell>{n.noteType}</TableCell>
                                                <TableCell>{n.createdBy}</TableCell>
                                                <TableCell>{n.note}</TableCell>
                                            </TableRow>
                                        )):
                                        <TableRow><TableCell>No notes </TableCell></TableRow>}
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
