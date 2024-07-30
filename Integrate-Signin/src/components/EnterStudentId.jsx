import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { StudentIdContext } from './StudentIdContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  TextField,
  Typography,
  createTheme,
  ThemeProvider,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

//Declear the variable using const
const defaultTheme = createTheme();

function EnterStudentId() {
  const navigate = useNavigate();
  const { setStudentIdExists } = useContext(StudentIdContext);
  const [error, setError] = useState(null);

  //handle the after clicking on the submit button 
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const studentID = formData.get('id');

    try {
      const response = await axios.get(`http://localhost:5000/students/${studentID}`);
      const studentData = response.data;
      setStudentIdExists(true); 
      navigate('/studentDetailsPage', { state: { studentId: studentID, studentData } });
      toast.success('User exists!');
    } catch (error) {
     
      // Handle error (e.g., display error message)
      navigate('/registerPage');
      setError('User does not exist');
      toast.error('User does not exist');
      
      setTimeout(() => {
        setError(null);
      }, 3000);
    }
  };

  //Html code
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Student ID
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              required
              fullWidth
              id="id"
              label="Student ID"
              name="id"
              autoComplete="id"
              error={!!error}
              helperText={error && error}
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Submit
            </Button>
          </form>
        </Box>
      </Container>
      <ToastContainer />
    </ThemeProvider>
  );
}

export default EnterStudentId;
