import { Container, makeStyles } from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './Components/Home';
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
      <Router basename="/Medication-Tracking-System/">
        <Switch>
          <Route exact path="/"><Home /></Route>
          <Route exact path="/enroll"><>Enroll</></Route>
          <Route exact path="/profile"><>Profile</></Route>
        </Switch>
      </Router>
    </Container>
  );
}

export default App;
