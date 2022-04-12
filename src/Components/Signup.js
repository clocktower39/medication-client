import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { Button, Container, Grid, Paper, TextField, Typography } from "@mui/material";

const classes = {
  root: {
    padding: "25px 0",
    textAlign: "center",
    marginTop: '25px',
  },
  textField: {
    margin: "12px",
  },
};

export const Login = (props) => {
  const [error, setError] = useState(false);
  const [username, setUsername] = useState(
    localStorage.getItem("username") ? localStorage.getItem("username") : ""
  );
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [accessCode, setAccessCode] = useState("");
  const agent = useSelector((state) => state.agent);

  const handleKeyDown = (e) => {};

  if (agent.username) {
    return <Navigate to={{ pathname: "/" }} />;
  }
  return (
    <Container maxWidth="sm">
      <Grid container sx={classes.root} component={Paper} spacing={3} >
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom>
            Sign up
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            color="secondary"
            error={error === true ? true : false}
            helperText={error === true ? "Please enter your username" : false}
            label="Username"
            value={username}
            onKeyDown={(e) => handleKeyDown(e)}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            color="secondary"
            error={error === true ? true : false}
            helperText={error === true ? "Please enter your password" : false}
            label="Password"
            value={password}
            type="password"
            onKeyDown={(e) => handleKeyDown(e)}
            onChange={(e) => {
              setPassword(e.target.value);
              e.target.value === "" ? setError(true) : setError(false);
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            color="secondary"
            error={error === true ? true : false}
            helperText={error === true ? "Confirm password" : false}
            sx={classes.textField}
            label="Confirm Password"
            value={confirmPassword}
            type="password"
            onKeyDown={(e) => handleKeyDown(e)}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              e.target.value === "" ? setError(true) : setError(false);
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            color="secondary"
            error={error === true ? true : false}
            helperText={error === true ? "Access code" : false}
            sx={classes.textField}
            label="Access code"
            value={accessCode}
            onKeyDown={(e) => handleKeyDown(e)}
            onChange={(e) => {
              setAccessCode(e.target.value);
              e.target.value === "" ? setError(true) : setError(false);
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            sx={classes.button}
          >
            Sign up
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Login;
