import { Container, ThemeProvider } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import MainSearch from "./Components/MainSearch";
import EnrollContainer from "./Components/Enroll/EnrollContainer";
import PatientProfile from "./Components/Profile/PatientProfile";
import PrescriberProfile from "./Components/Profile/PrescriberProfile";
import theme from "./theme";
import "./App.css";

const useStyles = makeStyles({
  root: {
    height: "100%",
    backgroundColor: "#2C2F33",
  },
});

function App() {
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <Container className={classes.root} maxWidth="lg">
        <Router basename="/medication-tracking-system/">
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/search" element={<MainSearch />} />
            <Route exact path="/enroll" element={<EnrollContainer />} />
            <Route path="/patientProfile/*" element={<PatientProfile />} />
            <Route path="/prescriberProfile/*" element={<PrescriberProfile />} />
          </Routes>
        </Router>
      </Container>
    </ThemeProvider>
  );
}

export default App;
