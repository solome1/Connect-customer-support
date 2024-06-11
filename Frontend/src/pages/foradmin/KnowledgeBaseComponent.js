import React, { useState, useEffect } from 'react';
import { Container, Grid, Button, } from '@mui/material';
import ArticleList from './ArticleList';
// import ArticleEditor  from './ArticleEditor';
import Settings from './Settings';

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
  const [activeTab, setActiveTab] = useState('content');

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
    setSettings((prevSettings) => ({ ...prevSettings, [key]: value }));
  };

  const filteredArticles = articles.filter((article) =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleContent = (key, value) => {

  }

  return (
    <Container maxWidth="lg">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4} md={3}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,

          }}>
          <Button variant="contained" color="secondary" style={{ marginleft: '8px' }} onClick={() => handleTabChange('content')} >
            Content
          </Button>

          <Button variant="contained" color="secondary" style={{ marginleft: '8px' }} onClick={() => handleTabChange('settings')} >
            Settings
          </Button>

        </Grid>
        <Grid item xs={12} sm={8} md={12}>
          {activeTab === 'content' ? (
            <ArticleList articles={filteredArticles} onSelect={handleArticleSelect} />
          ) : (
            <Settings settings={settings} onChange={handleSettingsChange} />
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default KnowledgeBaseComponent;