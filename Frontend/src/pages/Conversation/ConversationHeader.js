import React from 'react';
import { Typography } from '@mui/material';

const ConversationHeader = ({ title }) => {
  return (
    <Typography variant="h6" noWrap component="div">
      {title}
    </Typography>
  );
};

export default ConversationHeader;
