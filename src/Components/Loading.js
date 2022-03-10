import React from "react";
import { CircularProgress, Typography } from "@mui/material";

const classes = {
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
  },
};

export default function CircularIndeterminate() {
  return (
    <div className={classes.root}>
      <Typography variant="h4">Loading</Typography>
      <CircularProgress />
    </div>
  );
}
