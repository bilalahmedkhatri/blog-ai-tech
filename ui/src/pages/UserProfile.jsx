import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Button,
  TextField,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Paper,
  Snackbar,
  Alert,
  Grid,
} from '@mui/material';
import { useGetUserProfileByIdSlugQuery, useUpdateUserProfileMutation } from '../apiSlice';

const UserProfile = () => {
  // Query the current user profile data
  const { data: user, isLoading, error } = useGetUserProfileByIdSlugQuery();
  const [updateUserProfile] = useUpdateUserProfileMutation();

  console.log('data', user);

  // Local state for toggling edit mode and storing form data
  const [editMode, setEditMode] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    city: '',
    state: '',
    country: '',
    summery: '',
    avatar: '', // URL or local preview
  });

  // Preview file state for avatar changes
  const [avatarPreview, setAvatarPreview] = useState('');

  // When user data is loaded, initialize the form state
  useEffect(() => {
    if (user) {
      setFormData({
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        email: user.email || '',
        phone_number: user.phone_number || '',
        city: user.city || '',
        state: user.state || '',
        country: user.country || '',
        summery: user.summery || '',
        address2: user.address2 || '',
        avatar: user.profile_image || '',
      });
      setAvatarPreview(user.profile_image || '');
    }
  }, [user]);

  // Handle changes in any form field
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file change for avatar upload and preview it
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // create a local preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
        // Update formData.avatar with the base64 string
        setFormData((prev) => ({ ...prev, avatar: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Save changes by calling the update mutation
  const handleSave = async () => {
    try {
      console.log('form data saving: ', formData)
      await updateUserProfile(formData).unwrap();
      setEditMode(false);
      setSnackbar({ open: true, message: 'Profile updated successfully!', severity: 'success' });
    } catch (err) {
      setSnackbar({ open: true, message: 'Update failed. Please try again.', severity: 'error' });
      console.error('Update failed:', err);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  if (isLoading) return <Typography align="center">Loading...</Typography>;
  if (error) return <Typography align="center">Error loading profile.</Typography>;

  return (
    <Container maxWidth="md">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          User Profile
        </Typography>
        {/* User Avatar Card */}
        <Card sx={{ display: 'flex', mb: 3, alignItems: 'center' }}>
          <CardMedia
            component="img"
            sx={{ maxWidth: 150, height: 150, objectFit: 'cover', borderRadius: '50%', ml: 2, my: 2 }}
            image={avatarPreview || '/placeholder-avatar.png'}
            alt="User Avatar"
          />
          <CardContent>
            <Typography variant="h6">
              {formData.first_name} {formData.last_name}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {formData.email}
            </Typography>
            {formData.phone_number && (
              <Typography variant="body2" color="textSecondary">
                {formData.phone_number}
              </Typography>
            )}
          </CardContent>
        </Card>
        <Paper elevation={3} sx={{ p: 3 }}>
          <Box component="form" noValidate autoComplete="off">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="First Name"
                name="first_name"
                value={formData.first_name}
                onChange={handleInputChange}
                disabled={!editMode}
                variant="filled"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Last Name"
                name="last_name"
                value={formData.last_name}
                onChange={handleInputChange}
                disabled={!editMode}
                variant="filled"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Email" name="email" value={formData.email} variant="filled" disabled />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleInputChange}
                disabled={!editMode}
                variant="filled"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="City"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                disabled={!editMode}
                variant="filled"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="State"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                disabled={!editMode}
                variant="filled"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Country"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                disabled={!editMode}
                variant="filled"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                maxRows={6}
                label="Summery"
                name="summery"
                value={formData.summery}
                onChange={handleInputChange}
                disabled={!editMode}
                variant="filled"
              />
            </Grid>
            {editMode && (
              <Grid item xs={12}>
                <Button variant="outlined" component="label">
                  Upload Avatar
                  <input type="file" accept="image/*" hidden onChange={handleAvatarChange} />
                </Button>
              </Grid>
            )}
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
                {editMode ? (
                  <>
                    <Button variant="contained" onClick={handleSave}>
                      Save
                    </Button>
                    <Button variant="outlined" onClick={() => setEditMode(false)}>
                      Cancel
                    </Button>
                  </>
                ) : (
                  <Button variant="contained" onClick={() => setEditMode(true)}>
                    Edit Profile
                  </Button>
                )}
              </Box>
            </Grid>
          </Grid>
          </Box>
        </Paper>
      </Box>
      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default UserProfile;
