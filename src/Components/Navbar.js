import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Box, Button, Toolbar } from "@mui/material";
import { Home, Search, Create } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../Redux/actions";

export default function Navbar() {
  const dispatch = useDispatch();
  const agent = useSelector((state) => state.agent);
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
              </Box>
              <Box>
                <Button color="inherit" onClick={handleLogout}>
                  Logout
                </Button>
              </Box>
            </>
          ) : (
            <Box sx={{ display: 'flex', flexGrow: 1, justifyContent: 'center',}}>
                <Button color="inherit" >Login</Button>
                <Button color="inherit" >Sign up</Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
