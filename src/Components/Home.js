import React from 'react'
import { useSelector } from 'react-redux';
import { Grid, Typography } from '@mui/material/';
import Schedule from './Schedule';

export default function Home() {
    const agent = useSelector(state => state.agent);
    const schedule = useSelector(state => state.schedule);

    return (
        <div style={{
            minHeight: 'calc(100% - 84px)',
            backgroundColor: '#333',
        }}>
            <Typography variant="h4" align="center" sx={{
                color: '#ffffff',
                padding: '25px',
            }} >Welcome {agent.username}!</Typography>
            <Grid container spacing={1} sx={{ justifyContent: "center", alignItems: "center" }}>
                <Grid container item xs={12} spacing={1} sx={{ justifyContent: "center", }}>
                    {schedule && schedule.week.map(day => <Schedule key={day.day} breakdown={day.breakdown} projects={day.projects} day={day.day} />)}
                </Grid>
            </Grid>
        </div>
    )
}
