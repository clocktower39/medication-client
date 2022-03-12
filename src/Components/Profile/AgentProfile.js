import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Avatar, Container, Grid, Paper, Typography } from "@mui/material";
import { getAgent } from '../../Redux/actions';
import Loading from '../Loading';

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
  const agentProfile = useSelector(state => state.agentProfile);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    dispatch(getAgent(params.agentId));
  },[dispatch, params.agentId])

  useEffect(()=> {
    if(agentProfile.agent){
      setLoading(false);
    }
  }, [agentProfile])
  
  return loading ? <Loading /> : (
    <Container maxWidth="lg" sx={{ padding: "7.5px 0px" }}>
      <Grid container>
        <Grid container component={Paper} sx={classes.PaperSection}>
          <Grid container item xs={4} sx={{ justifyContent: "center" }}>
            <Avatar sx={classes.Avatar} />
          </Grid>
          <Grid container item xs={8} sx={{ flexDirection: 'column', justifyContent: "center", alignItems: "center" }}>
            <Typography variant="h6">{agentProfile.agent.username}</Typography>
            <Typography variant="h6">{agentProfile.agent.role}</Typography>
            <Typography variant="h5">{agentProfile.agent.firstName} {agentProfile.agent.lastName}</Typography>
          </Grid>
          <Grid container item xs={10} sx={{ justifyContent: 'center',}}>
            <Grid container item><Typography variant="body1">Supervisor: {agentProfile.agent.supervisor}</Typography></Grid>
            <Grid container item><Typography variant="body1">Projects: {agentProfile.agent.projects.join(', ')}</Typography></Grid>
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
