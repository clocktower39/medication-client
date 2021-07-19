import React from 'react'
import { Grid, Typography } from '@material-ui/core/';

export default function Review(props) {
    return (
        <Grid container spacing={3}>
            {props.values.map((value) => (
            <Grid item md={4} sm={6} xs={12}>
                <Typography variant="body1">{value}</Typography>
            </Grid>))}
        </Grid>
    )
}
