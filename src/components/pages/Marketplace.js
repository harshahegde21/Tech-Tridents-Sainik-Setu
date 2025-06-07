import React, { useState } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Fab,
  IconButton,
  InputAdornment,
} from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon,
  Message as MessageIcon,
  Phone as PhoneIcon,
  Category as CategoryIcon,
} from '@mui/icons-material';
import { toast } from 'react-toastify';

const Marketplace = () => {
  const [items, setItems] = useState([
    {
      id: 1,
      title: 'Military Books Collection',
      category: 'Books',
      description: 'Collection of military strategy and history books',
      price: 1200,
      image: 'https://via.placeholder.com/300x200',
      contact: '9876543210',
    },
    {
      id: 2,
      title: 'Army Gear',
      category: 'Equipment',
      description: 'Gently used military gear in excellent condition',
      price: 3500,
      image: 'https://via.placeholder.com/300x200',
      contact: '9876543211',
    },
    {
      id: 3,
      title: 'Family Quarters',
      category: 'Housing',
      description: '3BHK available for 6 months',
      price: 15000,
      image: 'https://via.placeholder.com/300x200',
      contact: '9876543212',
    },
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [newItem, setNewItem] = useState({
    title: '',
    category: '',
    description: '',
    price: '',
    image: '',
    contact: '',
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Books', 'Equipment', 'Housing', 'Uniforms', 'Others'];

  const handleAddItem = () => {
    if (!newItem.title || !newItem.category || !newItem.price || !newItem.contact) {
      toast.error('Please fill in all required fields');
      return;
    }

    const item = {
      id: items.length + 1,
      ...newItem,
      image: newItem.image || 'https://via.placeholder.com/300x200',
    };

    setItems([...items, item]);
    setNewItem({
      title: '',
      category: '',
      description: '',
      price: '',
      image: '',
      contact: '',
    });
    setOpenDialog(false);
    toast.success('Item listed successfully!');
  };

  const handleContactSeller = (contact) => {
    window.location.href = `tel:${contact}`;
  };

  const handleMessage = (contact) => {
    window.location.href = `sms:${contact}`;
  };

  const filteredItems = items.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4" component="h1">
          Resource Marketplace
        </Typography>
        <Fab
          color="primary"
          aria-label="add"
          onClick={() => setOpenDialog(true)}
        >
          <AddIcon />
        </Fab>
      </Box>

      <Box display="flex" gap={2} mb={4}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search items..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Category</InputLabel>
          <Select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            label="Category"
          >
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Grid container spacing={3}>
        {filteredItems.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Card elevation={3}>
              <CardMedia
                component="img"
                height="200"
                image={item.image}
                alt={item.title}
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  {item.title}
                </Typography>
                <Box display="flex" alignItems="center" gap={1} mb={1}>
                  <CategoryIcon color="action" fontSize="small" />
                  <Typography variant="body2" color="text.secondary">
                    {item.category}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {item.description}
                </Typography>
                <Typography variant="h6" color="primary" gutterBottom>
                  ₹{item.price}
                </Typography>
                <Box display="flex" gap={1}>
                  <Button
                    variant="contained"
                    startIcon={<PhoneIcon />}
                    onClick={() => handleContactSeller(item.contact)}
                  >
                    Call
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<MessageIcon />}
                    onClick={() => handleMessage(item.contact)}
                  >
                    Message
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>List New Item</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ mt: 2 }} display="flex" flexDirection="column" gap={2}>
            <TextField
              fullWidth
              label="Title"
              value={newItem.title}
              onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
              required
            />
            <FormControl fullWidth required>
              <InputLabel>Category</InputLabel>
              <Select
                value={newItem.category}
                onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                label="Category"
              >
                {categories.slice(1).map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="Description"
              multiline
              rows={3}
              value={newItem.description}
              onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
            />
            <TextField
              fullWidth
              label="Price"
              type="number"
              value={newItem.price}
              onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
              required
            />
            <TextField
              fullWidth
              label="Image URL"
              value={newItem.image}
              onChange={(e) => setNewItem({ ...newItem, image: e.target.value })}
            />
            <TextField
              fullWidth
              label="Contact Number"
              value={newItem.contact}
              onChange={(e) => setNewItem({ ...newItem, contact: e.target.value })}
              required
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleAddItem} variant="contained">
            List Item
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Marketplace; 