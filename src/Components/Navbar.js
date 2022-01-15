import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Button, Toolbar } from '@mui/material';
import { Home, Search, Create } from '@mui/icons-material';

export default function Navbar() {
    return (
        <div style={{ flexGrow: 1, paddingBottom: 64 }}>
            <AppBar position='fixed' >
                <Toolbar className="nav-container">
                    <Button color="inherit" component={Link} to="/"><Home /></Button>
                    <Button color="inherit" component={Link} to="/search"><Search /></Button>
                    <Button color="inherit" component={Link} to="/enroll"><Create /></Button>
                </Toolbar>
            </AppBar>
        </div>
    )
}
