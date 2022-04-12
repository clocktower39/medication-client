import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Box,
  Button,
  Toolbar,
} from "@mui/material";
import { Home, Search, Create, Person, Settings } from "@mui/icons-material";
import { useSelector } from "react-redux";
import AccountSettings from './AccountSettings';

export default function Navbar() {
  const agent = useSelector((state) => state.agent);
  
  const [accountModal, setAccountModal] = useState(false);
  const handleAccountOpen = () => setAccountModal(true);
  const handleAccountClose = () => setAccountModal(false);

  return (
    <div style={{ flexGrow: 1, paddingBottom: 64 }}>
      <AppBar position="fixed">
        <Toolbar>
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
                <Button color="inherit" onClick={handleAccountOpen}>
                  <Settings />
                </Button>
              </Box>
              {accountModal && (
                <AccountSettings open={accountModal} handleAccountClose={handleAccountClose} />
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
