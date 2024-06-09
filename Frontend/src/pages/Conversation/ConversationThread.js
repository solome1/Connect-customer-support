import React from 'react';
import {Box} from '@mui/material'
import Message from './Message'; // Import the Message component

const ConversationThread = ({ messages }) => {
  return (
    <Box sx={{ overflowY: "auto", maxHeight: "400px" }}>
      {messages.map((message) => (
        <Message key={message.id} content={message.content} sender={message.sender} timestamp={message.timestamp} />
      ))}
    </Box>
  );
};

export default ConversationThread;