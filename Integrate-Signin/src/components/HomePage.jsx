import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import image from '../assets/welcome.avif';
import '../App.css';

const HomePage = () => {
  return (
    <Box sx={{ textAlign: 'center', marginTop: 4 }}>
      <Typography variant="h4" gutterBottom>
        Welcome to our Application!
      </Typography>
      <Typography variant="body1">
        Thank you for signing up. You are now logged in to our platform.
      </Typography>
      <Box component="img" 
           src={image} 
           alt="Welcome Image" 
           sx={{ 
             width: '100%', 
             maxWidth: '1000px', 
             height: '500px', 
             marginTop: 2, 
             overflow: 'hidden',marginBottom: 10
           }} 
      />
    </Box>
  );
}

export default HomePage;
