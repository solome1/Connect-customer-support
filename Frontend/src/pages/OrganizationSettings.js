import React, { useState } from 'react';
import {
  Grid,
  Button,
  Card,
  CardContent,
  CardActions,
  TextField,
  InputAdornment,
  IconButton,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Pagination,
  Checkbox,
  Modal,
  Box,
  Typography,
  Link
} from '@mui/material';

const OrganizationSettings = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [organizations, setOrganizations] = useState([
    // dummy data
    { id: 1, name: 'ABC Corp', domain: 'abc.com', dateCreated: new Date().toISOString() },
    { id: 2, name: 'EF Inc', domain: 'ef.com', dateCreated: new Date().toISOString() },
    { id: 3, name: 'GHI Ltd', domain: 'ghi.com', dateCreated: new Date().toISOString() },
    //...
  ]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedOrganizations, setSelectedOrganizations] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [newOrganization, setNewOrganization] = useState({ name: '', domain: '' });

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCreateOrganization = () => {
    setOpenModal(true);
  };

  const handleEditOrganization = (organizationId) => {
    // implement edit organization logic
  };

  const handleDeleteOrganization = (organizationId) => {
    setOrganizations((prevOrganizations) =>
      prevOrganizations.filter((organization) => organization.id!== organizationId)
    );
  };

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      const selected = {};
      organizations.forEach((organization) => {
        selected[organization.id] = true;
      });
      setSelectedOrganizations(selected);
    } else {
      setSelectedOrganizations({});
    }
  };

  const handleSelectOrganization = (organizationId, event) => {
    setSelectedOrganizations((prevSelected) => ({
     ...prevSelected,
      [organizationId]: event.target.checked,
    }));
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(event.target.value);
  };

  const filteredOrganizations = organizations.filter((organization) => {
    return (
      organization.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      organization.domain.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const sortedOrganizations = filteredOrganizations.sort((a, b) => {
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return a.dateCreated - b.dateCreated;
  });

  const paginatedOrganizations = sortedOrganizations.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handleModalClose = () => {
    setOpenModal(false);
  };

  const handleModalSubmit = () => {
    const newOrg = {...newOrganization, id: Math.max(...organizations.map((org) => org.id)) + 1, dateCreated: new Date().toISOString() };
    setOrganizations((prevOrganizations) => [...prevOrganizations, newOrg]);
    setOpenModal(false);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={8}>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Search organizations"
                  value={searchTerm}
                  onChange={handleSearch}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton>
                          <i className="fas fa-search" />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={4}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleCreateOrganization}
                >
                  Create Organization
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      indeterminate={
                        Object.keys(selectedOrganizations).length > 0 &&
                        Object.keys(selectedOrganizations).length<
                        organizations.length
                      }
                      checked={
                        Object.keys(selectedOrganizations).length ===
                        organizations.length
                      }
                      onChange={handleSelectAll}
                    />
                  </TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Domain</TableCell>
                  <TableCell>Date Created</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedOrganizations.map((organization) => (
                  <TableRow key={organization.id}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedOrganizations[organization.id]}
                        onChange={(event) =>
                          handleSelectOrganization(organization.id, event)
                        }
                      />
                    </TableCell>
                    <TableCell> 
                      <Link
                        href={`/Organization/${organization.id}`}
                        underline="none"
                      >
                        {organization.name}
                      </Link>
                      </TableCell>
                    <TableCell>{organization.domain}</TableCell>
                    <TableCell>{new Date(organization.dateCreated).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleEditOrganization(organization.id)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handleDeleteOrganization(organization.id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardActions>

            {Object.keys(selectedOrganizations).length > 0 && (
              <Button
                variant="contained"
                color="secondary"
                onClick={() => {
                  // implement bulk delete logic
                }}
              >
                Delete Selected
              </Button>
            )}
          </CardActions>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Pagination
          count={Math.ceil(filteredOrganizations.length / rowsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
      </Grid>
      <Modal
        open={openModal}
        onClose={handleModalClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-title" variant="h6" component="h2">
            Create Organization
          </Typography>
          <Typography id="modal-description" sx={{ mt: 2 }}>
            <TextField
              fullWidth
              variant="outlined"
              label="Name"
              value={newOrganization.name}
              onChange={(event) =>
                setNewOrganization({ ...newOrganization, name: event.target.value })
              }
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              variant="outlined"
              label="Domain"
              value={newOrganization.domain}
              onChange={(event) =>
                setNewOrganization({ ...newOrganization, domain: event.target.value })
              }
              sx={{ mb: 2 }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleModalSubmit}
            >
              Create
            </Button>
          </Typography>
        </Box>
      </Modal>
    </Grid >
  );
};

export default OrganizationSettings;