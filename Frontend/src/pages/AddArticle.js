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
  Typography,
  Drawer, 
  List, 
  ListItem, 
  ListItemText
} from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import Textarea from '@mui/material/TextareaAutosize';

const AddArticle = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
//   const [keywords, setKeywords] = useState([]);

  const onTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const onEditorStateChange = (state) => {
    setEditorState(state);
  };

//   const addKeyword = (e) => {
//     if (e.key === 'Enter') {
//       setKeywords([...keywords, e.target.value.trim()]);
//       e.target.value = '';
//     }
//   };

  const handlePreview = () => {
    // Logic to preview the article
  };

  const handlePublish = () => {
    // Logic to publish the article
    const contentState = editorState.getCurrentContent();
    const rawContentState = convertToRaw(contentState);
    console.log('Article content:', rawContentState);
    console.log('Article title:', title);
    console.log('Article keywords:', keywords);
  };

  return (
    <Box
      sx={{
        p: 4,
        bgcolor: 'background.paper',
        boxShadow: 4,
        borderRadius: 2,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 4,
        }}
      >
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

        <Typography variant="h5">Edit Article</Typography>
        <Box>
          <Tooltip title="Delete">
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
          <Button variant="contained" onClick={handlePreview}>
            Preview Changes
          </Button>
          <Button variant="contained" color="primary" onClick={handlePublish}>
            Publish
          </Button>
        </Box>
      </Box>
      <TextField
        fullWidth
        label="Add a title"
        variant="outlined"
        value={title}
        onChange={onTitleChange}
        sx={{ mb: 4 }}
      />
        
      <Textarea
      fullWidth
      variant="outlined"
      value={content}
      onChange={(e) => setContent(e.target.value)}
      placeholder="Enter the article content"
      style={{ width: '100%', minHeight: '200px' }}
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
        // sx={{ mb: 4 }}
      />
      {/* <TextField
        fullWidth
        label="Add keywords (press Enter to add)"
        variant="outlined"
        onKeyPress={addKeyword}
      /> */}
    </Box>
  );
};

export default AddArticle;