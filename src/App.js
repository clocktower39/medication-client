import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';import { Container, ThemeProvider } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import MainSearch from "./Components/MainSearch";
import EnrollContainer from "./Components/Enroll/EnrollContainer";
import PatientProfile from "./Components/Profile/PatientProfile";
import PrescriberProfile from "./Components/Profile/PrescriberProfile";
import AgentProfile from "./Components/Profile/AgentProfile";
import Footer from "./Components/Footer";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import NotFoundPage from "./Components/NotFoundPage";
import AuthRoute from "./Components/AuthRoute";
import { theme } from "./theme";
import "./App.css";

const classes = {
  root: {
    minHeight: "100%",
    backgroundColor: 'background.ATCPaperBackground',
  },
};

function App() {
  const themeMode = useSelector(state => state.agent.themeMode);
  const [themeSelection, setThemeSelection] = useState(theme());
  
  useEffect(()=>{
    setThemeSelection(theme());
  },[themeMode])

  return (
    <ThemeProvider theme={themeSelection}>
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
              <Route exact path="/patientProfile/*" element={<PatientProfile />} />
            </Route>

            <Route exact path="/prescriberProfile/" element={<AuthRoute />}>
              <Route exact path="/prescriberProfile/*" element={<PrescriberProfile />} />
            </Route>

            <Route exact path="/agentProfile/" element={<AuthRoute />}>
              <Route exact path="/agentProfile/:agentId" element={<AgentProfile />} />
            </Route>

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          <Footer />
        </Router>
      </Container>
    </ThemeProvider>
  );
}

export default App;
