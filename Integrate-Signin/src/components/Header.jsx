import React, { Component } from 'react';
import { Link } from 'react-router-dom'; 
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

export default class Header extends Component {
  render() {
    return (
      <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        <Button color="inherit" component={Link} to="/">
          Logo
          </Button>
        </Typography>
        <Button color="inherit" component={Link} to="/registerPage">
          Sign Up
        </Button>
      </Toolbar>
    </AppBar>
    );
  }
}
