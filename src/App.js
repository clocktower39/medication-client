import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Box, Container, ThemeProvider } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Navbar from "./Components/Navbar";
import MainSearch from "./Pages/MainSearch";
import EnrollContainer from "./Pages/EnrollContainer";
import PatientProfile from "./Pages/Profile/PatientProfile";
import PrescriberProfile from "./Pages/Profile/PrescriberProfile";
import AgentProfile from "./Pages/Profile/AgentProfile";
import Footer from "./Components/Footer";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import NotFoundPage from "./Pages/NotFoundPage";
import AuthRoute from "./Components/AuthRoute";
import { theme } from "./theme";
import "./App.css";

const classes = {
  root: {
    minHeight: "100%",
    backgroundColor: "background.ATCPaperBackground",
  },
};

function App() {
  const themeMode = useSelector((state) => state.agent.themeMode);
  const [themeSelection, setThemeSelection] = useState(theme());

  useEffect(() => {
    setThemeSelection(theme());
  }, [themeMode]);

  return (
    <ThemeProvider theme={themeSelection}>
      <Box sx={classes.root}>
        <Container sx={classes.root} maxWidth="lg">
          <Router basename="/medication-tracking-system/">
            <Navbar />
            <Routes>
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/signup" element={<Signup />} />

              {/* Must be logged in and have JWT token to authenticate */}
              <Route exact path="/" element={<AuthRoute />}>
                <Route exact path="/" element={<Home />} />
              </Route>

              <Route exact path="/search" element={<AuthRoute />}>
                <Route exact path="/search" element={<MainSearch />} />
              </Route>

              <Route exact path="/enroll" element={<AuthRoute />}>
                <Route exact path="/enroll" element={<EnrollContainer />} />
              </Route>

              <Route exact path="/patientProfile/" element={<AuthRoute />}>
                <Route
                  exact
                  path="/patientProfile/*"
                  element={<PatientProfile />}
                />
              </Route>

              <Route exact path="/prescriberProfile/" element={<AuthRoute />}>
                <Route
                  exact
                  path="/prescriberProfile/*"
                  element={<PrescriberProfile />}
                />
              </Route>

              <Route exact path="/agentProfile/" element={<AuthRoute />}>
                <Route
                  exact
                  path="/agentProfile/:agentId"
                  element={<AgentProfile />}
                />
              </Route>

              <Route path="*" element={<NotFoundPage />} />
            </Routes>
            <Footer />
          </Router>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
