import React, { useState, useEffect } from 'react';
import { Grid, Typography, Button, Card, CardContent, Dialog, DialogActions, DialogContent, DialogTitle, TextField, MenuItem, Modal, Backdrop } from '@mui/material';
import { Box } from '../../node_modules/@mui/material/index';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 200,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 2,
};

const Organization = () => {
  const [open, setOpen] = useState(false);
  const [organization, setOrganization] = useState({
    companyName: '',
    companyEmail: '',
    companyDescription: '',
    employeeCount: '',
    companyWebsite: '',
    primaryContact: '',
    country: '',
    state: '',
    city: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrganization = async () => {
      try {
        const response = await fetch('http://localhost:8082/api/companies/123'); // Replace with actual ID
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setOrganization(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchOrganization();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setOrganization({ ...organization, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
 
  };



  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>

        </Grid>
        <Grid item xs={12} md={12}>
          <Card>
            <CardContent>
              <Typography variant="h4" gutterBottom>
                Company Information
              </Typography>
              <Typography variant="body1" gutterBottom>
                Company Name: <strong>{organization.companyName}</strong>
              </Typography>
              <Typography variant="body1" gutterBottom>
                Company Email: <strong>{organization.companyEmail}</strong>
              </Typography>
              <Typography variant="body1" gutterBottom>
                Description: <strong>{organization.companyDescription}</strong>
              </Typography>
              <Typography variant="body1" gutterBottom>
                Employee Count: <strong>{organization.employeeCount}</strong>
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h4" gutterBottom>
                Contact Information
              </Typography>
              <Typography variant="body1" gutterBottom>
                Company Website: <strong>{organization.companyWebsite}</strong>
              </Typography>
              <Typography variant="body1" gutterBottom>
                Primary Contact: <strong>{organization.primaryContact}</strong>
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Address Information
              </Typography>
              <Typography variant="body1" gutterBottom>
                Country: <strong>{organization.country}</strong>
              </Typography>
              <Typography variant="body1" gutterBottom>
                State: <strong>{organization.state}</strong>
              </Typography>
              <Typography variant="body1" gutterBottom>
                City: <strong>{organization.city}</strong>
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={handleClickOpen}>
            Edit Organization Details
          </Button>
        </Grid>
      </Grid>
      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Box
        sx={style}
        >
          {/* Edit Organization Modal */}
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Edit Organization Details</DialogTitle>
            <DialogContent>
              <TextField
                label="Company Name"
                name="companyName"
                value={organization.companyName}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Company Email"
                name="companyEmail"
                value={organization.companyEmail}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Description"
                name="companyDescription"
                value={organization.companyDescription}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Employee Count"
                name="employeeCount"
                select
                value={organization.employeeCount}
                onChange={handleChange}
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
              <TextField
                label="Company Website"
                name="companyWebsite"
                value={organization.companyWebsite}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Primary Contact"
                name="primaryContact"
                value={organization.primaryContact}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Country"
                name="country"
                value={organization.country}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="State"
                name="state"
                value={organization.state}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="City"
                name="city"
                value={organization.city}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="secondary">
                Cancel
              </Button>
              <Button onClick={handleSubmit} color="primary">
                Save
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Modal>

    </>
  );
};

export default Organization;
