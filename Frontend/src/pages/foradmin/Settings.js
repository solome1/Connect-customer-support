import React, { useState } from 'react';
import { Grid, Typography, TextField, Select, MenuItem, Button } from '@mui/material';

const Settings = () => {
  const [colors, setColors] = useState({
    primary: '#333',
    secondary: '#666',
  });
  const [headerTheme, setHeaderTheme] = useState('light');
  const [primaryButtonText, setPrimaryButtonText] = useState('Get Started');
  const [logo, setLogo] = useState('');
  const [favicon, setFavicon] = useState('');
  const [heroImage, setHeroImage] = useState('');
  const [customFont, setCustomFont] = useState('');
  const [knowledgeBaseName, setKnowledgeBaseName] = useState('');
  const [header, setHeader] = useState('');
  const [footer, setFooter] = useState('');
  const [languages, setLanguages] = useState(['en']);

  const handleColorChange = (event) => {
    setColors((prevColors) => ({...prevColors, [event.target.name]: event.target.value }));
  };

  const handleHeaderThemeChange = (event) => {
    setHeaderTheme(event.target.value);
  };

  const handlePrimaryButtonTextChange = (event) => {
    setPrimaryButtonText(event.target.value);
  };

  const handleLogoChange = (event) => {
    setLogo(event.target.value);
  };

  const handleFaviconChange = (event) => {
    setFavicon(event.target.value);
  };

  const handleHeroImageChange = (event) => {
    setHeroImage(event.target.value);
  };

  const handleCustomFontChange = (event) => {
    setCustomFont(event.target.value);
  };

  const handleKnowledgeBaseNameChange = (event) => {
    setKnowledgeBaseName(event.target.value);
  };

  const handleHeaderChange = (event) => {
    setHeader(event.target.value);
  };

  const handleFooterChange = (event) => {
    setFooter(event.target.value);
  };

  const handleLanguageChange = (event) => {
    setLanguages((prevLanguages) => [...prevLanguages, event.target.value]);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h5">Settings</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography variant="body1">Appearance</Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              label="Primary Color"
              value={colors.primary}
              onChange={handleColorChange}
              name="primary"
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Secondary Color"
              value={colors.secondary}
              onChange={handleColorChange}
              name="secondary"
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <Select
              label="Header Theme"
              value={headerTheme}
              onChange={handleHeaderThemeChange}
              fullWidth
            >
              <MenuItem value="light">Light</MenuItem>
              <MenuItem value="dark">Dark</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Primary Button Text"
              value={primaryButtonText}
              onChange={handlePrimaryButtonTextChange}
              fullWidth
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={6}>
        <Typography variant="body1">Branding</Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              label="Logo"
              value={logo}
              onChange={handleLogoChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Favicon"
              value={favicon}
              onChange={handleFaviconChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Hero Image"
              value={heroImage}
              onChange={handleHeroImageChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Custom Font"
              value={customFont}
              onChange={handleCustomFontChange}
              fullWidth
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={6}>
        <Typography variant="body1">Content</Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              label="Knowledge Base Name"
              value={knowledgeBaseName}
              onChange={handleKnowledgeBaseNameChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
             label="Header"
              value={header}
              onChange={handleHeaderChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Footer"
              value={footer}
              onChange={handleFooterChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <Select
              label="Languages"
              value={languages}
              onChange={handleLanguageChange}
              fullWidth
              multiple
              renderValue={(selected) => selected.join(', ')}
            >
              <MenuItem value="en">English</MenuItem>
              <MenuItem value="fr">French</MenuItem>
              <MenuItem value="es">Spanish</MenuItem>
              <MenuItem value="de">German</MenuItem>
            </Select>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" color="primary" fullWidth>
          Save Changes
        </Button>
      </Grid>
    </Grid>
  );
};

export default Settings;