import React, { useState } from 'react'
import { Paper, Grid, FormControlLabel, FormControl, FormLabel, RadioGroup, Radio } from '@mui/material';
import PrescriberSearch from './Search/PrescriberSearch';
import PatientSearch from './Search/PatientSearch';


export default function Search() {
    const [searchType, setSearchType] = useState('patient');

    const handleChange = (event) => {
        setSearchType(event.target.value);
    };

    return (
        <Paper sx={{ padding: '0px 15px', margin: '10px 0px', minHeight: 'calc(100% - 84px)' }}>
            <FormControl sx={{ textAlign: 'center', padding: '10px 0px' }} fullWidth >
                <FormLabel component="legend">Account Type</FormLabel>
                <RadioGroup row aria-label="account-type" name="account-type" value={searchType} onChange={handleChange} sx={{ justifyContent: 'center', }} >
                    <FormControlLabel value="patient" control={<Radio />} label="Patient" labelPlacement="bottom" />
                    <FormControlLabel value="prescriber" control={<Radio />} label="Prescriber" labelPlacement="bottom" />
                    <FormControlLabel value="pharmacy" disabled control={<Radio />} label="Pharmacy" labelPlacement="bottom" />
                </RadioGroup>
            </FormControl>
            <Grid container spacing={1}>
                {searchType === 'patient' ? <PatientSearch type="open"/> : searchType === 'prescriber' && <PrescriberSearch />}
            </Grid>
        </Paper>
    )
}
