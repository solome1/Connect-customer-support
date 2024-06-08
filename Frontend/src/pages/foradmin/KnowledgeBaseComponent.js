import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, Button, TextField, Select, MenuItem } from '@mui/material';
import  ArticleList  from './ArticleList';
import ArticleEditor  from './ArticleEditor';
import  Settings  from './Settings';

const KnowledgeBaseComponent = () => {
  const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [settings, setSettings] = useState({
    colors: {
      primary: '#333',
      secondary: '#666',
    },
    logo: '',
    headerTheme: 'light',
    primaryButtonText: 'Get Started',
  });

  useEffect(() => {
    // Fetch articles from API or database
    const fetchArticles = async () => {
      const response = await fetch('/api/articles');
      const data = await response.json();
      setArticles(data);
    };
    fetchArticles();
  }, []);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleArticleSelect = (article) => {
    setSelectedArticle(article);
  };

  const handleSettingsChange = (key, value) => {
    setSettings((prevSettings) => ({...prevSettings, [key]: value }));
  };

  const filteredArticles = articles.filter((article) =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container maxWidth="lg">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4} md={3}>
          <Typography variant="h5">Knowledge Base</Typography>
          <TextField
            label="Search"
            value={searchQuery}
            onChange={handleSearch}
            fullWidth
          />
          <ArticleList articles={filteredArticles} onSelect={handleArticleSelect} />
        </Grid>
        <Grid item xs={12} sm={8} md={9}>
          {selectedArticle? (
            <ArticleEditor article={selectedArticle} />
          ) : (
            <Typography variant="h5">Select an article to edit</Typography>
          )}
        </Grid>
        <Grid item xs={12}>
          <Settings settings={settings} onChange={handleSettingsChange} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default KnowledgeBaseComponent;