import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
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
                "Content-type": "application/json; charset=UTF-8"
            }
        });
        const data = await response.json();
        if(data.error){

        }
        else {
            setNotes(prevNotes => [...prevNotes, data.note]);
            setNewNote('');
        }
    }


    useEffect(() => {
        // fetch the account notes
        const getAccountNotes = async () => fetch(`${serverURL}/notes/${account._id}`).then(res => res.json()).then(data => setNotes(data));
        getAccountNotes().then(res => setAccount(prev => ({ ...prev, notes: res }) ));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

  return (
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
                            <TableCell>Created By</TableCell>
                            <TableCell>Note Summary</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {notes.length > 0 ?
                            notes.map(n => (
                                <TableRow key={n._id}>
                                    <TableCell>{n.timestamp}</TableCell>
                                    <TableCell><Typography component={Link} to={`/agentProfile/${n.createdBy.id}`}>{n.createdBy.username}</Typography></TableCell>
                                    <TableCell>{n.summary}</TableCell>
                                </TableRow>
                            )) :
                            <TableRow><TableCell>No notes </TableCell></TableRow>}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    </Grid>
  )
}
