import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Grid, Typography, Button } from '@mui/material';


const HomePage = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Typography variant="h2" gutterBottom>
            Welcome to Our Customer Support App
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Our intelligent customer support app is here to help you with all your inquiries and issues. Get fast and reliable assistance from our team of experts.
          </Typography>
          <Button
            component={Link}
            to="/contact"
            variant="contained"
            color="primary"
            size="large"
            sx={{ mt: 4 }}
          >
            Contact Us
          </Button>
        </Grid>
        <Grid item xs={12} md={6}>
          <img
            src="/images/customer-support.jpg"
            alt="Customer Support"
            style={{ width: '100%', maxHeight: 400, objectFit: 'cover' }}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default HomePage;