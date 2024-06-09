import React, { useState, useMemo } from 'react';
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
  Link
} from '@mui/material';

const OrganizationSettings = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [organizations, setOrganizations] = useState([
    // Dummy data
    { id: 1, name: 'ABC Corp', email: 'abc@gmail.com', domain: 'abc.com', dateCreated: new Date().toISOString() },
    { id: 2, name: 'EF Inc', email: 'ef@gmail.com', domain: 'ef.com', dateCreated: new Date().toISOString() },
    { id: 3, name: 'GHI Ltd', email: 'ghi@gmail.com', domain: 'ghi.com', dateCreated: new Date().toISOString() },
    // More data...
  ]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedOrganizations, setSelectedOrganizations] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleDeleteOrganization = (organizationId) => {
    setOrganizations((prevOrganizations) =>
      prevOrganizations.filter((organization) => organization.id !== organizationId)
    );
  };

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      const selected = {};
      paginatedOrganizations.forEach((organization) => {
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
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1);
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

  const handleBulkDelete = () => {
    const selectedIds = Object.keys(selectedOrganizations)
      .filter((id) => selectedOrganizations[id])
      .map(Number);
    setOrganizations((prevOrganizations) =>
      prevOrganizations.filter((organization) => !selectedIds.includes(organization.id))
    );
    setSelectedOrganizations({});
  };

  const filteredOrganizations = useMemo(() => {
    return organizations.filter((organization) =>
      organization.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      organization.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      organization.domain.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, organizations]);

  const sortedOrganizations = useMemo(() => {
    return filteredOrganizations.sort((a, b) => {
      if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
      if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
      return new Date(a.dateCreated) - new Date(b.dateCreated);
    });
  }, [filteredOrganizations]);

  const paginatedOrganizations = useMemo(() => {
    return sortedOrganizations.slice(
      (currentPage - 1) * rowsPerPage,
      currentPage * rowsPerPage
    );
  }, [sortedOrganizations, currentPage, rowsPerPage]);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
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
                        Object.keys(selectedOrganizations).length < paginatedOrganizations.length
                      }
                      checked={
                        Object.keys(selectedOrganizations).length ===
                        paginatedOrganizations.length
                      }
                      onChange={handleSelectAll}
                    />
                  </TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
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
                        checked={Boolean(selectedOrganizations[organization.id])}
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
                    <TableCell>
                      <Link
                        href={`/Organization/${organization.id}`}
                        underline="none"
                      >
                        {organization.email}
                      </Link>
                    </TableCell>
                    <TableCell>{organization.domain}</TableCell>
                    <TableCell>{new Date(organization.dateCreated).toLocaleDateString()}</TableCell>
                    <TableCell>
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
                onClick={handleBulkDelete}
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
          {/* Modal Content */}
        </Box>
      </Modal>
    </Grid>
  );
};

export default OrganizationSettings;
