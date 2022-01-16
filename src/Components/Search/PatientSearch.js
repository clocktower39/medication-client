import React, { useState } from "react";
import {
  Button,
  CircularProgress,
  Grid,
  TextField,
} from "@mui/material";
import PatientTableResults from './PatientTableResults';

export default function PatientSearch(props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [zip, setZip] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e, setter) => {
    setter(e.target.value);
  };

  const handleSearch = () => {
    setLoading(true);
    const params = {
      firstName,
      lastName,
      phoneNumber,
      dob,
      email,
      zip,
    };
    // convert params into an array so we can filter
    const asArray = Object.entries(params);

    //filter the converted params array to remove unnecessary fields
    const notEmpty = asArray.filter(([key, value]) => value !== "");

    // convert back into an object
    const filteredParams = Object.fromEntries(notEmpty);

    fetch("https://stark-garden-91538.herokuapp.com/searchPatients", {
      method: "post",
      dataType: "json",
      body: JSON.stringify(filteredParams),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((data) => setSearchResults(data))
      .then(() => setLoading(false));
  };

  return (
    <>
      <Grid item xs={12} sm={4}>
        <TextField
          label="First Name"
          fullWidth
          value={firstName}
          onChange={(e) => handleChange(e, setFirstName)}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          label="Last Name"
          fullWidth
          value={lastName}
          onChange={(e) => handleChange(e, setLastName)}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          label="Phone Number"
          fullWidth
          value={phoneNumber}
          onChange={(e) => handleChange(e, setPhoneNumber)}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          label="Date of Birth"
          fullWidth
          value={dob}
          onChange={(e) => handleChange(e, setDob)}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          label="Email"
          fullWidth
          value={email}
          onChange={(e) => handleChange(e, setEmail)}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          label="Zip Code"
          fullWidth
          value={zip}
          onChange={(e) => handleChange(e, setZip)}
        />
      </Grid>
      <Grid container justifyContent="center" item xs={12}>
        <Button variant="contained" onClick={handleSearch} disabled={loading}>
          {loading ? <CircularProgress /> : "Search"}
        </Button>
      </Grid>

      <PatientTableResults searchResults={searchResults} />
    </>
  );
}
