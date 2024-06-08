import React, { useState } from 'react';
import { Grid, TextField, Typography, Button } from '@mui/material';

const ArticleEditor = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [status, setStatus] = useState('draft');

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleSave = () => {
    // Save the article to the database or API
  };

  const handlePreview = () => {
    // Preview the article changes
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h5">Article Editor</Typography>
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Title"
          value={title}
          onChange={handleTitleChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Content"
          value={content}
          onChange={handleContentChange}
          fullWidth
          multiline
          rows={10}
        />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body1">Status:</Typography>
        <Select value={status} onChange={handleStatusChange}>
          <MenuItem value="draft">Draft</MenuItem>
          <MenuItem value="published">Published</MenuItem>
          <MenuItem value="published-with-pending-changes">
            Published with pending changes
          </MenuItem>
        </Select>
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" color="primary" onClick={handleSave}>
          Save
        </Button>
        <Button variant="contained" color="primary" onClick={handlePreview}>
          Preview
        </Button>
      </Grid>
    </Grid>
  );
};

export default ArticleEditor;