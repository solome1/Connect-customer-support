import React from 'react';
import { makeStyles } from '@mui/material';
import {
  Grid,
  Typography,
  Avatar,
  Button,
  TextField,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
} from '@mui/material';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  conversationHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'pace-between',
    padding: theme.spacing(1),
  },
  conversationThread: {
    padding: theme.spacing(2),
  },
  message: {
    padding: theme.spacing(1),
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  messageContent: {
    padding: theme.spacing(1),
  },
  replyButton: {
    margin: theme.spacing(1),
  },
  attachmentButton: {
    margin: theme.spacing(1),
  },
  searchInput: {
    width: '100%',
    padding: theme.spacing(1),
  },
}));

const ChatCallManagement = () => {
  const classes = useStyles();
  const [messages, setMessages] = React.useState([
    {
      id: 1,
      sender: 'Customer',
      message: 'Hi, I have a question about my order.',
      timestamp: '2023-02-20 14:30',
    },
    {
      id: 2,
      sender: 'Agent',
      message: 'Hi there! I\'d be happy to help with your order. Can you please provide more details?',
      timestamp: '2023-02-20 14:35',
    },
    //...
  ]);

  const handleReply = (message) => {
    // Handle reply logic here
  };

  const handleAttachment = () => {
    // Handle attachment logic here
  };

  const handleSearch = (event) => {
    // Handle search logic here
  };

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12} className={classes.conversationHeader}>
        <Typography variant="h6">Conversation</Typography>
        <Button variant="contained" color="primary">
          Close
        </Button>
      </Grid>
      <Grid item xs={12} className={classes.conversationThread}>
        <List>
          {messages.map((message) => (
            <ListItem key={message.id} className={classes.message}>
              <ListItemAvatar>
                <Avatar src={message.sender === 'Customer'? '/customer-avatar.png' : '/agent-avatar.png'} />
              </ListItemAvatar>
              <ListItemText
                primary={message.message}
                secondary={message.timestamp}
              />
              <Button
                variant="contained"
                color="primary"
                className={classes.replyButton}
                onClick={() => handleReply(message)}
              >
                Reply
              </Button>
            </ListItem>
          ))}
        </List>
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <Grid item xs={12}>
        <TextField
          id="search-input"
          label="Search conversation"
          variant="outlined"
          className={classes.searchInput}
          onChange={handleSearch}
        />
      </Grid>
      <Grid item xs={12}>
        <Button
          variant="contained"
          color="primary"
          className={classes.attachmentButton}
          onClick={handleAttachment}
        >
          Attach file
        </Button>
      </Grid>
    </Grid>
  );
};

export default ChatCallManagement;