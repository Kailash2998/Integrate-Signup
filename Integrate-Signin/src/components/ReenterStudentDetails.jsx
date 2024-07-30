import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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

const defaultTheme = createTheme();

//Declear the var using const
function ReenterStudentDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [studentData, setStudentData] = useState(null);

  //Hooks 
  useEffect(() => {
    if (location.state && location.state.studentData) {
      setStudentData(location.state.studentData);
      console.log('Student data received:', location.state.studentData);
    } else {
      // Handle the case where studentData is null or undefined
      console.error('Error: studentData is null or undefined');
    }
    setLoading(false);
  }, [location.state]);

  //Validations for the fields
  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .trim()
      .required('First Name is required')
      .matches(/^[a-zA-Z\s']*$/, 'Only alphabets, space, and single quote are allowed')
      .min(2, 'First Name must be at least 2 characters')
      .max(50, 'First Name must not exceed 50 characters'),
    lastName: Yup.string()
      .trim()
      .required('Last Name is required')
      .matches(/^[a-zA-Z\s']*$/, 'Only alphabets, space, and single quote are allowed')
      .min(2, 'Last Name must be at least 2 characters')
      .max(50, 'Last Name must not exceed 50 characters'),
    email: Yup.string()
      .trim()
      .email('Invalid email format')
      .required('Email is required')
      .max(100, 'Email must not exceed 100 characters')
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

  //To check  the validations
  const formik = useFormik({
    initialValues: {
      firstName: studentData?.firstName || '',
      lastName: studentData?.lastName || '',
      email: studentData?.email || '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setFieldError }) => {
      try {
        // Simulate checking if the entered details match the existing user data
        if (
          values.firstName !== studentData.firstName ||
          values.lastName !== studentData.lastName ||
          values.email !== studentData.email
        ) {
          setFieldError('general', 'User details do not match the existing one');
          toast.error('User details do not match the existing one');
          return;
        }

        // Handle form submission if user details match
        console.log('Form values:', values);
        toast.success('User details verified successfully');
        navigate('/homePage');
      } catch (error) {
        console.error('Error:', error);
        setError('Error: ' + error.message);
        toast.error('Error: ' + error.message);
      }
    },
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  //Html code
  return (
    <ThemeProvider theme={defaultTheme}>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
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
            Re-Enter Details
          </Typography>
          <form onSubmit={formik.handleSubmit} noValidate>
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
            {formik.errors.general && (
              <Typography color="error" variant="body2" gutterBottom>
                {formik.errors.general}
              </Typography>
            )}
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Sign Up
            </Button>
          </form>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default ReenterStudentDetails;
