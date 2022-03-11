import React from "react";
import { Avatar, Container, Grid, Paper, Typography } from "@mui/material";

const classes = {
  Avatar: {
    height: "125px",
    width: "125px",
  },
  PaperSection: { marginBottom: "7.5px", padding: "5px" },
};

export default function AgentProfile() {
  return (
    <Container maxWidth="lg" sx={{ padding: "7.5px 0px" }}>
      <Grid container>
        <Grid container component={Paper} sx={classes.PaperSection}>
          <Grid container item xs={4} sx={{ justifyContent: "center" }}>
            <Avatar sx={classes.Avatar} />
          </Grid>
          <Grid container item xs={8} sx={{ flexDirection: 'column', justifyContent: "center", alignItems: "center" }}>
            <Typography variant="h6">Agent</Typography>
            <Typography variant="h6">Title</Typography>
            <Typography variant="h5">firstName lastName</Typography>
          </Grid>
          <Grid container item xs={12}>
            <Grid container item><Typography variant="body1">Supervisor:</Typography></Grid>
            <Grid container item><Typography variant="body1">Projects:</Typography></Grid>
          </Grid>
        </Grid>

        <Grid container component={Paper} sx={classes.PaperSection}>
          <Grid container item sx={{ justifyContent: "center" }}>
            <Typography variant="h5">Services</Typography>
          </Grid>
          <Grid container item>
            <Typography variant="h5">Table</Typography>
          </Grid>
        </Grid>

        <Grid container component={Paper} sx={classes.PaperSection}>
          <Grid container item sx={{ justifyContent: "center" }}>
            <Typography variant="h5">Notes</Typography>
          </Grid>
          <Grid container item>
            <Typography variant="h5">Table</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
