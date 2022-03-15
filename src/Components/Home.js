import React from 'react'
import { useSelector } from 'react-redux';
import { Grid, Paper, Typography } from '@mui/material/';

export default function Home() {
    const agent = useSelector(state => state.agent);
    const schedule = useSelector(state => state.schedule);

    const PinnedSubheaderList = (props) => {
        const { projects, breakdown } = props;
        return (
            <Grid container item xs={12} component={Paper}>
                <Grid container item xs={12} sx={{ justifyContent: 'center', }} ><Typography variant="body1" gutterBottom >Schedule</Typography></Grid>
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
                <Grid container item xs={12} sx={{ justifyContent: 'center', marginTop: '15px' }} ><Typography variant="body1" gutterBottom >Projects</Typography></Grid>
                {projects.map((project) => (
                    <Grid container item xs={6} key={project} sx={{ justifyContent: 'center', }}>
                        <Typography variant="body1" >{project}</Typography>
                    </Grid>
                ))}
            </Grid>
        );
    }

    return (
        <div style={{
            minHeight: 'calc(100% - 64px)',
            backgroundColor: '#333',
        }}>
            <Typography variant="h4" align="center" sx={{
                color: '#ffffff',
                padding: '25px',
            }} >Welcome {agent.username}!</Typography>
            <Grid container spacing={1} sx={{ justifyContent: "center", alignItems: "center" }}>
                <Grid container item xs={12} spacing={3} sx={{ justifyContent: "center", alignItems: "center" }}>
                    {schedule && schedule.week.map(day => (
                        <Grid item xs={12} sm={6} md={4} key={day.day} >
                            <Paper sx={theme => ({
                                padding: theme.spacing(1),
                                textAlign: 'center',
                                backgroundColor: '#424242',
                                color: 'rgba(255, 255, 255, 0.7)',
                            })}>
                                <Typography variant="h6" gutterBottom >{day.day}</Typography>
                                <PinnedSubheaderList breakdown={day.breakdown} projects={day.projects} />
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </div>
    )
}
