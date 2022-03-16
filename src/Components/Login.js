import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { Button, Container, Grid, Paper, TextField, Typography } from "@mui/material";
import { loginUser } from "../Redux/actions";

const classes = {
  root: {
    padding: "25px 0",
    textAlign: "center",
    marginTop: '25px',
  },
  textField: {
    margin: "5px",
  },
  button: {},
};

export const Login = (props) => {
  const dispatch = useDispatch();
  const [error, setError] = useState(false);
  const [username, setUsername] = useState(
    localStorage.getItem("username") ? localStorage.getItem("username") : ""
  );
  const [password, setPassword] = useState("");
  const [disableButtonDuringLogin, setDisableButtonDuringLogin] = useState(false);
  const agent = useSelector((state) => state.agent);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleLoginAttempt(e);
    }
  };
  const handleLoginAttempt = (e) => {
    if (username && password) {
      setDisableButtonDuringLogin(true);
      dispatch(loginUser(JSON.stringify({ username, password }))).then((res) => {
        if (res.error) {
          setError(true);
        }
        setDisableButtonDuringLogin(false);
      });
      localStorage.setItem("username", username);
    } else {
      setDisableButtonDuringLogin(false);
      setError(true);
    }
  };
  const handleGuestLogin = (e) => {
      setDisableButtonDuringLogin(true);
      dispatch(loginUser(JSON.stringify({ username: 'GUEST', password: 'GUEST' }))).then((res) => {
        if (res.error) {
          setError(true);
        }
        setDisableButtonDuringLogin(false);
      });
      localStorage.setItem("username", 'GUEST');
  };

  if (agent.username) {
    return <Navigate to={{ pathname: "/" }} />;
  }
  return (
    <Container maxWidth="sm">
      <Grid container sx={classes.root} component={Paper} spacing={2} >
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom>
            Log in
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            color="secondary"
            error={error === true ? true : false}
            helperText={error === true ? "Please enter your username" : false}
            sx={classes.textField}
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
            sx={classes.textField}
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
          <Button
            variant="contained"
            color="primary"
            sx={classes.button}
            onClick={(e) => handleLoginAttempt(e)}
            disabled={disableButtonDuringLogin}
          >
            Login
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            sx={classes.button}
            onClick={handleGuestLogin}
            disabled={disableButtonDuringLogin}
          >
            GUEST MODE
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Login;
