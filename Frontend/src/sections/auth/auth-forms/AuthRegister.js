import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import 'react-phone-input-2/lib/style.css';
import { Box, Button, FormControl, FormHelperText, Grid, Link, InputAdornment, InputLabel, OutlinedInput, Stack, Typography, TextField } from '@mui/material';
import * as Yup from 'yup';
import { Formik } from 'formik';
import IconButton from 'components/@extended/IconButton';
import AnimateButton from 'components/@extended/AnimateButton';
import { strengthColor, strengthIndicator } from 'utils/password-strength';
import { Eye, EyeSlash } from 'iconsax-react';
import { useNavigate } from 'react-router-dom';

const AuthRegister = () => {
  const [level, setLevel] = useState();

  // const [companyEmail, setCompanyEmail] = useState(""),
  // const [companyName, setCompanyName] = useState(""),
  // const [companyLink, setCompanyLink] = useState("")
  // const [password, setpassword] = useState("")
  const [company, setCompany] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const apiUrl = 'http://localhost:8082/api/companies';


  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleDomain = (event) => {
    setCompany(event.target.value);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmission = (values) => {
    console.log(values)
    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    })
    .then(response => response.json())
    .then(data =>
      {
        // console.log(data._id)
        navigate('/getting-started', { state: { companyId:data._id } })
      }
    )
    .catch(error => console.error(error));
    // try {
    //   // setStatus({ success: true });
    //   // setSubmitting(false);
      
    // } catch (err) {
    //   console.error(err);
    //   // setStatus({ success: false });
    //   // setErrors({ submit: err.message });
    //   // setSubmitting(false);
    // }
  };

  const changePassword = (value) => {
    const temp = strengthIndicator(value);
    setLevel(strengthColor(temp));
  };

  useEffect(() => {
    changePassword('');
  }, []);

  return (
    <>
      <Formik
        initialValues={{
          companyEmail: '',
          companyName: '',
          companyLink: '',
          password: ''
        }}

        validationSchema={Yup.object().shape({
          companyLink: Yup.string().max(255).required('Company Link is required'),
          companyName: Yup.string().max(255).required('Company Name is required'),
          companyEmail: Yup.string().email('Must be a valid email').max(255).required('Company Email is required'),
          password: Yup.string().max(255).required('Password is required'),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          console.log(values)
          try {
            setStatus({ success: true });
            setSubmitting(false);
            navigate('/getting-started');
          } catch (err) {
            console.error(err);
            setStatus({ success: false });
            setErrors({ submit: err.message });
            setSubmitting(false);
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="email-signup">Email Address*</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.email && errors.email)}
                    id="email-signup"
                    type="email"
                    value={values.companyEmail}
                    name="companyEmail"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="demo@company.com"
                    inputProps={{}}
                  />
                  {touched.email && errors.email && (
                    <FormHelperText error id="helper-text-email-signup">
                      {errors.email}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="company-signup">Company</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.company && errors.company)}
                    id="company-signup"
                    value={values.companyName}
                    name="companyName"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Company name"
                    inputProps={{}}
                  />
                  {touched.company && errors.company && (
                    <FormHelperText error id="helper-text-company-signup">
                      {errors.company}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <TextField
                    id="domain-signup"
                    name="company"
                    label="Your vanity URL"
                    value={values.companyName}
                    readOnly
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          https://connect.com/support/
                        </InputAdornment>
                      ),
                    }}
                    fullWidth
                    variant="outlined"
                    margin="normal"
                  />
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="password-signup">Password*</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.password && errors.password)}
                    id="password-signup"
                    type={showPassword ? 'text' : 'password'}
                    value={values.password}
                    name="password"
                    onBlur={handleBlur}
                    onChange={(e) => {
                      handleChange(e);
                      changePassword(e.target.value);
                    }}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                          color="secondary"
                        >
                          {showPassword ? <Eye /> : <EyeSlash />}
                        </IconButton>
                      </InputAdornment>
                    }
                    placeholder="******"
                    inputProps={{}}
                  />
                  {touched.password && errors.password && (
                    <FormHelperText error id="helper-text-password-signup">
                      {errors.password}
                    </FormHelperText>
                  )}
                </Stack>
                <FormControl fullWidth sx={{ mt: 2 }}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item>
                      <Box sx={{ bgcolor: level?.color, width: 85, height: 8, borderRadius: '7px' }} />
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle1" fontSize="0.75rem">
                        {level?.label}
                      </Typography>
                    </Grid>
                  </Grid>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2">
                  By Signing up, you agree to our &nbsp;
                  <Link variant="subtitle2" component={RouterLink} to="#">
                    Terms of Service
                  </Link>
                  &nbsp; and &nbsp;
                  <Link variant="subtitle2" component={RouterLink} to="#">
                    Privacy Policy
                  </Link>
                </Typography>
              </Grid>
              {errors.submit && (
                <Grid item xs={12}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Grid>
              )}
              <Grid item xs={12}>
                <AnimateButton>
                  <Button disableElevation onClick = {() => handleSubmission(values)} disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="primary">
                    Getting Started
                  </Button>
                </AnimateButton>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
};

export default AuthRegister;
