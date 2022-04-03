import React from 'react'
import { Grid, Paper, Typography } from '@mui/material/';

export default function Schedule(props) {
    const { projects, breakdown } = props;
    return (
        <Grid container item xs={12} component={Paper} sx={{ minHeight: "90%", }}>
            <Grid container item xs={12} sx={{ justifyContent: 'center', }} ><Typography variant="body1" sx={{ fontWeight: 600}} gutterBottom >Schedule</Typography></Grid>
            <Grid container item xs={12}>
                {breakdown.map(scheduleSection => (
                    <Grid container item xs={12} key={scheduleSection.start} >
                        <Grid container item xs={6} sx={{ justifyContent: 'center', }}>
                            <Typography variant="body1" >{`${scheduleSection.start} - ${scheduleSection.end}: `}</Typography>
                        </Grid>
                        <Grid container item xs={6} sx={{ justifyContent: 'center', }}>
                            <Typography variant="body1" >{`${scheduleSection.task}`}</Typography>
                        </Grid>
                    </Grid>
                ))}
            </Grid>
            <Grid container item xs={12} sx={{ justifyContent: 'center', marginTop: '15px' }} ><Typography variant="body1" sx={{ fontWeight: 600}} gutterBottom >Projects</Typography></Grid>
            {projects.map((project) => (
                <Grid container item xs={12} key={project} sx={{ justifyContent: 'center', }}>
                    <Typography variant="body1" >{project}</Typography>
                </Grid>
            ))}
        </Grid>
    );
}
