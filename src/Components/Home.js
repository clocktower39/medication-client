import React from 'react'
import { useSelector } from 'react-redux';
import { Grid, List, ListItem, ListItemText, ListSubheader, Paper, Typography } from '@mui/material/';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 0,
        backgroundColor: '#333',
        minHeight: 75,
    },
    paper: {
        padding: theme.spacing(1),
        textAlign: 'center',
        backgroundColor: '#424242',
        color: 'rgba(255, 255, 255, 0.7)',
    },
    Typography:{
        color: '#ffffff',
        padding: '25px',
    },
    PinnedRoot: {
      width: '100%',
      maxWidth: 265,
      minHeight: 300,
      maxHeight: 500,
      backgroundColor: theme.palette.background.paper,
      position: 'relative',
      overflow: 'auto',
    },
    listSection: {
      backgroundColor: 'inherit',
    },
    ul: {
      backgroundColor: 'inherit',
      padding: 0,
      margin: 0,
    },
    li: {
        lineHeight: 2,
    },
    liTimes: {
        color: 'black',
        fontSize: "8px",
        height: 2,
        textAlign: 'left',
        maxWidth: 105
    }
}));

export default function Home() {
    const classes = useStyles();
    const agent = useSelector(state => state.agent);

    const PinnedSubheaderList = (props) => {
        return (
            <List className={classes.PinnedRoot} subheader={<li />} >
                <ListSubheader className={classes.li}>Schedule</ListSubheader>
                {props.breakdown.map( scheduleSection => (
                    <ListItem key={scheduleSection.start}>
                        <ListItemText primary={`${scheduleSection.start} - ${scheduleSection.end}: `} className={classes.liTimes} />
                        <ListItemText primary={`${scheduleSection.task}`} className={classes.liTimes} />
                    </ListItem>
                ))}
                <br />
                <ListSubheader className={classes.li}>Weekly Projects</ListSubheader>
                {agent.schedule.weeklyProjects.map((project)=>(
                    <ListItem key={project}>
                        <ListItemText primary={project} className={classes.liTimes} />
                    </ListItem>
                ))}
            </List>
        );
    }

    return (
        <div className={classes.root}>
            <Typography variant="h4" align="center" className={classes.Typography} >Welcome {agent.username}!</Typography>
            <Grid container spacing={1} style={{ justifyContent:"center", alignItems:"center" }}>
                <Grid container item xs={12} spacing={3} style={{ justifyContent:"center", alignItems:"center" }}>
                    {agent.schedule.week.map(day => (
                        <Grid item xs={3} key={day.day} >
                            <Paper className={classes.paper}>{day.day}
                                <PinnedSubheaderList breakdown={day.breakdown}/>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </div>
    )
}
