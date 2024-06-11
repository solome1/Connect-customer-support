import React, { useState } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import {
  Box,
  Button,
  IconButton,
  TextField,
  Tooltip,
  Grid,
  Typography,
  MenuItem,
  Select,
} from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';


const AddArticle = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [status, setStatus] = useState('draft');



  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };


  const onTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const onEditorStateChange = (state) => {
    setEditorState(state);
  };

  const handlePreview = () => {
    // Logic to preview the article
  };

  const handlePublish = () => {
    // Logic to publish the article
    const contentState = editorState.getCurrentContent();
    const rawContentState = convertToRaw(contentState);
    console.log('Article content:', rawContentState);
    console.log('Article title:', title);
  };

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
        }}

      >
        <Box>

          <Grid container spacing={2}>

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
          </Grid>
        </Box>
        <Box
          variant="contained"
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            marginLeft: 16
          }}
        >
          <Tooltip title="Delete">
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
          <Button variant="contained" onClick={handlePreview}>
            Preview
          </Button>
          <Button variant="contained" color="primary" onClick={handlePublish}>
            Publish
          </Button>
        </Box>
      </Box>

      <Box
        sx={{
          p: 4,
          bgcolor: 'background.paper',
          boxShadow: 4,
          borderRadius: 2,
        }}
      >

        <TextField
          fullWidth
          label="Add a title"
          variant="outlined"
          value={title}
          onChange={onTitleChange}
          sx={{ mb: 4 }}
        />
        {/* 
        <Textarea
          onChange={(e) => setContent(e.target.value)}
        /> */}

        <TextField
          label="Add article Content"
          value={content}
          onChange={handleContentChange}
          variant="outlined"
          fullWidth
          multiline
          rows={10}
        />

        <Editor
          editorState={editorState}
          onEditorStateChange={onEditorStateChange}
          toolbarClassName="formatting-toolbar"
          wrapperClassName="content-editor"
          editorClassName="editor-content"
          toolbar={{
            options: [
              'inline',
              'blockType',
              'fontFamily',
              'fontSize',
              'list',
              'textAlign',
              'colorPicker',
              'link',
              'embedded',
              'emoji',
              'image',
              'remove',
              'history',
            ],
          }}

        />
      </Box>
    </Box>
  );
};

export default AddArticle;
