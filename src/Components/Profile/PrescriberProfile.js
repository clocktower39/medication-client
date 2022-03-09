import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, Link } from 'react-router-dom';
import { Button, Container, Grid, IconButton, LinearProgress, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { AddCircle, ExpandMore, RemoveCircle } from '@mui/icons-material';
import Search from '../Search/Search';
import serverURL from '../../serverURL';

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
    ModalPaper: {
        position: 'absolute',
        padding: '7.5px',
        width: '65%',
        backgroundColor: '#fcfcfc',
        top: '5%',
        left: '17.5%',
        overflowY: 'scroll',
        height: '90%'
    },
})

export default function PrescriberProfile(props) {
    const classes = useStyles();
    const location = useLocation();
    const [prescriber, setPrescriber] = useState(null);
    const [patients, setPatients] = useState([]);
    const [newNote, setNewNote] = useState('');
    const [notes, setNotes] = useState([]);
    const agent = useSelector(state => state.agent);
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
    const [toggleRelationshipModal, setToggleRelationshipModal] = useState(false);

    const handleNoteChange = (e) => {
        setNewNote(e.target.value);
    }

    const handleAccountChange = (e, setter) => {
        setter(e.target.value)
    }

    const createRelationship = (patientId) => {
        fetch(`${serverURL}/manageRelationship`, {
            method: 'post',
            dataType: 'json',
            body: JSON.stringify({
                patientId,
                prescriberId: prescriber._id,
                action: 'activate',
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
    }

    const submitNote = () => {
        fetch(`${serverURL}/submitNote`, {
            method: 'post',
            dataType: 'json',
            body: JSON.stringify({
                note: newNote,
                accountId: prescriber._id,
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

    const updatePrescriberEdit = () => {

        fetch(`${serverURL}/updatePrescriber`, {
            method: 'post',
            dataType: 'json',
            body: JSON.stringify({ filter: { _id: prescriber._id }, update: { firstName, lastName, phoneNumber, faxNumber, email, npiNumber, deaNumber, practiceName, address1, address2, city, state, zip, country } }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
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

    const RelationshipHistorySection = ({ patient }) => {
        const [expandHistory, setExpandHistory] = useState(false);
        return (
            <>
                <TableRow key={patient._id}>
                    <TableCell><Link to={`/patientProfile/${patient._id}`}>{patient._id}</Link></TableCell>
                    <TableCell>{patient.firstName}</TableCell>
                    <TableCell>{patient.lastName}</TableCell>
                    <TableCell>{patient.dateOfBirth.substr(0, 10)}</TableCell>
                    <TableCell>{patient.zip}</TableCell>
                    <TableCell><IconButton onClick={() => setExpandHistory(prevState => !prevState)}><ExpandMore /></IconButton></TableCell>
                </TableRow>
                {expandHistory === true && (
                    <>

                        <TableRow>
                            <TableCell colSpan={1} className={classes.TableHeader}></TableCell>
                            <TableCell colSpan={2} className={classes.TableHeader}>Date</TableCell>
                            <TableCell colSpan={2} className={classes.TableHeader}>Action</TableCell>
                        </TableRow>

                        {patient.completeHistory.map(historyItem => (
                            <TableRow key={historyItem.date}>
                                <TableCell colSpan={1} ></TableCell>
                                <TableCell colSpan={2} >{historyItem.date}</TableCell>
                                <TableCell colSpan={2} >{historyItem.action}</TableCell>
                            </TableRow>
                        ))}
                    </>
                )}
            </>)
    }

    useEffect(() => {
        const getAccountInfo = async () => {
            // fetch the prescriber object
            const prescriberObject = await fetch(`${serverURL}${location.pathname}`).then(res => res.json()).then(data => data[0]);

            // fetch the prescriber relationships
            const relationshipsArray = await fetch(`${serverURL}/relationships/prescriber/${prescriberObject._id}`).then(res => res.json());
            const uniqueRelationshipsArray = [...new Set(relationshipsArray.map(item => item.patientId))];

            // add each PT from the relationship history
            uniqueRelationshipsArray.forEach((id, i) => {
                fetch(`${serverURL}/patientProfile/${id}`)
                    .then(res => res.json())
                    .then(ptData => {
                        setPatients(prevPatientList => [...prevPatientList, { ...ptData[0], completeHistory: relationshipsArray.filter(item => item.patientId === id) }]);
                    })
            })

            // fetch the account notes
            fetch(`${serverURL}/notes/${prescriberObject._id}`).then(res => res.json()).then(data => setNotes(data));
            resetEditData(prescriberObject);

            return prescriberObject;
        }
        getAccountInfo().then(res => setPrescriber(res));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return prescriber === null ? <LinearProgress variant="indeterminate" /> : (
        <Container maxWidth="lg">
            <Grid container spacing={3} className={classes.rootGrid}>
                <Grid container item lg={4} xs={12}>
                    <Paper className={classes.Paper}>
                        <Typography variant="h5" align="center" gutterBottom >Prescriber Profile Summary</Typography>
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
                    <Grid container item xs={12}>
                        <Paper className={classes.Paper}>
                            <Typography variant="h5" align="center" gutterBottom >Relations/Affiliations</Typography>
                            <Typography variant="h6" align="center" >Patients <IconButton onClick={() => setToggleRelationshipModal(true)}><AddCircle /></IconButton></Typography>
                            <Modal
                                open={toggleRelationshipModal}
                                aria-labelledby="simple-modal-title"
                                aria-describedby="simple-modal-description"
                            >
                                <div className={classes.ModalPaper}>
                                    <div>
                                        <IconButton onClick={() => setToggleRelationshipModal(false)}><RemoveCircle /></IconButton>
                                    </div>
                                    <Grid container spacing={1} >
                                        <Search
                                            profileType="patient"
                                            fieldObjects={[
                                                { label: 'First Name', propertyName: 'firstName', value: '' },
                                                { label: 'Last Name', propertyName: 'lastName', value: '' },
                                                { label: 'Phone Number', propertyName: 'phoneNumber', value: '' },
                                                { label: 'Date of Birth', propertyName: 'dateOfBirth', value: '' },
                                                { label: 'Zip Code', propertyName: 'zip', value: '' },
                                            ]}
                                            searchUrl={`${serverURL}/searchPatients`}
                                            type="select"
                                            onClickFunc={createRelationship}
                                        />
                                    </Grid>
                                </div>
                            </Modal>
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
                                        {patients.length > 0 ? patients.map((patient, i) => (
                                            <RelationshipHistorySection key={`relationship-patient-${i}`} patient={patient} />
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
                            <Grid container >
                                <Grid container item xs={12} sx={{ alignContent: 'center', }}><TextField onChange={handleNoteChange} multiline fullWidth value={newNote} /></Grid>
                                <Grid container item xs={12} sx={{ alignContent: 'center', justifyContent: 'center', }}><IconButton onClick={submitNote}><AddCircle /></IconButton></Grid>
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
                                        {notes.length > 0 ?
                                            notes.map(n => (
                                                <TableRow key={n._id}>
                                                    <TableCell>{n.date}</TableCell>
                                                    <TableCell>{n.noteType}</TableCell>
                                                    <TableCell>{n.createdBy}</TableCell>
                                                    <TableCell>{n.note}</TableCell>
                                                </TableRow>
                                            )) :
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
