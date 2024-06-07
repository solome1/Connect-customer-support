import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import validator from 'validator';

import { KeyboardArrowLeft, KeyboardArrowRight, PhotoCamera } from '@mui/icons-material';
import Logo from 'components/logo';
import AuthWrapper from 'sections/auth/AuthWrapper';
import AuthDivider from 'sections/auth/AuthDivider';
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  IconButton,
  Grid,
  CardActions,
  Container,
  Box,
  MenuItem
} from '@mui/material';

function GettingStartedPage({ user }) {
  const [step, setStep] = useState(0); // 0 for account information, 1 for invite agent
  const [profileImage, setProfileImage] = useState();
  const [companyName, setCompanyName] = useState(user?.companyName || ''); // Pre-fill from user data
  const [companyPhoneNumber, setCompanyPhoneNumber] = useState(user?.companyPhoneNumber || '');
  const [description, setDescription] = useState(''); 
  const [employeeCount, setEmployeeCount] = useState('');
  const [companyWebsite, setCompanyWebsite] = useState('');
  const [primaryContact, setPrimaryContact] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [street, setStreet] = useState('');
  const [country, setCountry] = useState('');
  
  const navigate = useNavigate();

  const handleNext = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setProfileImage(URL.createObjectURL(file));
  };

  const handleBack = () => {
    if (step > 0) {
      setStep((prevStep) => prevStep - 1);
    }
  };

  const validateEmail = (email) => {
    return validator.isEmail(email);
  };

    const handleFinish = async () => {
      try {
        const formData = {
          companyName,
          description,
          employeeCount,
          companyWebsite,
          primaryContact,
          companyPhoneNumber,
          country,
          state,
          city,
          street,
        };
        const response = await fetch('/api/update-profile', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        const data = await response.json();
        if (data.message === 'Profile updated successfully') {
          navigate('/'); // Navigate to the dashboard
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error(error);
      }
  };

  return (
    <AuthWrapper>
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(10, 50, 0, 0.5)', // Semi-transparent black color
          zIndex: 1,
        }}
      />
      <Container sx={{ position: 'relative', zIndex: 2 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sx={{ textAlign: 'center' }}>
            <Logo />
          </Grid>
          <Grid item xs={12}>
            <AuthDivider />
          </Grid>
          {user && (
            <Typography variant="h4" gutterBottom>
              Welcome, {user.name}!
            </Typography>
          )}
          {step === 0 && (
            <Card sx={{ position: 'relative', zIndex: 2, backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Company Information
                </Typography>
                <label htmlFor="upload-photo">
                  <IconButton component="span">
                    {profileImage ? (
                      <img src={profileImage} alt="Company Logo" style={{ width: 90, height: 60 }} />
                    ) : (
                      <PhotoCamera />
                    )}
                  </IconButton>
                </label>
                <input
                  style={{ display: 'none' }}
                  id="upload-photo"
                  name="upload-photo"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
                <TextField
                  label="Company Name"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  fullWidth
                  multiline={false}
                  margin="normal"
                />     
                <TextField
                  label="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  fullWidth
                  multiline={false}
                  margin="normal"
                />
                <TextField
                  label="Employee Count"
                  select
                  value={employeeCount}
                  onChange={(e) => setEmployeeCount(e.target.value)}
                  fullWidth
                  margin="normal"
                >
                  <MenuItem value={1}>1 employee</MenuItem>
                  <MenuItem value={2}>2-10 employees</MenuItem>
                  <MenuItem value={3}>11-50 employees</MenuItem>
                  <MenuItem value={4}>51-100 employees</MenuItem>
                  <MenuItem value={5}>101-500 employees</MenuItem>
                  <MenuItem value={6}>501-1000 employees</MenuItem>
                  <MenuItem value={7}>1001+ employees</MenuItem>
                </TextField>
              </CardContent>
              <CardActions sx={{ justifyContent: 'space-between' }}>
                <div style={{ marginLeft: 'auto' }}>
                  <IconButton color="primary" onClick={handleNext}>
                    <KeyboardArrowRight />
                  </IconButton>
                </div>
              </CardActions>
            </Card>
          )}
          {step === 1 && (
            <Card sx={{ position: 'relative', zIndex: 2, backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Contact Information
                </Typography>
                <TextField
                  label="Company Website"
                  value={companyWebsite}
                  onChange={(e) => setCompanyWebsite(e.target.value)}
                  fullWidth
                  multiline={false}
                  margin="normal"
                />
                <TextField
                  label="Phone Number"
                  value={companyPhoneNumber}
                  onChange={(e) => setCompanyPhoneNumber(e.target.value)}
                  fullWidth
                  multiline={false}
                  margin="normal"
                />
              </CardContent>
              <CardActions sx={{ justifyContent: 'space-between' }}>
                <IconButton color="primary" onClick={handleBack}>
                  <KeyboardArrowLeft />
                </IconButton>
                
                <div style={{ marginLeft: 'auto' }}>
                  <IconButton color="primary" onClick={handleNext}>
                    <KeyboardArrowRight />
                  </IconButton>
                </div>
              </CardActions>
            </Card>
          )}
          {step === 2 && (
            <Card sx={{ position: 'relative', zIndex: 2, backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Address Information
                </Typography>
                <TextField
                  label="Country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  fullWidth
                  multiline={false}
                  margin="normal"
                />
                <TextField
                  label="State"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  fullWidth
                  multiline={false}
                  margin="normal"
                />
                <TextField
                  label="City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  fullWidth
                  multiline={false}
                  margin="normal"
                />
              </CardContent>
              <CardActions sx={{ justifyContent: 'space-between' }}>
                <IconButton color="primary" onClick={handleBack}>
                  <KeyboardArrowLeft />
                </IconButton>

                <Button variant="contained" onClick={handleFinish}>
                  Finish
                </Button>
              </CardActions>
            </Card>
          )}
        </Grid>
      </Container>
    </AuthWrapper>
  );
}

export default GettingStartedPage;
