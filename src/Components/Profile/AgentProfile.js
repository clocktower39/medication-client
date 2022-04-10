import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { Avatar, Container, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { getAgentInfo, getAgentServices, getAgentNotes } from "../../Redux/actions";
import Loading from "../Loading";
import Schedule from '../Schedule';

const classes = {
  Avatar: {
    height: "125px",
    width: "125px",
  },
  PaperSection: { marginBottom: "7.5px", padding: "5px" },
};

export default function AgentProfile() {
  const dispatch = useDispatch();
  const params = useParams();
  const agentProfile = useSelector((state) => state.agentProfile);
  const schedule = useSelector(state => state.schedule);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(getAgentInfo(params.agentId));
    dispatch(getAgentNotes(params.agentId));
    dispatch(getAgentServices(params.agentId));
  }, [dispatch, params.agentId]);

  useEffect(() => {
    if (agentProfile.agent && agentProfile.notes) {
      setLoading(false);
    }
  }, [agentProfile]);

  return loading ? (
    <Loading />
  ) : (
    <Container maxWidth="lg" sx={{ padding: "7.5px 0px" }}>
      <Grid container>
        <Grid container component={Paper} sx={classes.PaperSection}>
          <Grid container item xs={4} sx={{ justifyContent: "center" }}>
            <Avatar sx={classes.Avatar} />
          </Grid>
          <Grid
            container
            item
            xs={8}
            sx={{ flexDirection: "column", justifyContent: "center", alignItems: "center" }}
          >
            <Typography variant="h6">{agentProfile.agent.username}</Typography>
            <Typography variant="h6">{agentProfile.agent.role}</Typography>
            <Typography variant="h5">
              {agentProfile.agent.firstName} {agentProfile.agent.lastName}
            </Typography>
          </Grid>
          <Grid container item xs={10} sx={{ justifyContent: "center" }}>
            <Grid container item>
              <Typography variant="body1">Supervisor: {agentProfile.agent.supervisor}</Typography>
            </Grid>
            <Grid container item>
              <Typography variant="body1">
                Projects: {agentProfile.agent.projects.join(", ")}
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid container component={Paper} sx={classes.PaperSection}>
          <Grid container item sx={{ justifyContent: "center" }}>
            <Typography variant="h5">Schedule</Typography>
          </Grid>
          <Grid container item xs={12} spacing={1} sx={{ justifyContent: "center", alignItems: "center" }}>
            {schedule && schedule.week.map(day => <Schedule key={day.day} breakdown={day.breakdown} projects={day.projects} day={day.day} />)}
          </Grid>
        </Grid>

        <Grid container component={Paper} sx={classes.PaperSection}>
          <Grid container item sx={{ justifyContent: "center" }}>
            <Typography variant="h5">Services</Typography>
          </Grid>
          <TableContainer component={Paper}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Account</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Summary</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {agentProfile.services.length > 0 ? (
                  agentProfile.services.map((service) => (
                    <TableRow key={service._id}>
                      <TableCell>{service.timestamp}</TableCell>
                      <TableCell>
                        <Typography component={Link} to={`/${service.account.type}Profile/${service.account.id}`}>
                          {service.account.id}
                        </Typography>
                      </TableCell>
                      <TableCell>{service.type}</TableCell>
                      <TableCell>{service.summary}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell>No services </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>

        <Grid container component={Paper} sx={classes.PaperSection}>
          <Grid container item sx={{ justifyContent: "center" }}>
            <Typography variant="h5">Notes</Typography>
          </Grid>
          <TableContainer component={Paper}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Account</TableCell>
                  <TableCell>Note Summary</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {agentProfile.notes.length > 0 ? (
                  agentProfile.notes.map((n) => (
                    <TableRow key={n._id}>
                      <TableCell>{n.date}</TableCell>
                      <TableCell>
                        <Typography component={Link} to={`/patientProfile/${n.accountId}`}>
                          {n.accountId}
                        </Typography>
                      </TableCell>
                      <TableCell>{n.note}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell>No notes </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Container>
  );
}
