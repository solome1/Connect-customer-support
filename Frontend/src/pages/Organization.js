import React from 'react';
import { Grid, Typography, Button, Card, CardContent, CardActions } from '@mui/material';

const Organization = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h4" gutterBottom>
          Organization Details
        </Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Company Information
            </Typography>
            <Typography variant="body1" gutterBottom>
              Company Name: <strong>{/* company name */}</strong>
            </Typography>
            <Typography variant="body1" gutterBottom>
              Company Email: <strong>{/* company email */}</strong>
            </Typography>
            <Typography variant="body1" gutterBottom>
              Description: <strong>{/* company description */}</strong>
            </Typography>
            <Typography variant="body1" gutterBottom>
              Employee Count: <strong>{/* employee count */}</strong>
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Contact Information
            </Typography>
            <Typography variant="body1" gutterBottom>
              Company Website: <strong>{/* company website */}</strong>
            </Typography>
            <Typography variant="body1" gutterBottom>
              Primary Contact: <strong>{/* primary contact */}</strong>
            </Typography>
           
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Address Information
            </Typography>
            <Typography variant="body1" gutterBottom>
              Country: <strong>{/* country */}</strong>
            </Typography>
            <Typography variant="body1" gutterBottom>
              State: <strong>{/* state */}</strong>
            </Typography>
            <Typography variant="body1" gutterBottom>
              City: <strong>{/* city */}</strong>
            </Typography>
            
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" color="primary">
          Edit Organization Details
        </Button>
      </Grid>
    </Grid>
  );
};

export default Organization;