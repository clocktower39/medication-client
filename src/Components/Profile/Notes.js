import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Grid, IconButton, Paper, TextField, Typography } from '@mui/material';
import { DataGrid } from "@mui/x-data-grid";
import { AddCircle, } from '@mui/icons-material';
import serverURL from '../../serverURL';

const classes = {
    Paper: {
        margin: '7.5px',
        padding: '7.5px',
        width: '100%',
        overflow: 'hidden',
    },
};

export default function Notes({ account, setAccount, accountType }) {
    const [newNote, setNewNote] = useState('');
    const [notes, setNotes] = useState([]);
    const agent = useSelector(state => state.agent);

    const handleNoteChange = (e) => {
        setNewNote(e.target.value);
    }

    const submitNote = async () => {
        const bearer = `Bearer ${localStorage.getItem("JWT_AUTH_TOKEN")}`;

        const response = await fetch(`${serverURL}/submitNote`, {
            method: 'post',
            dataType: 'json',
            body: JSON.stringify({
                account: {
                    id: account._id,
                    type: accountType,
                },
                summary: newNote,
                createdBy: {
                    username: agent.username,
                    id: agent._id,
                },
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Authorization": bearer,
            }
        });
        const data = await response.json();
        if (data.error) {

        }
        else {
            setNotes(prevNotes => [ data.note, ...prevNotes, ]);
            setNewNote('');
        }
    }


    useEffect(() => {
        // fetch the account notes
        const bearer = `Bearer ${localStorage.getItem("JWT_AUTH_TOKEN")}`;

        const getAccountNotes = async () => fetch(`${serverURL}/notes/${account._id}`, { headers: { "Authorization": bearer } }).then(res => res.json()).then(data => setNotes(data));
        getAccountNotes().then(res => setAccount(prev => ({ ...prev, notes: res })));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const dataGridRows = notes.sort((a, b) => a.timestamp < b.timestamp).map((note) => {
        note.linkToCreatedByUser = `/agentProfile/${note.createdBy.id}`;
        note.createdByUsername = note.createdBy.username;
        return note;
      });
    const dataGridColumns = [
        {
            field: "_id",
            headerName: "ID",
            flex: 1,
        },
        {
            field: "timestamp",
            headerName: "Date",
            flex: 1,
        },
        {
            field: "createdByUsername",
            headerName: "Created By",
            flex: 1,
            renderCell: (params) => (<Typography component={Link} to={params.row.linkToCreatedByUser}>{params.row.createdByUsername}</Typography>)
        },
        {
            field: "summary",
            headerName: "Note Summary",
            flex: 1,
        },
    ]

    return (
        <Grid container item xs={12}>
            <Paper sx={classes.Paper}>
                <Typography variant="h5" align="center" gutterBottom >Notes</Typography>
                <Grid container >
                    <Grid container item xs={12} sx={{ alignContent: 'center', }}><TextField onChange={handleNoteChange} multiline fullWidth value={newNote} /></Grid>
                    <Grid container item xs={12} sx={{ alignContent: 'center', justifyContent: 'center', }}><IconButton onClick={submitNote}><AddCircle /></IconButton></Grid>
                </Grid>
                <div style={{ height: "375px" }}>
                    <DataGrid
                        getRowId={(row) => row._id}
                        rows={dataGridRows}
                        columns={dataGridColumns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                    />
                </div>
            </Paper>
        </Grid>
    )
}
