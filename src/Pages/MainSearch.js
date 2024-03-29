import React, { useState } from 'react'
import { Paper, Grid, FormControlLabel, FormControl, FormLabel, RadioGroup, Radio } from '@mui/material';
import Search from '../Components/Search/Search';
import serverURL from '../serverURL';


export default function MainSearch(props) {
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
                    <FormControlLabel value="agent" control={<Radio />} label="Agent" labelPlacement="bottom" />
                </RadioGroup>
            </FormControl>
            <Grid container spacing={1}>
                {searchType === 'patient' ?
                    <Search
                        profileType="patient"
                        fieldObjects={[
                            { label: 'First Name', propertyName: 'firstName', value: '' },
                            { label: 'Last Name', propertyName: 'lastName', value: '' },
                            { label: 'Phone Number', propertyName: 'phoneNumber', value: '' },
                            { label: 'Date of Birth', propertyName: 'dateOfBirth', value: '' },
                            { label: 'Zip Code', propertyName: 'zip', value: '' },
                        ]}
                        searchUrl={`${serverURL}/patientSearch`}
                    /> : searchType === 'prescriber' ?
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
                        searchUrl={`${serverURL}/prescriberSearch`}
                    /> :
                    <Search
                        profileType="agent"
                        fieldObjects={[
                            { label: 'Username', propertyName: 'username', value: '' },
                            { label: 'First Name', propertyName: 'firstName', value: '' },
                            { label: 'Last Name', propertyName: 'lastName', value: '' },
                            { label: 'Email', propertyName: 'email', value: '' },
                            { label: 'Role', propertyName: 'role', value: '' },
                            { label: 'Supervisor', propertyName: 'supervisor', value: '' },
                        ]}
                        searchUrl={`${serverURL}/agentSearch`}
                    />
                    }
            </Grid>
        </Paper>
    )
}
