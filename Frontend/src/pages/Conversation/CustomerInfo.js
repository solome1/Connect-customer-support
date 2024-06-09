import React from 'react';
import { Box, Typography, Avatar, Card } from '@mui/material'; // Import Box here


const CustomerInfo = ({ customer }) => {
  return (
    <Card sx={{ padding: 1 }}>
      <Box display="flex" alignItems="center" mb={1}>
        <Avatar alt={customer?.name} src={customer?.avatarUrl} />  {/* Use optional chaining */}
        <Typography variant="body1" sx={{ ml: 1 }}>
          {customer?.name}
        </Typography>
      </Box>
      <Typography variant="caption" color="textSecondary">
        Email: {customer?.email}
      </Typography>
      {/* Rest of your component logic */}
    </Card>
  );
};

export default CustomerInfo;






        
      