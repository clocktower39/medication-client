import { Container, ThemeProvider } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import MainSearch from "./Components/MainSearch";
import EnrollContainer from "./Components/Enroll/EnrollContainer";
import PatientProfile from "./Components/Profile/PatientProfile";
import PrescriberProfile from "./Components/Profile/PrescriberProfile";
import Login from './Components/Login';
import AuthRoute from './Components/AuthRoute';
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
            <Route exact path="/login" element={<Login />} />

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
          
          <Route exact path="/patientProfile/*" element={<AuthRoute />}>
            <Route exact path="/patientProfile/*" element={<PatientProfile/>} />
          </Route>

          <Route exact path="/prescriberProfile/*" element={<AuthRoute />}>
            <Route exact path="/prescriberProfile/*" element={<PrescriberProfile />} />
          </Route>

          </Routes>
        </Router>
      </Container>
    </ThemeProvider>
  );
}

export default App;
