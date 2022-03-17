import React from 'react'
import { Link, Typography } from '@mui/material'

function Copyright() {
  return (
    <Typography variant="body2" color="#fff" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://mattkearns.dev/">
        MattKearns.dev
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function Footer() {
  return (
    <>
    <div style={{ height: "20px", }}></div>
    <footer style={{
      marginTop: "1rem",
      backgroundColor: "#000",
      position: "fixed",
      bottom: 0,
      left: 0,
      width: "100%",
    }}><Copyright /></footer>
    </>
  )
}