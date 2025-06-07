import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Card,
  Typography,
  Button,
  Box,
} from '@mui/material';
import {
  Emergency as EmergencyIcon,
  Store as StoreIcon,
  Security as SecurityIcon,
  Support as SupportIcon,
} from '@mui/icons-material';

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: 'Emergency SOS',
      description: 'Quick access to emergency services and support network',
      icon: <EmergencyIcon sx={{ fontSize: 40 }} color="error" />,
      path: '/emergency',
      color: '#ffebee',
    },
    {
      title: 'Resource Marketplace',
      description: 'Share and exchange resources within the military community',
      icon: <StoreIcon sx={{ fontSize: 40 }} color="primary" />,
      path: '/marketplace',
      color: '#e3f2fd',
    },
    {
      title: 'Support Network',
      description: 'Connect with other military families and support groups',
      icon: <SupportIcon sx={{ fontSize: 40 }} color="secondary" />,
      path: '/support',
      color: '#f3e5f5',
    },
  ];

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          pt: 8,
          pb: 6,
          textAlign: 'center',
        }}
      >
        <Typography
          component="h1"
          variant="h2"
          color="primary"
          gutterBottom
          sx={{ fontWeight: 'bold' }}
        >
          Welcome to Sainik Setu
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph>
          Your comprehensive platform for military welfare management and community support
        </Typography>
      </Box>

      <Grid container spacing={4} sx={{ mb: 8 }}>
        
        {features.map((feature) => (
          <Grid item xs={12} sm={6} md={4} key={feature.title}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: '0.3s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: 3,
                },
                backgroundColor: feature.color,
              }}
            >
              <Box
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 2,
                }}
              >
                {feature.icon}
                <Typography gutterBottom variant="h5" component="h2" align="center">
                  {feature.title}
                </Typography>
              </Box>
              <Box sx={{ p: 2, flexGrow: 1 }}>
                <Typography align="center" color="text.secondary">
                  {feature.description}
                </Typography>
              </Box>
              <Box sx={{ p: 2 }}>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => navigate(feature.path)}
                >
                  Access Now
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Sainik Set - Military Welfare Platform
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Supporting our military families with digital solutions
        </Typography>
      </Box>
    </Container>
  );
};

export default Home; 