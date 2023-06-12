import React from "react";
import { useSelector } from "react-redux";
import { Grid, Paper, Typography } from "@mui/material/";
import Schedule from "../Components/Schedule";

export default function Home() {
  const agent = useSelector((state) => state.agent);
  const schedule = useSelector((state) => state.schedule);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <Paper
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          minHeight: "calc(100% - 84px)",
        }}
      >
        <Typography
          variant="h4"
          align="center"
          sx={{
            padding: "25px",
          }}
        >
          Welcome {agent.username}!
        </Typography>
        <Grid
          container
          spacing={1}
          sx={{ justifyContent: "center", alignItems: "center" }}
        >
          <Grid
            container
            item
            xs={12}
            spacing={1}
            sx={{ justifyContent: "center" }}
          >
            {schedule?.week?.map((day) => (
              <Schedule
                key={day.day}
                breakdown={day.breakdown}
                projects={day.projects}
                day={day.day}
              />
            ))}
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
