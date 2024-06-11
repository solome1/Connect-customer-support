import React, { useState, useEffect } from 'react';
import {
  Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Button, TextField, Avatar,
  TablePagination, Modal, Fade, Backdrop, Tooltip, IconButton, Divider
} from '@mui/material';
import { ArrowUpward, ArrowDownward, PhotoCamera, Edit as EditIcon } from '@mui/icons-material';

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

const Agent = () => {
  const [agents, setAgents] = useState([]);
  


  const [newAgent, setNewAgent] = useState({
    id: '',
    profileImage: '',
    agentName: '',
    agentEmail: '',
    agentPhoneNumber: '',
    status: 'active',
    // createdDate: new Date().toLocaleString(),
    // updatedDate: ''
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [open, setOpen] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState(null); // New state for selected agent
  const [filteredAgents, setFilteredAgents] = useState([]);
  const [editableAgent, setEditableAgent] = useState(null);
  const [openProfile, setOpenProfile] = useState(false);
  // useEffect(() => {
    
  // }, []);

  const postNewAgent = async () => {
    console.log("POSTIIING")
    try {
      const response = await fetch('http://localhost:8082/api/agents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newAgent)
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
      handleCloseModal()
      // You can also update the state or perform other actions after posting the data
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      // setLoading(true);
      try {
        const response = await fetch('http://localhost:8082/api/agents');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setAgents(data);
      } catch (error) {
        // setError(error.message);
      } 
    };
    fetchData()
    const sorted = [...agents].sort((a, b) => {
      if (a[sortColumn] < b[sortColumn]) return sortDirection === 'asc' ? -1 : 1;
      if (a[sortColumn] > b[sortColumn]) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
    const filtered = sorted.filter((agent) =>
      agent.agentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.agentEmail.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredAgents(filtered);
  }, [agents, sortColumn, sortDirection, searchTerm]);

  const handleSort = (column) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const handleOpenModal = () => {
    setNewAgent({
      id: '',
      profileImage: '',
      agentName: '',
      agentEmail: '',
      agentPhoneNumber: '',
      status: 'active',
      createdDate: new Date().toLocaleString(),
      updatedDate: ''
    });
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
    setSelectedAgent(null);
    setEditableAgent(null);
    setNewAgent(null);
  };

  const handleCreateAgent = () => {
    const updatedAgent = { ...newAgent, id: Date.now().toString(), updatedDate: new Date().toLocaleString() };
    console.log(updatedAgent)
    setAgents([...agents, updatedAgent]);
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
      reader.onloadend = () => setNewAgent({ ...newAgent, profileImage: reader.result });
    }
  };

  const handleEdit = (agent) => {
    setEditableAgent(agent);
    setSelectedAgent(null);
    setOpen(true);
  };

  const handleUpdateAgent = () => {
    const updatedAgents = agents.map((agent) =>
      agent.id === editableAgent.id ? { ...editableAgent, updatedDate: new Date().toLocaleString() } : agent
    );
    setAgents(updatedAgents);
    setOpen(false);
  };

  const handleStatusToggle = (agentId, currentStatus) => {
    const updatedAgents = agents.map((agent) =>
      agent.id === agentId
        ? { ...agent, status: currentStatus === 'active' ? 'inactive' : 'active', updatedDate: new Date().toLocaleString() }
        : agent
    );
    setAgents(updatedAgents);
  };

  const handleOpenProfile = (agents) => {
    setSelectedAgent(agents);
    setOpenProfile(true);
  };

  const handleCloseProfile = () => {
    setOpenProfile(false);
  };

  const visibleAgents = filteredAgents.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Box>
          <TextField
            placeholder="Search agents"
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={handleSearch}
            style={{ flexGrow: 1, marginRight: '16px' }}
          />
        </Box>

        <Button variant="contained" onClick={handleOpenModal} style={{ marginLeft: 16 }}>
          Add Agent
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
              <TableCell onClick={() => handleSort('email')}>
                <Box display="flex" alignItems="center">
                  Email
                  {sortColumn === 'email' && (
                    <Tooltip title={sortDirection === 'asc' ? 'Sort descending' : 'Sort ascending'}>
                      <IconButton size="small">
                        {sortDirection === 'asc' ? <ArrowUpward /> : <ArrowDownward />}
                      </IconButton>
                    </Tooltip>
                  )}
                </Box>
              </TableCell>
              <TableCell>Contact</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {visibleAgents.map((agent) => (
              <TableRow key={agent.id} onClick={() => handleOpenProfile(agent)} style={{ cursor: 'pointer' }}>
                <TableCell>
                  <Avatar src={agent.profileImage} alt={agent.name} />
                </TableCell>
                <TableCell>{agent.agentName}</TableCell>
                <TableCell>{agent.agentEmail}</TableCell>
                <TableCell>{agent.agentPhoneNumber}</TableCell>
                <TableCell>
                  <Typography color={agent.status === 'active' ? 'success.main' : 'error.main'}>
                    {agent.status}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Button variant="contained" color="primary" onClick={(e) => { e.stopPropagation(); handleEdit(agent); }}>
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color={agent.status === 'active' ? 'error' : 'success'}
                    onClick={() => handleStatusToggle(agent.id, agent.status)}
                  >
                    {agent.status === 'active' ? 'Deactivate' : 'Activate'}
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
        count={agents.length}
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
            {selectedAgent ? (
              <>
                <Typography variant="h6" component="h2" gutterBottom>
                  {selectedAgent.name}&apos;s Profile
                </Typography>
                <Box display="flex" flexDirection="column" gap={2}>
                  <Avatar src={selectedAgent.profileImage} alt={selectedAgent.name} style={{ width: 100, height: 100, alignSelf: 'center' }} />
                  <Typography><strong>Name:</strong> {selectedAgent.AgentName}</Typography>
                  <Typography><strong>Email:</strong> {selectedAgent.AgentEmail}</Typography>
                  <Typography><strong>Contact:</strong> {selectedAgent.agentPhoneNumber}</Typography>
                  <Typography variant="body2" color="textSecondary" align="right">
                    Created: {selectedAgent.createdDate}<br />
                    Updated: {selectedAgent.updatedDate}
                  </Typography>
                  <Divider />
                  <Box display="flex" justifyContent="flex-end" gap={2}>
                    <Button variant="outlined" color="primary" startIcon={<EditIcon />} onClick={() => handleEdit(selectedAgent)}>
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
                  {editableAgent ? 'Edit Agent' : 'Add Agent'}
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
                  <Avatar src={editableAgent ? editableAgent.profileImage : newAgent.profileImage} alt="Profile Image" />
                  <TextField
                    label="Name"
                    variant="outlined"
                    size="small"
                    value={editableAgent ? editableAgent.name : newAgent.agentName}
                    onChange={(e) => editableAgent ?
                      setEditableAgent({ ...editableAgent, name: e.target.value }) :
                      setNewAgent({ ...newAgent, agentName: e.target.value })}
                  />
                  <TextField
                    label="Email"
                    variant="outlined"
                    size="small"
                    value={editableAgent ? editableAgent.email : newAgent.agentEmail}
                    onChange={(e) => editableAgent ?
                      setEditableAgent({ ...editableAgent, email: e.target.value }) :
                      setNewAgent({ ...newAgent, agentEmail: e.target.value })}
                  />
                  <TextField
                    label="Contact"
                    variant="outlined"
                    size="small"
                    value={editableAgent ? editableAgent.contact : newAgent.agentPhoneNumber}
                    onChange={(e) => editableAgent ?
                      setEditableAgent({ ...editableAgent, contact: e.target.value }) :
                      setNewAgent({ ...newAgent, agentPhoneNumber: e.target.value })}
                  />
                  <Typography variant="body2" color="textSecondary" align="right">
                    Created: {editableAgent ? editableAgent.createdDate : newAgent.createdDate}<br />
                    Updated: {editableAgent ? editableAgent.updatedDate : newAgent.updatedDate}
                  </Typography>
                  <Divider />
                  <Box display="flex" justifyContent="flex-end" gap={2}>
                    <Button variant="contained" color="primary" onClick={editableAgent ? handleUpdateAgent : postNewAgent}>
                      {editableAgent ? 'Update' : 'Create'}
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
            {selectedAgent && (
              <>
                <Typography variant="h6" component="h2" gutterBottom>
                  {selectedAgent.name}'s Profile
                </Typography>
                <Box display="flex" flexDirection="column" gap={2}>
                  <Avatar src={selectedAgent.profileImage} alt={selectedAgent.name} style={{ width: 100, height: 100, alignSelf: 'center' }} />
                  <Typography><strong>Name:</strong> {selectedAgent.name}</Typography>
                  <Typography><strong>Email:</strong> {selectedAgent.email}</Typography>
                  <Typography><strong>Contact:</strong> {selectedAgent.contact}</Typography>
                  <Typography><strong>Status:</strong> {selectedAgent.status}</Typography>
                  <Typography variant="body2" color="textSecondary" align="right">
                    Created: {selectedAgent.createdDate}<br />
                    Updated: {selectedAgent.updatedDate}
                  </Typography>
                  <Divider />
                  <Box display="flex" justifyContent="flex-end" gap={2}>
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

export default Agent;
