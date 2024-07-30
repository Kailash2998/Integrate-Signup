import React, { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { StudentIdContext } from './StudentIdContext';
import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography,
  createTheme,
  ThemeProvider,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const defaultTheme = createTheme();
//Apply the Validations
function RegisterPage() {
  const navigate = useNavigate();
  const { setStudentIdExists } = useContext(StudentIdContext);

  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .trim()
      .required('First Name is required')
      .matches(/^[a-zA-Z\s]*$/, 'Only alphabets, and space are allowed')
      .min(2, 'First Name must be at least 2 characters')
      .max(50, 'First Name must not exceed 50 characters'),
    lastName: Yup.string()
      .trim()
      .required('Last Name is required')
      .matches(/^[a-zA-Z\s]*$/, 'Only alphabets, and space are allowed')
      .min(2, 'Last Name must be at least 2 characters')
      .max(50, 'Last Name must not exceed 50 characters'),
    email: Yup.string()
      .trim()
      .email('Invalid email format')
      .required('Email is required')
      .matches(/^[a-z][a-z0-9]*@gmail\.com$/, 'Email must start with a letter and be @gmail.com'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
      .max(20, 'Password must not exceed 20 characters')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/,
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
      ),
  });

  // define the fields for the student
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
    // onSubmit methods register the data on database
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        // Make a POST request to store user registration data
        await axios.post('http://localhost:5000/students', values);
        console.log('User registered successfully:', values);
        setStudentIdExists(true);
        toast.success('Registration successful!');
        navigate('/reenterStudentDetails', { state: { studentData: values } });
        // Pass student data to reenterStudentDetails page
      } catch (error) {
        console.error('Error registering user:', error);
        toast.error('Error: ' + error.message);
      }
    },
  });

  //html code
  return (
    <ThemeProvider theme={defaultTheme}>
      <ToastContainer
        position="top-right"
        autoClose={5000} 
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
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
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                  helperText={formik.touched.firstName && formik.errors.firstName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                  helperText={formik.touched.lastName && formik.errors.lastName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={formik.touched.password && Boolean(formik.errors.password)}
                  helperText={formik.touched.password && formik.errors.password}
                />
              </Grid>
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Register
            </Button>
            <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 2 }}>
              Already have an account? <Link to="/reenterStudentDetails">Login</Link>
            </Typography>

          </form>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default RegisterPage;
