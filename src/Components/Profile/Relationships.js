import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Box, Dialog, Grid, IconButton, Modal, Paper, Typography } from '@mui/material';
import { DataGrid } from "@mui/x-data-grid";
import { AddCircle,  RemoveCircle } from '@mui/icons-material';
import dayjs from 'dayjs';
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
        backgroundColor: 'background.ATCPaperBackground',
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
    const [toggleRelationshipSearchModal, setToggleRelationshipSearchModal] = useState(false);
    const [toggleRelationshipHistoryDialog, setToggleRelationshipHistoryDialog] = useState(false);
    const [currentRelationshipHistory, setCurrentRelationshipHistory] = useState([{}]);

    const createRelationship = (prescriber) => {
        const bearer = `Bearer ${localStorage.getItem("JWT_AUTH_TOKEN")}`;

        fetch(`${serverURL}/manageRelationship`, {
            method: 'post',
            dataType: 'json',
            body: JSON.stringify({
                patient: account._id,
                prescriber,
                action: 'activate',
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Authorization": bearer,
            }
        })
    }
    
    const RelationshipHistory = ({ history }) => {

        const dataGridColumns = [
            {
                field : "date",
                headerName: "Date",
                flex: 1,
            },
            {
                field : "action",
                headerName: "Action",
                flex: 1,
            },
        ];

        return (
        <div style={{ height: "375px" }}>
            <DataGrid
                getRowId={(row) => row._id}
                rows={history}
                columns={dataGridColumns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                onCellDoubleClick={(params, event) => {
                    if (!event.ctrlKey) {
                      event.defaultMuiPrevented = true;
                    }
                    setToggleRelationshipHistoryDialog(true)
                  }}
            />
        </div>
        )
        
    }

    const dataGridColumns = {
        patient: [
            {
                field: "_id",
                headerName: "ID",
                flex: 1,
                renderCell: (params) => (<Typography component={Link} to={`/patientProfile/${params.row._id}`}>{params.row._id}</Typography>),
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
                renderCell: (params) => (dayjs(params.row.dateOfBirth).format("YYYY-MM-DD") || 'N/A'),
            },
            {
                field: "zip",
                headerName: "Zip Code",
                flex: 1,
            },
        ],
        prescriber: [
            {
                field: "_id",
                headerName: "ID",
                flex: 1,
                renderCell: (params) => (<Typography component={Link} to={`/prescriberProfile/${params.row._id}`}>{params.row._id}</Typography>),
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
            const uniqueRelationshipsArray = [...new Set(relationshipsArray.map(item => item[`${searchType}`]))];
            setRelatedAccounts(uniqueRelationshipsArray);
        }
        getRelationships();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Grid container item xs={12}>
            <Paper sx={classes.Paper}>
                <Typography variant="h5" align="center" gutterBottom >Relations/Affiliations</Typography>
                <Typography variant="h6" align="center" >{searchType[0].toUpperCase() + searchType.slice(1)} <IconButton onClick={() => setToggleRelationshipSearchModal(true)}><AddCircle /></IconButton></Typography>
                <Modal
                    open={toggleRelationshipSearchModal}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                    <Box sx={classes.ModalPaper}>
                        <div>
                            <IconButton onClick={() => setToggleRelationshipSearchModal(false)}><RemoveCircle /></IconButton>
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
                <Dialog open={toggleRelationshipHistoryDialog} onClose={()=>setToggleRelationshipHistoryDialog(false)} maxWidth="md" fullWidth >
                    <RelationshipHistory history={currentRelationshipHistory} />
                </Dialog>
                <div style={{ height: "375px" }}>
                    <DataGrid
                        getRowId={(row) => row._id}
                        rows={relatedAccounts}
                        columns={dataGridColumns[searchType]}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        onRowDoubleClick={(params, event) => {
                            if (!event.ctrlKey) {
                              event.defaultMuiPrevented = true;
                            }
                            setCurrentRelationshipHistory(params.row.completeHistory)
                            setToggleRelationshipHistoryDialog(true)
                          }}
                    />
                </div>
            </Paper>
        </Grid>
    )
}
