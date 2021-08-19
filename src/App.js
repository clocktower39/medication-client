import { Container, makeStyles } from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './Components/Home';
import Navbar from './Components/Navbar';
import Search from './Components/Search';
import EnrollContainer from './Components/Enroll/EnrollContainer';
import PatientProfile from './Components/Profile/PatientProfile';
import PrescriberProfile from './Components/Profile/PrescriberProfile';
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
    <Container className={classes.root} maxWidth="lg">
      <Router basename="/medication-tracking-system/">
        <Navbar />
        <Switch>
          <Route exact path="/"><Home /></Route>
          <Route exact path="/search"><Search/></Route>
          <Route exact path="/enroll"><EnrollContainer/></Route>
          <Route path="/patientProfile"><PatientProfile/></Route>
          <Route path="/prescriberProfile"><PrescriberProfile/></Route>
        </Switch>
      </Router>
    </Container>
  );
}

export default App;
