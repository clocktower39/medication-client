import React, { useState } from 'react'
import { Paper, Grid, FormControlLabel, FormControl, FormLabel, RadioGroup, Radio } from '@mui/material';
import { makeStyles } from '@mui/styles';
import PrescriberSearch from './Search/PrescriberSearch';
import PatientSearch from './Search/PatientSearch';

const useStyles = makeStyles({
    root: {
        padding: '10px 15px',
    },
    FormControl:{
        textAlign: 'center',
    },
    RadioGroup:{
        justifyContent: 'center',
    },
});

export default function Search() {
    const classes = useStyles();
    const [searchType, setSearchType] = useState('patient');

    const handleChange = (event) => {
        setSearchType(event.target.value);
    };

    return (
        <Paper className={classes.root}>
            <FormControl className={classes.FormControl} fullWidth >
                <FormLabel component="legend">Account Type</FormLabel>
                <RadioGroup row aria-label="account-type" name="account-type" value={searchType} onChange={handleChange} className={classes.RadioGroup} >
                    <FormControlLabel value="patient" control={<Radio />} label="Patient" labelPlacement="bottom" />
                    <FormControlLabel value="prescriber" control={<Radio />} label="Prescriber" labelPlacement="bottom" />
                    <FormControlLabel value="pharmacy" disabled control={<Radio />} label="Pharmacy" labelPlacement="bottom" />
                </RadioGroup>
            </FormControl>
            <Grid container>
                {searchType === 'patient'? <PatientSearch />:searchType === 'prescriber'?<PrescriberSearch/>:<></>}
            </Grid>
        </Paper>
    )
}
