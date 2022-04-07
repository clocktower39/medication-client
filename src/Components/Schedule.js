import React, { useState } from 'react'
import { Accordion, AccordionDetails, AccordionSummary, Grid, Typography } from '@mui/material/';
import { ExpandMore } from '@mui/icons-material/';

export default function Schedule(props) {
    const { day, projects, breakdown } = props;
    const [expanded, setExpanded] = useState(false);

    return (
        <Grid container item xs={12} sm={6} md={4} sx={expanded?{ alignSelf: 'stretch', }:{ alignSelf: 'flex-start', }} >
            <Accordion sx={{ color: '#fff', backgroundColor: '#424242', }} expanded={expanded} onChange={(e)=>setExpanded(prev=>!prev)} >
                <AccordionSummary
                    expandIcon={<ExpandMore />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography variant="h6" gutterBottom >{day}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container item xs={12} sx={{ justifyContent: 'center', }} ><Typography variant="body1" sx={{ fontWeight: 600 }} gutterBottom >Schedule</Typography></Grid>
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
                    <Grid container item xs={12} sx={{ justifyContent: 'center', marginTop: '15px' }} ><Typography variant="body1" sx={{ fontWeight: 600 }} gutterBottom >Projects</Typography></Grid>
                    {projects.map((project) => (
                        <Grid container item xs={12} key={project} sx={{ justifyContent: 'center', }}>
                            <Typography variant="body1" >{project}</Typography>
                        </Grid>
                    ))}
                </AccordionDetails>
            </Accordion>
        </Grid>
    );
}
