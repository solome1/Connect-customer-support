import React, { useState } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Grid,
  TextField,
  Autocomplete,
  FormControl,
  FormLabel,
  Switch,
  List,
  ListItem,
  ListItemText,
  Card,
  CardContent,
  Chip,
  Snackbar,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const PermissionsAndRoles = () => {
  const [roles, setRoles] = useState([
    { id: 1, name: 'Admin', permissions: ['manage_users', 'view_reports'] },
    { id: 2, name: 'Agent', permissions: ['view_tickets', 'respond_to_tickets'] },
    { id: 3, name: 'Manager', permissions: ['view_reports', 'escalate_tickets'] },
  ]);

  return (
    <div>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Permissions and Roles</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {roles.map((role) => (
            <div key={role.id}>
              <Typography variant="h6">{role.name}</Typography>
              <FormControl>
                <FormLabel>Permissions</FormLabel>
                <RadioGroup
                  value={role.permissions.join(',')}
                  onChange={(e) => {
                    const permissions = e.target.value.split(',');
                    setRoles(
                      roles.map((r) =>
                        r.id === role.id ? { ...r, permissions } : r
                      )
                    );
                  }}
                >
                  {['manage_users', 'view_reports', 'view_tickets', 'respond_to_tickets', 'escalate_tickets'].map(
                    (permission) => (
                      <FormControlLabel
                        key={permission}
                        value={permission}
                        control={<Radio />}
                        label={permission}
                      />
                    )
                  )}
                </RadioGroup>
              </FormControl>
            </div>
          ))}
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

const OrganizationSettings = () => {
  const [orgSettings, setOrgSettings] = useState({
    name: 'Acme Inc.',
    timezone: 'America/New_York',
    language: 'en-US',
    enableTicketAutomation: true,
    enableEmailIntegration: false,
  });

  const handleSettingsChange = (setting, value) => {
    setOrgSettings({ ...orgSettings, [setting]: value });
  };

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>Organization Settings</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <TextField
          label="Organization Name"
          value={orgSettings.name}
          onChange={(e) => handleSettingsChange('name', e.target.value)}
        />
        <Autocomplete
          options={['America/New_York', 'Europe/London', 'Asia/Tokyo']}
          value={orgSettings.timezone}
          onChange={(_, value) => handleSettingsChange('timezone', value)}
          renderInput={(params) => (
            <TextField {...params} label="Timezone" variant="outlined" />
          )}
        />
        <Autocomplete
          options={['en-US', 'es-ES', 'fr-FR']}
          value={orgSettings.language}
          onChange={(_, value) => handleSettingsChange('language', value)}
          renderInput={(params) => (
            <TextField {...params} label="Language" variant="outlined" />
          )}
        />
        <FormControl>
          <FormLabel>Ticket Automation</FormLabel>
          <Switch
            checked={orgSettings.enableTicketAutomation}
            onChange={(e) => handleSettingsChange('enableTicketAutomation', e.target.checked)}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Email Integration</FormLabel>
          <Switch
            checked={orgSettings.enableEmailIntegration}
            onChange={(e) => handleSettingsChange('enableEmailIntegration', e.target.checked)}
          />
        </FormControl>
      </AccordionDetails>
    </Accordion>
  );
};

const ReportingAndAnalytics = () => {
  const [reports, setReports] = useState([
    { id: 1, name: 'Ticket Resolution Times', description: 'Avg. time to resolve tickets' },
    { id: 2, name: 'Agent Productivity', description: 'Tickets handled per agent' },
    { id: 3, name: 'Customer Satisfaction', description: 'CSAT scores and trends' },
  ]);

  const [selectedReport, setSelectedReport] = useState(null);

  const handleReportSelect = (report) => {
    setSelectedReport(report);
  };

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>Reporting and Analytics</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <List>
              {reports.map((report) => (
                <ListItem
                  key={report.id}
                  button
                  selected={selectedReport?.id === report.id}
                  onClick={() => handleReportSelect(report)}
                >
                  <ListItemText primary={report.name} secondary={report.description} />
                </ListItem>
              ))}
            </List>
          </Grid>
          <Grid item xs={8}>
            {selectedReport ? (
              <Card>
                <CardContent>
                  <Typography variant="h5">{selectedReport.name}</Typography>
                  <Typography variant="body1">{selectedReport.description}</Typography>
                  {/* Render report visualization or data here */}
                </CardContent>
              </Card>
            ) : (
              <Typography>Select a report to view</Typography>
            )}
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};

const NotificationsAndAlerts = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'New Ticket Assigned', description: 'Ticket #123 assigned to you' },
    { id: 2, title: 'Ticket Escalated', description: 'Ticket #456 has been escalated' },
    { id: 3, title: 'Customer Feedback', description: 'New feedback received from customer' },
  ]);

  const [open, setOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const handleAlertOpen = (message) => {
    setAlertMessage(message);
    setOpen(true);
  };

  const handleAlertClose = () => {
    setOpen(false);
  };

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>Notifications and Alerts</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <List>
          {notifications.map((notification) => (
            <ListItem key={notification.id}>
              <ListItemText
                primary={notification.title}
                secondary={notification.description}
              />
              <Chip
                label="Alert"
                color="error"
                onClick={() => handleAlertOpen(notification.description)}
              />
            </ListItem>
          ))}
        </List>
        <Snackbar
          open={open}
        autoHideDuration={6000}
        onClose={handleAlertClose}
        message={alertMessage}
        action={
          <React.Fragment>
            <Button color="secondary" size="small" onClick={handleAlertClose}>
              CLOSE
            </Button>
          </React.Fragment>
        }
      />
    </AccordionDetails>
  </Accordion>
);
};

const CustomerSupportDashboard = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <PermissionsAndRoles />
      </Grid>
      <Grid item xs={12}>
        <OrganizationSettings />
      </Grid>
      <Grid item xs={12}>
        <ReportingAndAnalytics />
      </Grid>
      <Grid item xs={12}>
        <NotificationsAndAlerts />
      </Grid>
    </Grid>
  );
};

export default CustomerSupportDashboard;