import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Box,
  Button,
  Menu,
  MenuItem,
  Toolbar,
} from "@mui/material";
import { Home, Search, Create, Person, Settings } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../Redux/actions";
import EditAccount from './EditAccount';
import ChangePassword from './ChangePassword';

export default function Navbar() {
  const dispatch = useDispatch();
  const agent = useSelector((state) => state.agent);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const [passwordModal, setPasswordModal] = useState(false);
  const handlePasswordOpen = () => setPasswordModal(true);
  const handlePasswordClose = () => setPasswordModal(false);
  
  const [accountModal, setAccountModal] = useState(false);
  const handleAccountOpen = () => setAccountModal(true);
  const handleAccountClose = () => setAccountModal(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => dispatch(logoutUser());

  return (
    <div style={{ flexGrow: 1, paddingBottom: 64 }}>
      <AppBar position="fixed">
        <Toolbar className="nav-container">
          {agent._id ? (
            <>
              <Box sx={{ flexGrow: 1 }}>
                <Button color="inherit" component={Link} to="/">
                  <Home />
                </Button>
                <Button color="inherit" component={Link} to="/search">
                  <Search />
                </Button>
                <Button color="inherit" component={Link} to="/enroll">
                  <Create />
                </Button>
                <Button color="inherit" component={Link} to={`/agentProfile/${agent._id}`}>
                  <Person />
                </Button>
              </Box>
              <Box>
                <Button color="inherit" onClick={handleClick}>
                  <Settings />
                </Button>
              </Box>
              <Menu open={open} onClose={handleClose} anchorEl={anchorEl}>
                <MenuItem onClick={handleAccountOpen}>Edit account</MenuItem>
                <MenuItem onClick={handlePasswordOpen}>Change password</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
              {passwordModal && open && (
                <ChangePassword open={open} handlePasswordClose={handlePasswordClose} />
              )}
              {accountModal && open && (
                <EditAccount open={open} handleAccountClose={handleAccountClose} />
              )}
            </>
          ) : (
            <Box sx={{ display: "flex", flexGrow: 1, justifyContent: "center" }}>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
              <Button color="inherit" component={Link} to="/signup">
                Sign up
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
