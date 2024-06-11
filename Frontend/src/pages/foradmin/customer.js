import React, { useState, useEffect } from 'react';
import {
  Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Button, TextField, Avatar,
  TablePagination, Modal, Fade, Backdrop, Tooltip, IconButton, Divider
} from '@mui/material';
import { ArrowUpward, ArrowDownward, PhotoCamera, Edit as EditIcon, Chat as ChatIcon } from '@mui/icons-material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const CustomerComponent = () => {
  const [customers, setCustomers] = useState([]);
  const [newCustomer, setNewCustomer] = useState({
    id: '',
    name: '',
    email: '',
    contact: '',
    profileImage: '',
    createdDate: '',
    updatedDate: ''
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [open, setOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [editableCustomer, setEditableCustomer] = useState(null);
  const [openProfile, setOpenProfile] = useState(false);

  useEffect(() => {
    const sorted = [...customers].sort((a, b) => {
      if (a[sortColumn] < b[sortColumn]) return sortDirection === 'asc' ? -1 : 1;
      if (a[sortColumn] > b[sortColumn]) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
    const filtered = sorted.filter((customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCustomers(filtered);
  }, [customers, sortColumn, sortDirection, searchTerm]);

  const handleSort = (column) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const handleOpenModal = () => {
    setNewCustomer({
      id: '',
      profileImage: '',
      name: '',
      email: '',
      contact: '',
      createdDate: new Date().toLocaleString(),
      updatedDate: ''
    });
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
    setSelectedCustomer(null);
    setEditableCustomer(null);
  };

  const handleCreateCustomer = () => {
    const updatedCustomer = { ...newCustomer, id: Date.now().toString(), updatedDate: new Date().toLocaleString() };
    setCustomers([...customers, updatedCustomer]);
    setOpen(false);
  };

  const handleSearch = (event) => setSearchTerm(event.target.value);

  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleProfilePictureChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onloadend = () => setNewCustomer({ ...newCustomer, profileImage: reader.result });
    }
  };

  const handleEdit = (customer) => {
    setEditableCustomer(customer);
    setSelectedCustomer(null);
    setOpen(true);
  };

  const handleUpdateCustomer = () => {
    const updatedCustomers = customers.map((customer) =>
      customer.id === editableCustomer.id ? { ...editableCustomer, updatedDate: new Date().toLocaleString() } : customer
    );
    setCustomers(updatedCustomers);
    setOpen(false);
  };

  const handleDelete = (customerId) => {
    const updatedCustomers = customers.filter((customer) => customer.id !== customerId);
    setCustomers(updatedCustomers);
  };

  const handleOpenProfile = (customer) => {
    setSelectedCustomer(customer);
    setOpenProfile(true);
  };

  const handleCloseProfile = () => {
    setOpenProfile(false);
  };

  const visibleCustomers = filteredCustomers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Box>
          <TextField
            placeholder="Search customers"
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={handleSearch}
            style={{ flexGrow: 1, marginRight: '16px' }}
          />
        </Box>
        <Button variant="contained" onClick={handleOpenModal} style={{ marginLeft: 16 }}>
          Add Customer
        </Button>
      </Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
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
              <TableCell>Email</TableCell>
              <TableCell>Contact</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {visibleCustomers.map((customer) => (
              <TableRow key={customer.id} onClick={() => handleOpenProfile(customer)} style={{ cursor: 'pointer' }}>
                <TableCell>
                  <Avatar src={customer.profileImage} alt={customer.name} />
                </TableCell>
                <TableCell>{customer.name}</TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>{customer.contact}</TableCell>
                <TableCell>
                  <Button variant="contained" color="primary" onClick={(e) => { e.stopPropagation(); handleEdit(customer); }}>
                    Edit
                  </Button>
                  <Button variant="contained" color="secondary" onClick={(e) => { e.stopPropagation(); handleDelete(customer.id); }} style={{ marginLeft: '8px' }}>
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
        count={customers.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Modal
        open={open}
        onClose={handleCloseModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Fade in={open}>
          <Box sx={style}>
            {selectedCustomer ? (
              <>
                <Typography variant="h6" component="h2" gutterBottom>
                  {selectedCustomer.name}&apos;s Profile
                </Typography>
                <Box display="flex" flexDirection="column" gap={2}>
                  <Avatar src={selectedCustomer.profileImage} alt={selectedCustomer.name} style={{ width: 100, height: 100, alignSelf: 'center' }} />
                  <Typography><strong>Name:</strong> {selectedCustomer.name}</Typography>
                  <Typography><strong>Email:</strong> {selectedCustomer.email}</Typography>
                  <Typography><strong>Contact:</strong> {selectedCustomer.contact}</Typography>
                  <Typography variant="body2" color="textSecondary" align="right">
                    Created: {selectedCustomer.createdDate}<br />
                    Updated: {selectedCustomer.updatedDate}
                  </Typography>
                  <Divider />
                  <Box display="flex" justifyContent="flex-end" gap={2}>
                    <Button variant="outlined" color="primary" startIcon={<EditIcon />} onClick={() => handleEdit(selectedCustomer)}>
                      Edit
                    </Button>
                    <Button variant="contained" color="primary" onClick={handleCloseModal}>
                      Close
                    </Button>
                  </Box>
                </Box>
              </>
            ) : (
              <>
                <Typography variant="h6" component="h2" gutterBottom>
                  {editableCustomer ? 'Edit Customer' : 'Add Customer'}
                </Typography>
                <Box display="flex" flexDirection="column" gap={2}>
                  <input
                    accept="image/*"
                    id="profile-image-upload"
                    type="file"
                    style={{ display: 'none' }}
                    onChange={handleProfilePictureChange}
                  />
                  <label htmlFor="profile-image-upload">
                    <IconButton color="primary" component="span">
                      <PhotoCamera />
                    </IconButton>
                  </label>
                  <Avatar src={editableCustomer ? editableCustomer.profileImage : newCustomer.profileImage} alt="Profile Image" />
                  <TextField
                    label="Name"
                    variant="outlined"
                    size="small"
                    value={editableCustomer ? editableCustomer.name : newCustomer.name}
                    onChange={(e) => editableCustomer ?
                      setEditableCustomer({ ...editableCustomer, name: e.target.value }) :
                      setNewCustomer({ ...newCustomer, name: e.target.value })}
                  />
                  <TextField
                    label="Email"
                    variant="outlined"
                    size="small"
                    value={editableCustomer ? editableCustomer.email : newCustomer.email}
                    onChange={(e) => editableCustomer ?
                      setEditableCustomer({ ...editableCustomer, email: e.target.value }) :
                      setNewCustomer({ ...newCustomer, email: e.target.value })}
                  />
                  <TextField
                    label="Contact"
                    variant="outlined"
                    size="small"
                    value={editableCustomer ? editableCustomer.contact : newCustomer.contact}
                    onChange={(e) => editableCustomer ?
                      setEditableCustomer({ ...editableCustomer, contact: e.target.value }) :
                      setNewCustomer({ ...newCustomer, contact: e.target.value })}
                  />
                  <Typography variant="body2" color="textSecondary" align="right">
                    Created: {editableCustomer ? editableCustomer.createdDate : newCustomer.createdDate}<br />
                    Updated: {editableCustomer ? editableCustomer.updatedDate : newCustomer.updatedDate}
                  </Typography>
                  <Divider />
                  <Box display="flex" justifyContent="flex-end" gap={2}>
                    <Button variant="contained" color="primary" onClick={editableCustomer ? handleUpdateCustomer : handleCreateCustomer}>
                      {editableCustomer ? 'Update' : 'Create'}
                    </Button>
                    <Button variant="outlined" color="secondary" onClick={handleCloseModal}>
                      Cancel
                    </Button>
                  </Box>
                </Box>
              </>
            )}
          </Box>
        </Fade>
      </Modal>
      <Modal
        open={openProfile}
        onClose={handleCloseProfile}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Fade in={openProfile}>
          <Box sx={style}>
            {selectedCustomer && (
              <>
                <Typography variant="h6" component="h2" gutterBottom>
                  {selectedCustomer.name}&apos;s Profile
                </Typography>
                <Box display="flex" flexDirection="column" gap={2}>
                  <Avatar src={selectedCustomer.profileImage} alt={selectedCustomer.name} style={{ width: 100, height: 100, alignSelf: 'center' }} />
                  <Typography><strong>Name:</strong> {selectedCustomer.name}</Typography>
                  <Typography><strong>Email:</strong> {selectedCustomer.email}</Typography>
                  <Typography><strong>Contact:</strong> {selectedCustomer.contact}</Typography>
                  <Typography variant="body2" color="textSecondary" align="right">
                    Created: {selectedCustomer.createdDate}<br />
                    Updated: {selectedCustomer.updatedDate}
                  </Typography>
                  <Divider />
                  <Box display="flex" justifyContent="flex-end" gap={2}>
                    <Button variant="contained" color="primary" startIcon={<ChatIcon />}>
                      Conversation
                    </Button>
                    <Button variant="outlined" color="secondary" onClick={handleCloseProfile}>
                      Close
                    </Button>
                  </Box>
                </Box>
              </>
            )}
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};

export default CustomerComponent;