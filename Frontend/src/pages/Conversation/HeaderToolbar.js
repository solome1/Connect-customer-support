import React from 'react';
import {AppBar, Box, Avatar, IconButton, Toolbar, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';



const HeaderToolbar = ({ conversation })  => {
    return (
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" noWrap component="div">
              {conversation.title} (#{conversation.id})
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Avatar alt={conversation.agent.name} src={conversation.agent.avatarUrl} />
            <Typography variant="subtitle1" sx={{ ml: 2 }}>
              {conversation.agent.name}
            </Typography>
            <IconButton color="inherit" aria-label="close">
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      );
    };
export default HeaderToolbar;