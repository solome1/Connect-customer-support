import React from 'react';
import { Grid } from '@mui/material';
import ConversationHeader from './ConversationHeader';
import CustomerInfo from './CustomerInfo';
import MessageHistory from './MessageHistory';
import ReplyBox from './ReplyBox';

const ConversationInterface = ({ conversation }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <ConversationHeader title={conversation?.title} />
      </Grid>
      <Grid item xs={4}>
        <CustomerInfo customer={conversation?.customer} />
      </Grid>
      <Grid item xs={8}>
        <MessageHistory customerMessage={conversation?.customerMessage} />
        {/* Add logic to display interaction history (optional) */}
      </Grid>
      <Grid item xs={12}>
        <ReplyBox />
      </Grid>
    </Grid>
  );
};

export default ConversationInterface;


