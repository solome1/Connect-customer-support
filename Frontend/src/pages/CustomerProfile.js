import React from 'react';
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemText,
  Chip,
} from '@mui/material';

const CustomerProfile = ({ customer = {} }) => {
  if (!customer.name) {
    return <div>Loading...</div>;
  }

  return (
    <Box className="customer-profile" mt={4}>
      <Grid container spacing={3}>
        {/* Customer basic information */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h5">{customer.name}</Typography>
              <Typography variant="subtitle1" color="text.secondary">
                {customer.email}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Contact details */}
        <Grid item xs={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Contact Details
              </Typography>
              <List>
                <ListItem>
                  <ListItemText primary="Phone" secondary={customer.phone} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Address" secondary={customer.address} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Timezone" secondary={customer.timezone} />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Billing and payment information */}
        <Grid item xs={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Billing and Payment
              </Typography>
              <List>
                <ListItem>
                  <ListItemText primary="Payment Method" secondary={customer.paymentMethod} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Last Invoice" secondary={customer.lastInvoice} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Next Invoice Due" secondary={customer.nextInvoiceDue} />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Order history */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Order History
              </Typography>
              <List>
                {(customer.orders || []).map((order) => (
                  <ListItem key={order.id}>
                    <ListItemText
                      primary={`Order #${order.id}`}
                      secondary={`Placed on ${order.date} | Total: ${order.total}`}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Notes and tags */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Notes and Tags
              </Typography>
              <Box>
                <Typography variant="subtitle1" gutterBottom>
                  Notes
                </Typography>
                <Typography>{customer.notes || 'No notes'}</Typography>
              </Box>
              <Divider />
              <Box mt={2}>
                <Typography variant="subtitle1" gutterBottom>
                  Tags
                </Typography>
                <Box>
                  {(customer.tags || []).map((tag) => (
                    <Chip key={tag} label={tag} variant="outlined" color="primary" sx={{ mr: 1, mb: 1 }} />
                  ))}
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CustomerProfile;