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

const AgentProfile = ({ agent = {} }) => {
  if (!agent.name) {
    return <div>Loading...</div>;
  }

  return (
    <Box className="agent-profile" mt={4}>
      <Grid container spacing={3}>
        {/* Agent basic information */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h5">{agent.name}</Typography>
              <Typography variant="subtitle1" color="text.secondary">
                {agent.email}
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
                  <ListItemText primary="Phone" secondary={agent.phone} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Address" secondary={agent.address} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Timezone" secondary={agent.timezone} />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Listing and sales information */}
        <Grid item xs={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Listing and Sales
              </Typography>
              <List>
                <ListItem>
                  <ListItemText primary="Current Listings" secondary={agent.currentListings} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Sold Listings" secondary={agent.soldListings} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Total Commission" secondary={`$${agent.totalCommission}`} />
                </ListItem>
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
                <Typography>{agent.notes || 'No notes'}</Typography>
              </Box>
              <Divider />
              <Box mt={2}>
                <Typography variant="subtitle1" gutterBottom>
                  Tags
                </Typography>
                <Box>
                  {(agent.tags || []).map((tag) => (
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

export default AgentProfile;