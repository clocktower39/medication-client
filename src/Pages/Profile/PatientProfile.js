import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, Link } from "react-router-dom";
import {
  Button,
  Container,
  Grid,
  IconButton,
  LinearProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { AddCircle } from "@mui/icons-material";
import Relationships from "../../Components/Profile/Relationships";
import Notes from "../../Components/Profile/Notes";
import serverURL from "../../serverURL";

const classes = {
  root: {},
  rootGrid: {
    marginTop: "12.5px",
  },
  Paper: {
    margin: "7.5px",
    padding: "7.5px",
    width: "100%",
    overflow: "hidden",
  },
  ModalPaper: {
    position: "absolute",
    padding: "7.5px",
    width: "65%",
    backgroundColor: "background.ATCPaperBackground",
    top: "5%",
    left: "17.5%",
    overflowY: "scroll",
    height: "90%",
  },
  TableHeader: {
    fontWeight: 600,
  },
};

export default function PatientProfile(props) {
  const location = useLocation();
  const [patient, setPatient] = useState(null);
  const [services, setServices] = useState([]);
  const agent = useSelector((state) => state.agent);
  const [editMode, setEditMode] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDOB] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [country, setCountry] = useState("");
  const [labs, setLabs] = useState([]);
  const [bloodDrawDate, setBloodDrawDate] = useState(new Date().toISOString().slice(0, 10));
  const [anc, setAnc] = useState("");

  const dataGridRows = labs.sort((a,b) => a.timestamp < b.timestamp).map((lab) => {
    lab.linkToCreatedByUser = `/agentProfile/${lab.createdBy.accountId}`;
    lab.createdByUsername = lab.createdBy.username;
    return lab;
  });

  const dataGridColumns = [
    {
      field: "_id",
      headerName: "id",
      flex: 1,
    },
    {
      field: "timestamp",
      headerName: "Timestamp",
      flex: 1,
    },
    {
      field: "bloodDrawDate",
      headerName: "BDD",
      flex: 1,
    },
    {
      field: "anc",
      headerName: "ANC",
      flex: 1,
    },
    {
      field: "createdByUsername",
      headerName: "Created By",
      flex: 1,
      renderCell: (params) => (<Typography component={Link} to={params.row.linkToCreatedByUser}>{params.row.createdByUsername}</Typography>)
    },
  ];

  const handleAccountChange = (e, setter) => {
    setter(e.target.value);
  };

  const resetEditData = (matchObject) => {
    setFirstName(matchObject.firstName);
    setLastName(matchObject.lastName);
    setDOB(matchObject.dateOfBirth.substr(0, 10));
    setPhoneNumber(matchObject.phoneNumber);
    setAddress1(matchObject.address1);
    setAddress2(matchObject.address2);
    setCity(matchObject.city);
    setState(matchObject.state);
    setZip(matchObject.zip);
    setCountry(matchObject.country);
  };

  const updatePatientEdit = () => {
    const bearer = `Bearer ${localStorage.getItem("JWT_AUTH_TOKEN")}`;

    fetch(`${serverURL}/updatePatient`, {
      method: "post",
      dataType: "json",
      body: JSON.stringify({
        filter: { _id: patient._id },
        update: {
          firstName,
          lastName,
          dateOfBirth,
          phoneNumber,
          address1,
          address2,
          city,
          state,
          zip,
          country,
        },
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: bearer,
      },
    }).then(() => {
      setPatient({
        firstName,
        lastName,
        dateOfBirth,
        phoneNumber,
        address1,
        address2,
        city,
        state,
        zip,
        country,
      });
    });
  };

  const handleLabChange = (e, setter) => {
    setter(e.target.value);
  };

  const addLab = () => {
    const bearer = `Bearer ${localStorage.getItem("JWT_AUTH_TOKEN")}`;

    fetch(`${serverURL}/submitLab`, {
      method: "post",
      dataType: "json",
      body: JSON.stringify({
        anc,
        bloodDrawDate,
        accountId: patient._id,
        createdBy: agent._id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: bearer,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setLabs((prevLabs) => [...prevLabs, { ...data.lab }]);
        setAnc("");
        setBloodDrawDate(new Date().toISOString().slice(0, 10));
      });
  };

  useEffect(() => {
    setServices([]);
    const getAccountInfo = async () => {
      const bearer = `Bearer ${localStorage.getItem("JWT_AUTH_TOKEN")}`;
      // fetch the patient object
      const patientObject = await fetch(`${serverURL}${location.pathname}`, {
        headers: { Authorization: bearer },
      })
        .then((res) => res.json())
        .then((data) => data[0]);

      // fetch the patient services
      const servicesArray = await fetch(`${serverURL}/services/${patientObject._id}`, {
        headers: { Authorization: bearer },
      }).then((res) => res.json());
      setServices(servicesArray);

      // fetch patients labs
      fetch(`${serverURL}/labs/${patientObject._id}`, { headers: { Authorization: bearer } })
        .then((res) => res.json())
        .then((data) => {
          setLabs(data);
        });
      resetEditData(patientObject);

      return patientObject;
    };
    getAccountInfo().then((res) => setPatient(res));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return patient === null ? (
    <LinearProgress variant="indeterminate" />
  ) : (
    <Container maxWidth="lg">
      <Grid container spacing={3} sx={classes.rootGrid}>
        <Grid container item lg={4} xs={12}>
          <Paper sx={classes.Paper}>
            <Typography variant="h5" align="center" gutterBottom>
              Patient Profile Summary
            </Typography>
            <Typography variant="body1" align="center" gutterBottom>
              ID: {patient._id}
            </Typography>
            <Grid container item xs={12} spacing={1}>
              {!editMode ? (
                <Grid container item xs={12} spacing={1} sx={{ justifyContent: "center" }}>
                  <Grid container item xs={12} md={6} lg={12} spacing={1}>
                    <Grid container item xs={6}>
                      <Typography variant="body1">First Name</Typography>
                    </Grid>
                    <Grid container item xs={6}>
                      <Typography variant="body2">{patient.firstName}</Typography>
                    </Grid>
                    <Grid container item xs={6}>
                      <Typography variant="body1">Last Name</Typography>
                    </Grid>
                    <Grid container item xs={6}>
                      <Typography variant="body2">{patient.lastName}</Typography>
                    </Grid>
                    <Grid container item xs={6}>
                      <Typography variant="body1">Date of Birth</Typography>
                    </Grid>
                    <Grid container item xs={6}>
                      <Typography variant="body2">{patient.dateOfBirth.substr(0, 10)}</Typography>
                    </Grid>
                    <Grid container item xs={6}>
                      <Typography variant="body1">Phone Number</Typography>
                    </Grid>
                    <Grid container item xs={6}>
                      <Typography variant="body2">{patient.phoneNumber}</Typography>
                    </Grid>
                    <Grid container item xs={6}>
                      <Typography variant="body1">Zip Code</Typography>
                    </Grid>
                    <Grid container item xs={6}>
                      <Typography variant="body2">{patient.zip}</Typography>
                    </Grid>
                  </Grid>
                  <Grid container item xs={12} md={6} lg={12} spacing={1}>
                    <Grid container item xs={6}>
                      <Typography variant="body1">Address 1</Typography>
                    </Grid>
                    <Grid container item xs={6}>
                      <Typography variant="body2">{patient.address1}</Typography>
                    </Grid>
                    <Grid container item xs={6}>
                      <Typography variant="body1">Address 2</Typography>
                    </Grid>
                    <Grid container item xs={6}>
                      <Typography variant="body2">{patient.address2}</Typography>
                    </Grid>
                    <Grid container item xs={6}>
                      <Typography variant="body1">City</Typography>
                    </Grid>
                    <Grid container item xs={6}>
                      <Typography variant="body2">{patient.city}</Typography>
                    </Grid>
                    <Grid container item xs={6}>
                      <Typography variant="body1">State</Typography>
                    </Grid>
                    <Grid container item xs={6}>
                      <Typography variant="body2">{patient.state}</Typography>
                    </Grid>
                    <Grid container item xs={6}>
                      <Typography variant="body1">Country</Typography>
                    </Grid>
                    <Grid container item xs={6}>
                      <Typography variant="body2">{patient.country}</Typography>
                    </Grid>
                  </Grid>
                  <Grid container item xs={12} justifyContent="center">
                    <Button variant="outlined" onClick={() => setEditMode(!editMode)}>
                      Edit
                    </Button>
                  </Grid>
                </Grid>
              ) : (
                <Grid container item xs={12} spacing={1}>
                  <Grid container item xs={12} md={6} lg={12} spacing={1}>
                    <Grid container item xs={4} sx={{ alignContent: "center" }}>
                      <Typography variant="body1">First Name</Typography>
                    </Grid>
                    <Grid container item xs={8} sx={{ alignContent: "center" }}>
                      <TextField
                        fullWidth
                        size="small"
                        value={firstName}
                        onChange={(e) => handleAccountChange(e, setFirstName)}
                      />
                    </Grid>
                    <Grid container item xs={4} sx={{ alignContent: "center" }}>
                      <Typography variant="body1">Last Name</Typography>
                    </Grid>
                    <Grid container item xs={8} sx={{ alignContent: "center" }}>
                      <TextField
                        fullWidth
                        size="small"
                        value={lastName}
                        onChange={(e) => handleAccountChange(e, setLastName)}
                      />
                    </Grid>
                    <Grid container item xs={4} sx={{ alignContent: "center" }}>
                      <Typography variant="body1">Date of Birth</Typography>
                    </Grid>
                    <Grid container item xs={8} sx={{ alignContent: "center" }}>
                      <TextField
                        fullWidth
                        size="small"
                        value={dateOfBirth}
                        onChange={(e) => handleAccountChange(e, setDOB)}
                      />
                    </Grid>
                    <Grid container item xs={4} sx={{ alignContent: "center" }}>
                      <Typography variant="body1">Phone Number</Typography>
                    </Grid>
                    <Grid container item xs={8} sx={{ alignContent: "center" }}>
                      <TextField
                        fullWidth
                        size="small"
                        value={phoneNumber}
                        onChange={(e) => handleAccountChange(e, setPhoneNumber)}
                      />
                    </Grid>
                    <Grid container item xs={4} sx={{ alignContent: "center" }}>
                      <Typography variant="body1">Zip Code</Typography>
                    </Grid>
                    <Grid container item xs={8} sx={{ alignContent: "center" }}>
                      <TextField
                        fullWidth
                        size="small"
                        value={zip}
                        onChange={(e) => handleAccountChange(e, setZip)}
                      />
                    </Grid>
                  </Grid>

                  <Grid container item xs={12} md={6} lg={12} spacing={1}>
                    <Grid container item xs={4} sx={{ alignContent: "center" }}>
                      <Typography variant="body1">Address 1</Typography>
                    </Grid>
                    <Grid container item xs={8} sx={{ alignContent: "center" }}>
                      <TextField
                        fullWidth
                        size="small"
                        value={address1}
                        onChange={(e) => handleAccountChange(e, setAddress1)}
                      />
                    </Grid>
                    <Grid container item xs={4} sx={{ alignContent: "center" }}>
                      <Typography variant="body1">Address 2</Typography>
                    </Grid>
                    <Grid container item xs={8} sx={{ alignContent: "center" }}>
                      <TextField
                        fullWidth
                        size="small"
                        value={address2}
                        onChange={(e) => handleAccountChange(e, setAddress2)}
                      />
                    </Grid>
                    <Grid container item xs={4} sx={{ alignContent: "center" }}>
                      <Typography variant="body1">City</Typography>
                    </Grid>
                    <Grid container item xs={8} sx={{ alignContent: "center" }}>
                      <TextField
                        fullWidth
                        size="small"
                        value={city}
                        onChange={(e) => handleAccountChange(e, setCity)}
                      />
                    </Grid>
                    <Grid container item xs={4} sx={{ alignContent: "center" }}>
                      <Typography variant="body1">State</Typography>
                    </Grid>
                    <Grid container item xs={8} sx={{ alignContent: "center" }}>
                      <TextField
                        fullWidth
                        size="small"
                        value={state}
                        onChange={(e) => handleAccountChange(e, setState)}
                      />
                    </Grid>
                    <Grid container item xs={4} sx={{ alignContent: "center" }}>
                      <Typography variant="body1">Country</Typography>
                    </Grid>
                    <Grid container item xs={8} sx={{ alignContent: "center" }}>
                      <TextField
                        fullWidth
                        size="small"
                        value={country}
                        onChange={(e) => handleAccountChange(e, setCountry)}
                      />
                    </Grid>
                  </Grid>
                  <Grid container item xs={12} justifyContent="center">
                    <Button
                      variant="outlined"
                      sx={{ margin: "5px" }}
                      onClick={() => {
                        resetEditData(patient);
                        setEditMode(!editMode);
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="outlined"
                      sx={{ margin: "5px" }}
                      onClick={() => {
                        updatePatientEdit();
                        setEditMode(!editMode);
                      }}
                    >
                      Save
                    </Button>
                  </Grid>
                </Grid>
              )}
            </Grid>
          </Paper>
        </Grid>
        <Grid container item lg={8} xs={12}>
          <Relationships account={patient} accountType="patient" searchType={"prescriber"} />

          <Notes account={patient} setAccount={setPatient} accountType="patient" />

          <Grid container item xs={12}>
            <Paper sx={classes.Paper}>
              <Grid container item sx={{ justifyContent: "center" }}>
                <Typography variant="h5">Services</Typography>
              </Grid>
              <TableContainer component={Paper}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Date</TableCell>
                      <TableCell>Created By</TableCell>
                      <TableCell>Type</TableCell>
                      <TableCell>Summary</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {services.length > 0 ? (
                      services.map((service) => (
                        <TableRow key={service._id}>
                          <TableCell>{service.timestamp}</TableCell>
                          <TableCell>
                            <Typography
                              component={Link}
                              to={`/agentProfile/${service.createdBy._id}`}
                            >
                              {service.createdBy.username}
                            </Typography>
                          </TableCell>
                          <TableCell>{service.type}</TableCell>
                          <TableCell>{service.summary}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell>No services </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
          <Grid container item xs={12}>
            <Paper sx={classes.Paper}>
              <Typography variant="h5" align="center" gutterBottom>
                Labs
              </Typography>
              <Grid container justifyContent="center" spacing={1} sx={{ marginBottom: "15px" }}>
                <Grid item xs={6} sm={5}>
                  <TextField
                    focused
                    fullWidth
                    id="bdd"
                    label="Blood Draw Date"
                    type="date"
                    color="primary"
                    value={bloodDrawDate}
                    sx={classes.TextField}
                    onChange={(e) => handleLabChange(e, setBloodDrawDate)}
                  />
                </Grid>
                <Grid item xs={6} sm={5}>
                  <TextField
                    fullWidth
                    label="ANC"
                    value={anc}
                    onChange={(e) => handleLabChange(e, setAnc)}
                  />
                </Grid>
                <Grid
                  container
                  item
                  xs={12}
                  sm={1}
                  sx={{ alignContent: "center", justifyContent: "center" }}
                >
                  <IconButton onClick={addLab}>
                    <AddCircle />
                  </IconButton>
                </Grid>
              </Grid>
              <div style={{ height: "375px" }}>
                <DataGrid
                  getRowId={(row) => row._id}
                  rows={dataGridRows}
                  columns={dataGridColumns}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                />
              </div>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
