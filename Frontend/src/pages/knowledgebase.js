import React from 'react';
import { Button, Box, Drawer, List, ListItem, ListItemText } from '@mui/material';

const CMSComponent = () => {
  // Sample data for articles
  const articles = [
    {
      title: 'Article 1',
      description: 'This is the first article',
      image: 'article1.jpg',
    },
    {
      title: 'Article 2',
      description: 'This is the second article',
      image: 'article2.jpg',
    },
    // Add more articles as needed
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Sidebar */}
      <Drawer variant="permanent" anchor="left">
        <List>
          <ListItem button>
            <ListItemText primary="Content" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Settings" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Publish" />
          </ListItem>
        </List>
      </Drawer>

      {/* Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {/* Search bar */}
        {/* Replace with your SearchBar component */}

        {/* List of articles */}
        {articles.map((article, index) => (
          <div key={index}>
            <h3>{article.title}</h3>
            <p>{article.description}</p>
            {/* Add image component or image tag */}
            <img src={article.image} alt={article.title} />
          </div>
        ))}

        {/* Publish button */}
        <Button variant="contained">Publish</Button>
      </Box>
    </Box>
  );
};

export default CMSComponent;