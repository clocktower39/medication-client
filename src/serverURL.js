// dev server
const currentIP = window.location.href.split(":")[1];
const serverURL = `http:${currentIP}:5518`;

// live server
// const serverURL = "https://mockmedicationtracker.herokuapp.com";

export default serverURL;