import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { Avatar, Container, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { getAgentInfo, getAgentServices, getAgentNotes } from "../../Redux/actions";
import Loading from "../../Components/Loading";
import Schedule from '../../Components/Schedule';

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
    if (params.agentId !== 'undefined') {
      dispatch(getAgentInfo(params.agentId));
      dispatch(getAgentNotes(params.agentId));
      dispatch(getAgentServices(params.agentId));
    }
  }, [dispatch, params.agentId]);

  useEffect(() => {
    if (agentProfile.agent && agentProfile.notes) {
      setLoading(false);
    }
  }, [agentProfile]);

  const dataGridRows = {
    notes: agentProfile.notes.sort((a, b) => a.timestamp < b.timestamp).map((note) => {
      const capitalizeFirstLetter = (word) => word.charAt(0).toUpperCase() + word.slice(1);
      note.linkToAccount = `/${capitalizeFirstLetter(note.account.type)}Profile/${note.account.account._id}`;
      return note;
    }),
  }
  const dataGridColumns = {
    notes: [
      {
        field: "_id",
        headerName: "ID",
        flex: 1,
      },
      {
        field: "timestamp",
        headerName: "Date",
        flex: 1,
      },
      {
        field: "accountType",
        headerName: "Account Type",
        flex: 1,
        renderCell: (params) => (<Typography component={Link} to={params.row.linkToAccount}>{params.row.account.account.firstName}</Typography>)
      },
      {
        field: "summary",
        headerName: "Note Summary",
        flex: 1,
      },
    ]
  }

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
            <Typography variant="caption">{agentProfile.agent._id}</Typography>
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
            {schedule?.week?.map(day => <Schedule key={day.day} breakdown={day.breakdown} projects={day.projects} day={day.day} />)}
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
                        <Typography component={Link} to={`/${service.account.type.toLowerCase()}Profile/${service.account.account._id}`}>
                        {service.account.type}<br />{service.account.account.firstName} {service.account.account.lastName}
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

          <Grid container item xs={12} sx={{ height: "375px" }}>
            <DataGrid
              getRowId={(row) => row._id}
              rows={dataGridRows.notes}
              columns={dataGridColumns.notes}
              pageSize={5}
              rowsPerPageOptions={[5]}
            />
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
