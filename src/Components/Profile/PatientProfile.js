import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import { useLocation, Link } from 'react-router-dom';
import { Box, Button, Container, Grid, IconButton, LinearProgress, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import { AddCircle, ExpandMore, RemoveCircle } from '@mui/icons-material';
import Search from '../Search/Search';
import serverURL from '../../serverURL';

const classes = {
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
    TableHeader: {
        fontWeight: 600,
    },
};

export default function PatientProfile(props) {
    const location = useLocation();
    const [newNote, setNewNote] = useState('');
    const [patient, setPatient] = useState(null);
    const [prescribers, setPrescribers] = useState([]);
    const [notes, setNotes] = useState([]);
    const agent = useSelector(state => state.agent);
    const [editMode, setEditMode] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dateOfBirth, setDOB] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address1, setAddress1] = useState('');
    const [address2, setAddress2] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zip, setZip] = useState('');
    const [country, setCountry] = useState('');
    const [labs, setLabs] = useState([]);
    const [bloodDrawDate, setBloodDrawDate] = useState(new Date().toISOString().slice(0, 10));
    const [anc, setAnc] = useState('');
    const [toggleRelationshipModal, setToggleRelationshipModal] = useState(false);

    const handleNoteChange = (e) => {
        setNewNote(e.target.value);
    }

    const handleAccountChange = (e, setter) => {
        setter(e.target.value)
    }

    const createRelationship = (prescriberId) => {
        fetch(`${serverURL}/manageRelationship`, {
            method: 'post',
            dataType: 'json',
            body: JSON.stringify({
                patientId: patient._id,
                prescriberId,
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
                accountId: patient._id,
                noteType: 'user',
                createdBy: { username: agent.username, accountId: agent._id},
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(res => res.json())
            .then(data => setNotes(prevNotes => [...prevNotes, data.note]))
        setNewNote('');
    }

    const resetEditData = (matchObject) => {
        setFirstName(matchObject.firstName);
        setLastName(matchObject.lastName);
        setDOB(matchObject.dateOfBirth.substr(0, 10));
        setPhoneNumber(matchObject.phoneNumber);
        setAddress1(matchObject.address1);
        setAddress2(matchObject.address2);
        setCity(matchObject.city);
        setState(matchObject.state);
        setZip(matchObject.zip);
        setCountry(matchObject.country);
    }

    const updatePatientEdit = () => {

        fetch(`${serverURL}/updatePatient`, {
            method: 'post',
            dataType: 'json',
            body: JSON.stringify({ filter: { _id: patient._id }, update: { firstName, lastName, dateOfBirth, phoneNumber, address1, address2, city, state, zip, country } }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(() => {
            setPatient({
                firstName,
                lastName,
                dateOfBirth,
                phoneNumber,
                address1,
                address2,
                city,
                state,
                zip,
                country,
            })
        })
    }

    const handleLabChange = (e, setter) => {
        setter(e.target.value);
    }

    const addLab = () => {
        fetch(`${serverURL}/submitLab`, {
            method: 'post',
            dataType: 'json',
            body: JSON.stringify({ anc, bloodDrawDate, accountId: patient._id, createdBy: agent.username }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(res => res.json())
            .then(data => {
                setLabs(prevLabs => [...prevLabs, { ...data.lab }]);
                setAnc('');
                setBloodDrawDate(new Date().toISOString().slice(0, 10));
            })
    }

    const RelationshipHistorySection = ({ prescriber }) => {
        const [expandHistory, setExpandHistory] = useState(false);
        return (
            <>
                <TableRow key={prescriber._id}>
                    <TableCell><Link to={`/prescriberProfile/${prescriber._id}`}>{prescriber._id}</Link></TableCell>
                    <TableCell>{prescriber.firstName}</TableCell>
                    <TableCell>{prescriber.lastName}</TableCell>
                    <TableCell>{prescriber.npiNumber}</TableCell>
                    <TableCell>{prescriber.deaNumber}</TableCell>
                    <TableCell><IconButton onClick={() => setExpandHistory(prevState => !prevState)}><ExpandMore /></IconButton></TableCell>
                </TableRow>
                {expandHistory === true && (
                    <>
                        <TableRow>
                            <TableCell colSpan={1} sx={classes.TableHeader}></TableCell>
                            <TableCell colSpan={2} sx={classes.TableHeader}>Date</TableCell>
                            <TableCell colSpan={2} sx={classes.TableHeader}>Action</TableCell>
                        </TableRow>

                        {prescriber.completeHistory.map(historyItem => (
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
        setPrescribers([]);
        const getAccountInfo = async () => {
            // fetch the patient object
            const patientObject = await fetch(`${serverURL}${location.pathname}`).then(res => res.json()).then(data => data[0]);

            // fetch the patient relationships
            const relationshipsArray = await fetch(`${serverURL}/relationships/patient/${patientObject._id}`).then(res => res.json());
            const uniqueRelationshipsArray = [...new Set(relationshipsArray.map(item => item.prescriberId))];

            // add each PR from the relationship history
            uniqueRelationshipsArray.forEach((id) => {
                fetch(`${serverURL}/prescriberProfile/${id}`)
                    .then(res => res.json())
                    .then(prData => {
                        setPrescribers(prevPrescriberList => [...prevPrescriberList, { ...prData[0], completeHistory: relationshipsArray.filter(item => item.prescriberId === id) }]);
                    })
            })

            // fetch the account notes
            fetch(`${serverURL}/notes/${patientObject._id}`).then(res => res.json()).then(data => setNotes(data));
            resetEditData(patientObject);

            // fetch patients labs
            fetch(`${serverURL}/labs/${patientObject._id}`).then(res => res.json()).then(data => {
                setLabs(data)
            });

            return patientObject;
        }
        getAccountInfo().then(res => setPatient(res));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return patient === null ? <LinearProgress variant="indeterminate" /> : (
        <Container maxWidth="lg">
            <Grid container spacing={3} sx={classes.rootGrid}>
                <Grid container item lg={4} xs={12}>
                    <Paper sx={classes.Paper}>
                        <Typography variant="h5" align="center" gutterBottom >Patient Profile Summary</Typography>
                        <Grid container item xs={12} spacing={1} >
                            {!editMode ?
                                <Grid container item xs={12} spacing={1} sx={{ justifyContent: 'center', }}>
                                    <Grid container item xs={12} md={6} lg={12} spacing={1} >
                                        <Grid container item xs={6}><Typography variant="body1">First Name</Typography></Grid>
                                        <Grid container item xs={6}><Typography variant="body2">{patient.firstName}</Typography></Grid>
                                        <Grid container item xs={6}><Typography variant="body1">Last Name</Typography></Grid>
                                        <Grid container item xs={6}><Typography variant="body2">{patient.lastName}</Typography></Grid>
                                        <Grid container item xs={6}><Typography variant="body1">Date of Birth</Typography></Grid>
                                        <Grid container item xs={6}><Typography variant="body2">{patient.dateOfBirth.substr(0, 10)}</Typography></Grid>
                                        <Grid container item xs={6}><Typography variant="body1">Phone Number</Typography></Grid>
                                        <Grid container item xs={6}><Typography variant="body2">{patient.phoneNumber}</Typography></Grid>
                                        <Grid container item xs={6}><Typography variant="body1">Zip Code</Typography></Grid>
                                        <Grid container item xs={6}><Typography variant="body2">{patient.zip}</Typography></Grid>
                                    </Grid>
                                    <Grid container item xs={12} md={6} lg={12} spacing={1} >
                                        <Grid container item xs={6}><Typography variant="body1">Address 1</Typography></Grid>
                                        <Grid container item xs={6}><Typography variant="body2">{patient.address1}</Typography></Grid>
                                        <Grid container item xs={6}><Typography variant="body1">Address 2</Typography></Grid>
                                        <Grid container item xs={6}><Typography variant="body2">{patient.address2}</Typography></Grid>
                                        <Grid container item xs={6}><Typography variant="body1">City</Typography></Grid>
                                        <Grid container item xs={6}><Typography variant="body2">{patient.city}</Typography></Grid>
                                        <Grid container item xs={6}><Typography variant="body1">State</Typography></Grid>
                                        <Grid container item xs={6}><Typography variant="body2">{patient.state}</Typography></Grid>
                                        <Grid container item xs={6}><Typography variant="body1">Country</Typography></Grid>
                                        <Grid container item xs={6}><Typography variant="body2">{patient.country}</Typography></Grid>
                                    </Grid>
                                    <Grid container item xs={12} justifyContent="center" ><Button variant="outlined" onClick={() => setEditMode(!editMode)} >Edit</Button></Grid>
                                </Grid> :
                                <Grid container item xs={12} spacing={1} >
                                    <Grid container item xs={12} md={6} lg={12} spacing={1} >
                                        <Grid container item xs={4} sx={{ alignContent: 'center', }}><Typography variant="body1">First Name</Typography></Grid>
                                        <Grid container item xs={8} sx={{ alignContent: 'center', }}><TextField fullWidth size="small" value={firstName} onChange={(e) => handleAccountChange(e, setFirstName)} /></Grid>
                                        <Grid container item xs={4} sx={{ alignContent: 'center', }}><Typography variant="body1">Last Name</Typography></Grid>
                                        <Grid container item xs={8} sx={{ alignContent: 'center', }}><TextField fullWidth size="small" value={lastName} onChange={(e) => handleAccountChange(e, setLastName)} /></Grid>
                                        <Grid container item xs={4} sx={{ alignContent: 'center', }}><Typography variant="body1">Date of Birth</Typography></Grid>
                                        <Grid container item xs={8} sx={{ alignContent: 'center', }}><TextField fullWidth size="small" value={dateOfBirth} onChange={(e) => handleAccountChange(e, setDOB)} /></Grid>
                                        <Grid container item xs={4} sx={{ alignContent: 'center', }}><Typography variant="body1">Phone Number</Typography></Grid>
                                        <Grid container item xs={8} sx={{ alignContent: 'center', }}><TextField fullWidth size="small" value={phoneNumber} onChange={(e) => handleAccountChange(e, setPhoneNumber)} /></Grid>
                                        <Grid container item xs={4} sx={{ alignContent: 'center', }}><Typography variant="body1">Zip Code</Typography></Grid>
                                        <Grid container item xs={8} sx={{ alignContent: 'center', }}><TextField fullWidth size="small" value={zip} onChange={(e) => handleAccountChange(e, setZip)} /></Grid>
                                    </Grid>

                                    <Grid container item xs={12} md={6} lg={12} spacing={1} >
                                        <Grid container item xs={4} sx={{ alignContent: 'center', }}><Typography variant="body1">Address 1</Typography></Grid>
                                        <Grid container item xs={8} sx={{ alignContent: 'center', }}><TextField fullWidth size="small" value={address1} onChange={(e) => handleAccountChange(e, setAddress1)} /></Grid>
                                        <Grid container item xs={4} sx={{ alignContent: 'center', }}><Typography variant="body1">Address 2</Typography></Grid>
                                        <Grid container item xs={8} sx={{ alignContent: 'center', }}><TextField fullWidth size="small" value={address2} onChange={(e) => handleAccountChange(e, setAddress2)} /></Grid>
                                        <Grid container item xs={4} sx={{ alignContent: 'center', }}><Typography variant="body1">City</Typography></Grid>
                                        <Grid container item xs={8} sx={{ alignContent: 'center', }}><TextField fullWidth size="small" value={city} onChange={(e) => handleAccountChange(e, setCity)} /></Grid>
                                        <Grid container item xs={4} sx={{ alignContent: 'center', }}><Typography variant="body1">State</Typography></Grid>
                                        <Grid container item xs={8} sx={{ alignContent: 'center', }}><TextField fullWidth size="small" value={state} onChange={(e) => handleAccountChange(e, setState)} /></Grid>
                                        <Grid container item xs={4} sx={{ alignContent: 'center', }}><Typography variant="body1">Country</Typography></Grid>
                                        <Grid container item xs={8} sx={{ alignContent: 'center', }}><TextField fullWidth size="small" value={country} onChange={(e) => handleAccountChange(e, setCountry)} /></Grid>
                                    </Grid>
                                    <Grid container item xs={12} justifyContent="center" >
                                        <Button variant="outlined" sx={{ margin: '5px' }} onClick={() => {
                                            resetEditData(patient);
                                            setEditMode(!editMode)
                                        }} >Cancel</Button>
                                        <Button variant="outlined" sx={{ margin: '5px' }} onClick={() => {
                                            updatePatientEdit();
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
                        <Paper sx={classes.Paper}>
                            <Typography variant="h5" align="center" gutterBottom >Relations/Affiliations</Typography>
                            <Typography variant="h6" align="center" >Prescribers <IconButton onClick={() => setToggleRelationshipModal(true)}><AddCircle /></IconButton></Typography>
                            <Modal
                                open={toggleRelationshipModal}
                                aria-labelledby="simple-modal-title"
                                aria-describedby="simple-modal-description"
                            >
                                <Box sx={classes.ModalPaper}>
                                    <div>
                                        <IconButton onClick={() => setToggleRelationshipModal(false)}><RemoveCircle /></IconButton>
                                    </div>
                                    <Grid container spacing={1} >
                                        <Search
                                            profileType="prescriber"
                                            fieldObjects={[
                                                { label: 'First Name', propertyName: 'firstName', value: '' },
                                                { label: 'Last Name', propertyName: 'lastName', value: '' },
                                                { label: 'Phone Number', propertyName: 'phoneNumber', value: '' },
                                                { label: 'Fax Number', propertyName: 'faxNumber', value: '' },
                                                { label: 'Email', propertyName: 'email', value: '' },
                                                { label: 'NPI', propertyName: 'npiNumber', value: '' },
                                                { label: 'DEA', propertyName: 'deaNumber', value: '' },
                                                { label: 'Zip Code', propertyName: 'zip', value: '' },
                                            ]}
                                            searchUrl={`${serverURL}/searchPrescribers`}
                                            type="select"
                                            onClickFunc={createRelationship}
                                        />
                                    </Grid>
                                </Box>
                            </Modal>
                            <TableContainer component={Paper}>
                                <Table size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell sx={classes.TableHeader}>ID</TableCell>
                                            <TableCell sx={classes.TableHeader}>First Name</TableCell>
                                            <TableCell sx={classes.TableHeader}>Last Name</TableCell>
                                            <TableCell sx={classes.TableHeader}>NPI Number</TableCell>
                                            <TableCell sx={classes.TableHeader}>DEA Number</TableCell>
                                            <TableCell></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {prescribers.length > 0 ? prescribers.map((prescriber, i) => (
                                            <RelationshipHistorySection key={`relationship-prescriber-${i}`} prescriber={prescriber} />
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
                        <Paper sx={classes.Paper}>
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
                                                    <TableCell><Typography component={Link} to={`/agent/${n.createdBy.accountId}`}>{n.createdBy.username}</Typography></TableCell>
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
                        <Paper sx={classes.Paper}>
                            <Typography variant="h5" align="center" gutterBottom >Labs</Typography>
                            <Grid container justifyContent="center" spacing={1} sx={{ marginBottom: '15px' }}>
                                <Grid item xs={6} sm={5} >
                                    <TextField
                                        focused
                                        fullWidth
                                        id="bdd"
                                        label="Blood Draw Date"
                                        type="date"
                                        color="primary"
                                        value={bloodDrawDate}
                                        sx={classes.TextField}
                                        onChange={(e) => handleLabChange(e, setBloodDrawDate)}
                                    />
                                </Grid>
                                <Grid item xs={6} sm={5} >
                                    <TextField fullWidth label="ANC" value={anc} onChange={(e) => handleLabChange(e, setAnc)} />
                                </Grid>
                                <Grid container item xs={12} sm={1} sx={{ alignContent: 'center', justifyContent: 'center', }}>
                                    <IconButton onClick={addLab}>
                                        <AddCircle />
                                    </IconButton>
                                </Grid>
                            </Grid>
                            <TableContainer component={Paper}>
                                <Table size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Timestamp</TableCell>
                                            <TableCell>BDD</TableCell>
                                            <TableCell>ANC</TableCell>
                                            <TableCell>Created By</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {labs.map(lab => (
                                            <TableRow key={lab._id}>
                                                <TableCell>{lab.timestamp}</TableCell>
                                                <TableCell>{lab.bloodDrawDate}</TableCell>
                                                <TableCell>{lab.anc}</TableCell>
                                                <TableCell>{lab.createdBy}</TableCell>
                                            </TableRow>
                                        ))}

                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>
                    </Grid>
                </Grid>
            </Grid >
        </Container >
    );
}
