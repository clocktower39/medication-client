import React, { useState } from "react";
import { useDispatch } from "react-redux";
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
import { Close } from "@mui/icons-material";
import { logoutUser } from "../Redux/actions";
import ChangePassword from './ChangePassword';
import ContactInfo from './ContactInfo';

export default function AccountSettings({ open, handleAccountClose }) {
  const dispatch = useDispatch();

  const [passwordModal, setPasswordModal] = useState(false);
  const handlePasswordOpen = () => setPasswordModal(true);
  const handlePasswordClose = () => setPasswordModal(false);

  const [contactInfoModal, setContactInfoModal] = useState(false);
  const handleContactInfoOpen = () => setContactInfoModal(true);
  const handleContactInfoClose = () => setContactInfoModal(false);

  const handleLogout = () => dispatch(logoutUser()).then(()=> handleAccountClose());

  return (
    <Dialog
      open={open}
      onClose={handleAccountClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Edit profile"}
        <IconButton onClick={handleAccountClose} sx={{ float: "right" }}>
          <Close />
        </IconButton>
      </DialogTitle>

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
              <Button onClick={handleContactInfoOpen} >Edit</Button>
              {contactInfoModal && open && (
                <ContactInfo open={open} handleContactInfoClose={handleContactInfoClose} />
              )}
            </Grid>
            <Grid item container xs={12}></Grid>
          </Grid>
          <Grid item container xs={12}>
            <Grid
              item
              container
              xs={12}
              sx={{ justifyContent: "space-between", alignItems: "center" }}
            >
              <Typography>Change Password</Typography>
              <Button onClick={handlePasswordOpen} >Update</Button>
              {passwordModal && open && (
                <ChangePassword open={open} handlePasswordClose={handlePasswordClose} />
              )}
            </Grid>
            <Grid item container xs={12}></Grid>
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
            <Grid item container xs={12}></Grid>
          </Grid>
          <Grid item container xs={12}>
            <Grid
              item
              container
              xs={12}
              sx={{ justifyContent: "space-between", alignItems: "center" }}
            >
              <Typography></Typography>
              <Button onClick={handleLogout} >Logout</Button>
            </Grid>
            <Grid item container xs={12}></Grid>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
