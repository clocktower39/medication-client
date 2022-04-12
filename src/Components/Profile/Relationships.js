import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Box, Grid, IconButton, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
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

export default function Relationships({ account, accountType, searchType }) {
    const [relatedAccounts, setRelatedAccounts] = useState([]);
    const [toggleRelationshipModal, setToggleRelationshipModal] = useState(false);

    const createRelationship = (prescriberId) => {
        fetch(`${serverURL}/manageRelationship`, {
            method: 'post',
            dataType: 'json',
            body: JSON.stringify({
                patientId: account._id,
                prescriberId,
                action: 'activate',
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
    }

    const RelationshipHistorySection = ({ relatedAccount, searchType }) => {
        const [expandHistory, setExpandHistory] = useState(false);
        return searchType === 'patient' ? (
            <>
                <TableRow key={relatedAccount._id}>
                    <TableCell><Link to={`/patientProfile/${relatedAccount._id}`}>{relatedAccount._id}</Link></TableCell>
                    <TableCell>{relatedAccount.firstName}</TableCell>
                    <TableCell>{relatedAccount.lastName}</TableCell>
                    <TableCell>{relatedAccount.dateOfBirth.substr(0, 10)}</TableCell>
                    <TableCell>{relatedAccount.zip}</TableCell>
                    <TableCell><IconButton onClick={() => setExpandHistory(prevState => !prevState)}><ExpandMore /></IconButton></TableCell>
                </TableRow>
                {expandHistory === true && (
                    <>

                        <TableRow>
                            <TableCell colSpan={1} sx={classes.TableHeader}></TableCell>
                            <TableCell colSpan={2} sx={classes.TableHeader}>Date</TableCell>
                            <TableCell colSpan={2} sx={classes.TableHeader}>Action</TableCell>
                        </TableRow>

                        {relatedAccount.completeHistory.map(historyItem => (
                            <TableRow key={historyItem.date}>
                                <TableCell colSpan={1} ></TableCell>
                                <TableCell colSpan={2} >{historyItem.date}</TableCell>
                                <TableCell colSpan={2} >{historyItem.action}</TableCell>
                            </TableRow>
                        ))}
                    </>
                )}
            </>
        ) : (
            <>
                <TableRow key={relatedAccount._id}>
                    <TableCell><Link to={`/${searchType}Profile/${relatedAccount._id}`}>{relatedAccount._id}</Link></TableCell>
                    <TableCell>{relatedAccount.firstName}</TableCell>
                    <TableCell>{relatedAccount.lastName}</TableCell>
                    <TableCell>{relatedAccount.npiNumber || ""}</TableCell>
                    <TableCell>{relatedAccount.deaNumber || ""}</TableCell>
                    <TableCell><IconButton onClick={() => setExpandHistory(prevState => !prevState)}><ExpandMore /></IconButton></TableCell>
                </TableRow >
                {expandHistory === true && (
                    <>
                        <TableRow>
                            <TableCell colSpan={1} sx={classes.TableHeader}></TableCell>
                            <TableCell colSpan={2} sx={classes.TableHeader}>Date</TableCell>
                            <TableCell colSpan={2} sx={classes.TableHeader}>Action</TableCell>
                        </TableRow>

                        {relatedAccount.completeHistory.map(historyItem => (
                            <TableRow key={historyItem.date}>
                                <TableCell colSpan={1} ></TableCell>
                                <TableCell colSpan={2} >{historyItem.date}</TableCell>
                                <TableCell colSpan={2} >{historyItem.action}</TableCell>
                            </TableRow>
                        ))}
                    </>
                )
                }
            </>)
    }

    useEffect(() => {
        setRelatedAccounts([]);
        const getRelationships = async () => {
            // fetch the patient relationships
            const relationshipsArray = await fetch(`${serverURL}/relationships/${accountType}/${account._id}`).then(res => res.json());
            const uniqueRelationshipsArray = [...new Set(relationshipsArray.map(item => item[`${searchType}Id`]))];

            // add each PR from the relationship history
            uniqueRelationshipsArray.forEach((id) => {
                fetch(`${serverURL}/${searchType}Profile/${id}`)
                    .then(res => res.json())
                    .then(data => {
                        setRelatedAccounts(prevList => [...prevList, { ...data[0], completeHistory: relationshipsArray.filter(item => item[`${searchType}Id`] === id) }]);
                    })
            })
        }
        getRelationships();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Grid container item xs={12}>
            <Paper sx={classes.Paper}>
                <Typography variant="h5" align="center" gutterBottom >Relations/Affiliations</Typography>
                <Typography variant="h6" align="center" >{searchType[0].toUpperCase() + searchType.slice(1)} <IconButton onClick={() => setToggleRelationshipModal(true)}><AddCircle /></IconButton></Typography>
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
                            {searchType === "patient" ? (
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
                            ) : (
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
                                    searchUrl={`${serverURL}/${searchType}Search`}
                                    type="select"
                                    onClickFunc={createRelationship}
                                />)}
                        </Grid>
                    </Box>
                </Modal>
                <TableContainer component={Paper}>
                    <Table size="small">
                        <TableHead>
                            {searchType === "patient" ? (
                                <TableRow>
                                    <TableCell sx={classes.TableHeader} >ID</TableCell>
                                    <TableCell sx={classes.TableHeader} >First Name</TableCell>
                                    <TableCell sx={classes.TableHeader} >Last Name</TableCell>
                                    <TableCell sx={classes.TableHeader} >Date of Birth</TableCell>
                                    <TableCell sx={classes.TableHeader} >Zip Code</TableCell>
                                </TableRow>
                            ) : (
                                <TableRow>
                                    <TableCell sx={classes.TableHeader} >ID</TableCell>
                                    <TableCell sx={classes.TableHeader} >First Name</TableCell>
                                    <TableCell sx={classes.TableHeader} >Last Name</TableCell>
                                    <TableCell sx={classes.TableHeader} >NPI Number</TableCell>
                                    <TableCell sx={classes.TableHeader} >DEA Number</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            )}
                        </TableHead>
                        <TableBody>
                            {relatedAccounts.length > 0 ? relatedAccounts.map((relatedAccount, i) => (
                                <RelationshipHistorySection key={`relationship-${searchType}-${i}`} relatedAccount={relatedAccount} searchType={searchType} />
                            )) :
                                <TableRow>
                                    <TableCell>No active {searchType}</TableCell>
                                </TableRow>
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Grid>
    )
}
