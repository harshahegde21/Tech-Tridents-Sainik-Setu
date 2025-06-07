import React, { useState } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
} from '@mui/material';
import {
  LocalHospital,
  LocalPolice,
  Phone,
  Message,
  LocationOn,
  Emergency as EmergencyIcon,
} from '@mui/icons-material';
import { toast } from 'react-toastify';

const Emergency = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedEmergency, setSelectedEmergency] = useState(null);

  const emergencyContacts = [
    { name: 'Military Medical Center', phone: '1800-XXX-XXX1', type: 'medical' },
    { name: 'Military Police', phone: '1800-XXX-XXX2', type: 'security' },
    { name: 'Family Support Center', phone: '1800-XXX-XXX3', type: 'support' },
    { name: 'Emergency Response Team', phone: '1800-XXX-XXX4', type: 'emergency' },
  ];

  const handleSOS = () => {
    // In a real application, this would trigger emergency alerts
    toast.success('SOS Alert sent! Emergency services have been notified.');
    // Here you would implement actual emergency notification logic
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log('Location:', position.coords);
        // Send location to emergency services
      },
      (error) => {
        console.error('Error getting location:', error);
        toast.error('Could not get your location. Please call emergency services directly.');
      }
    );
  };

  const handleEmergencySelect = (emergency) => {
    setSelectedEmergency(emergency);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleCall = (phone) => {
    window.location.href = `tel:${phone}`;
  };

  const handleMessage = (phone) => {
    window.location.href = `sms:${phone}`;
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box textAlign="center" mb={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Emergency SOS
        </Typography>
        <Button
          variant="contained"
          color="error"
          size="large"
          startIcon={<EmergencyIcon />}
          onClick={handleSOS}
          sx={{ mb: 4, py: 2, px: 4 }}
        >
          TRIGGER SOS
        </Button>
      </Box>

      <Grid container spacing={3}>
        {emergencyContacts.map((contact) => (
          <Grid item xs={12} sm={6} key={contact.name}>
            <Paper
              elevation={3}
              sx={{
                p: 2,
                cursor: 'pointer',
                '&:hover': { backgroundColor: '#f5f5f5' },
              }}
              onClick={() => handleEmergencySelect(contact)}
            >
              <Box display="flex" alignItems="center">
                <ListItemIcon>
                  {contact.type === 'medical' && <LocalHospital color="error" />}
                  {contact.type === 'security' && <LocalPolice color="primary" />}
                  {contact.type === 'support' && <Message color="success" />}
                  {contact.type === 'emergency' && <EmergencyIcon color="error" />}
                </ListItemIcon>
                <Box ml={2}>
                  <Typography variant="h6">{contact.name}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {contact.phone}
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Contact {selectedEmergency?.name}</DialogTitle>
        <DialogContent>
          <List>
            <ListItem>
              <ListItemIcon>
                <Phone />
              </ListItemIcon>
              <ListItemText primary={selectedEmergency?.phone} />
              <IconButton
                color="primary"
                onClick={() => handleCall(selectedEmergency?.phone)}
              >
                <Phone />
              </IconButton>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Message />
              </ListItemIcon>
              <ListItemText primary="Send Message" />
              <IconButton
                color="primary"
                onClick={() => handleMessage(selectedEmergency?.phone)}
              >
                <Message />
              </IconButton>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <LocationOn />
              </ListItemIcon>
              <ListItemText primary="Share Location" />
              <IconButton color="primary" onClick={handleSOS}>
                <LocationOn />
              </IconButton>
            </ListItem>
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Emergency; 