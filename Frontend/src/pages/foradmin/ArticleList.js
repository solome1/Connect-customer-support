import React, { useState, useEffect } from 'react';
import {
  Box, Table, TableBody, TableCell, TableContainer, TableHead, 
  TableRow, Button, TextField,TablePagination, Tooltip, IconButton
} from '@mui/material';
import { ArrowUpward, ArrowDownward  } from '@mui/icons-material';


const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [newArticle, setNewArticle] = useState({
    id: '',
    name: '',
    email: '',
    status: '',
    createdDate: '',
    updatedDate: ''
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [open, setOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [filteredArticles, setFilteredtArticles] = useState([]);
  const [editableArticle, setEditableArticle] = useState(null);


  useEffect(() => {
    const sorted = [...articles].sort((a, b) => {
      if (a[sortColumn] < b[sortColumn]) return sortDirection === 'asc' ? -1 : 1;
      if (a[sortColumn] > b[sortColumn]) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
    const filtered = sorted.filter((article) =>
      article.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredtArticles(filtered);
  }, [articles, sortColumn, sortDirection, searchTerm]);

  const handleSort = (column) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const handleCreateArticle = () => {
    const updatedArticles = { ...newArticle, id: Date.now().toString(), updatedDate: new Date().toLocaleString() };
    setCustomers([...articles, updatedArticles]);
    setOpen(false);
  };

  const handleUpdateArticles = () => {
    const updatedArticles = articles.map((article) =>
      article.id === editableArticle.id ? { ...editableArticle, updatedDate: new Date().toLocaleString() } : article
    );
    setCustomers(updatedArticles);
    setOpen(false);
  };
  const handleSearch = (event) => setSearchTerm(event.target.value);

  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDelete = (articleId) => {
    const updatedArticles = articles.filter((article) => article.id !== articleId);
    setArticles(updatedArticles);
  };

  const visibleArticles = filteredArticles.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Box>
          <TextField
            placeholder="Search Article"
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={handleSearch}
            style={{ flexGrow: 1, marginRight: '16px' }}
          />
        </Box>
        <Button variant="contained"  style={{ marginLeft: 16 }}>
          Add Article
        </Button>
      </Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              
              <TableCell onClick={() => handleSort('name')}>
                <Box display="flex" alignItems="center">
                  Name
                  {sortColumn === 'name' && (
                    <Tooltip title={sortDirection === 'asc' ? 'Sort descending' : 'Sort ascending'}>
                      <IconButton size="small">
                        {sortDirection === 'asc' ? <ArrowUpward /> : <ArrowDownward />}
                      </IconButton>
                    </Tooltip>
                  )}
                </Box>
              </TableCell>
              <TableCell>Status</TableCell>
              <TableCell> Created Date</TableCell>
              <TableCell>Last updated</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {visibleArticles.map((article) => (
              <TableRow key={article.id}  style={{ cursor: 'pointer' }}>
                <TableCell>{article.name}</TableCell>
                <TableCell>{article.status}</TableCell>
                <TableCell>{editableArticle ? editableArticle.createdDate : newArticle.createdDate}</TableCell>
                <TableCell>{editableArticle ? editableArticle.updatedDate : newArticle.updatedDate}</TableCell>
                <TableCell>
                  <Button variant="contained" color="secondary" onClick={(e) => { e.stopPropagation(); handleDelete(article.id); }} style={{ marginLeft: '8px' }}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={articles.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      
    </Box>
  );
};

export default ArticleList;











































































