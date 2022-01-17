import { Container, ThemeProvider } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './Components/Home';
import Navbar from './Components/Navbar';
import MainSearch from './Components/MainSearch';
import EnrollContainer from './Components/Enroll/EnrollContainer';
import PatientProfile from './Components/Profile/PatientProfile';
import PrescriberProfile from './Components/Profile/PrescriberProfile';
import theme from './theme';
import './App.css';

const useStyles = makeStyles({
  root: {
    height: '100%',
    backgroundColor: '#2C2F33',
  }
});

function App() {
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <Container className={classes.root} maxWidth="lg">
        <Router basename="/medication-tracking-system/">
          <Navbar />
          <Switch>
            <Route exact path="/"><Home /></Route>
            <Route exact path="/search"><MainSearch /></Route>
            <Route exact path="/enroll"><EnrollContainer /></Route>
            <Route path="/patientProfile"><PatientProfile /></Route>
            <Route path="/prescriberProfile"><PrescriberProfile /></Route>
          </Switch>
        </Router>
      </Container>
    </ThemeProvider>
  );
}

export default App;
