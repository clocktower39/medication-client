import React from "react";
import {
  Avatar,
  IconButton,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from "@mui/material";
import { Close } from '@mui/icons-material';
import { } from "../Redux/actions";

export default function EditAccount({ open, handleAccountClose }) {

  return (
    <Dialog
      open={open}
      onClose={handleAccountClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title" >{"Edit profile"}
      <IconButton onClick={handleAccountClose} sx={{ float: 'right', }}><Close /></IconButton></DialogTitle>
      
      <DialogContent>
        <Grid container spacing={1} sx={{ padding: "10px 0px" }}>
          <Grid item container xs={12}>
            <Grid
              item
              container
              xs={12}
              sx={{ justifyContent: "space-between", alignItems: "center" }}
            >
              <Typography>Profile Picture</Typography>
              <Button>Edit</Button>
            </Grid>
            <Grid item container xs={12} sx={{ justifyContent: "center" }}>
              <Avatar
                sx={{
                  height: "125px",
                  width: "125px",
                }}
              />
            </Grid>
          </Grid>
          <Grid item container xs={12}>
            <Grid
              item
              container
              xs={12}
              sx={{ justifyContent: "space-between", alignItems: "center" }}
            >
              <Typography>Contact Information</Typography>
              <Button>Edit</Button>
            </Grid>
            <Grid item container xs={12} >
              
            </Grid>
          </Grid>
          <Grid item container xs={12}>
            <Grid
              item
              container
              xs={12}
              sx={{ justifyContent: "space-between", alignItems: "center" }}
            >
              <Typography>Change Password</Typography>
              <Button>Update</Button>
            </Grid>
            <Grid item container xs={12} >
              
            </Grid>
          </Grid>
          <Grid item container xs={12}>
            <Grid
              item
              container
              xs={12}
              sx={{ justifyContent: "space-between", alignItems: "center" }}
            >
              <Typography>Projects</Typography>
              <Button>Request Update</Button>
            </Grid>
            <Grid item container xs={12} >
            </Grid>
          </Grid>

        </Grid>
      </DialogContent>
    </Dialog>
  );
}
