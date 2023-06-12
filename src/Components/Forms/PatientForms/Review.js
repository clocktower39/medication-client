import React from "react";
import { Grid, Typography } from "@mui/material/";

export default function Review(props) {
  const { values } = props;

  return (
    <Grid container spacing={3}>
      {Object.keys(values).map((value) => (
        <Grid item md={4} sm={6} xs={12}>
          <Typography variant="body1">{values[value].value}</Typography>
        </Grid>
      ))}
    </Grid>
  );
}
