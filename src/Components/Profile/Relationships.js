import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Box, Grid, IconButton, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { DataGrid } from "@mui/x-data-grid";
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
        const bearer = `Bearer ${localStorage.getItem("JWT_AUTH_TOKEN")}`;

        fetch(`${serverURL}/manageRelationship`, {
            method: 'post',
            dataType: 'json',
            body: JSON.stringify({
                patientId: account._id,
                prescriberId,
                action: 'activate',
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Authorization": bearer,
            }
        })
    }
    
    // <RelationshipHistorySection key={`relationship-${searchType}-${i}`} relatedAccount={relatedAccount} searchType={searchType} />
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

    const dataGridColumns = {
        patient: [
            {
                field: "_id",
                headerName: "ID",
                flex: 1,
            },
            {
                field: "firstName",
                headerName: "First Name",
                flex: 1,
            },
            {
                field: "lastName",
                headerName: "Last Name",
                flex: 1,
            },
            {
                field: "dateOfBirth",
                headerName: "Date of Birth",
                flex: 1,
                renderCell: (params) => (params.row.dateOfBirth.substr(0, 10)),
            },
            {
                field: "zip",
                headerName: "Zip Code",
                flex: 1,
            },
            {
                field: "expand",
                headerName: "Zip Code",
                flex: 1,
            },
        ],
        prescriber: [
            {
                field: "_id",
                headerName: "ID",
                flex: 1,
                renderCell: (params) => (<Typography component={Link} to={`/${accountType}Profile/${account._id}`}>{account._id}</Typography>),
            },
            {
                field: "firstName",
                headerName: "First Name",
                flex: 1,
            },
            {
                field: "lastName",
                headerName: "Last Name",
                flex: 1,
            },
            {
                field: "npiNumber",
                headerName: "NPI Number",
                flex: 1,
            },
            {
                field: "deaNumber",
                headerName: "DEA Number",
                flex: 1,
            },
        ]
    }

    useEffect(() => {
        setRelatedAccounts([]);
        const getRelationships = async () => {

            const bearer = `Bearer ${localStorage.getItem("JWT_AUTH_TOKEN")}`;
            // fetch the patient relationships
            const relationshipsArray = await fetch(`${serverURL}/relationships/${accountType}/${account._id}`, { headers: { "Authorization": bearer } }).then(res => res.json());
            const uniqueRelationshipsArray = [...new Set(relationshipsArray.map(item => item[`${searchType}Id`]))];

            // add each PR from the relationship history
            uniqueRelationshipsArray.forEach((id) => {
                fetch(`${serverURL}/${searchType}Profile/${id}`, { headers: { "Authorization": bearer } })
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
                <div style={{ height: "375px" }}>
                    <DataGrid
                        getRowId={(row) => row._id}
                        rows={relatedAccounts}
                        columns={dataGridColumns['prescriber']}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                    />
                </div>
            </Paper>
        </Grid>
    )
}
