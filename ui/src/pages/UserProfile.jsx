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
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import LoadingCircle from '../dashboard/components/LoadingCircle';
import { useGetUserProfileByIdSlugQuery, useUpdateUserProfileMutation } from '../apiSlice';

const securityQuestions = [
  { key: 'first_pet', label: 'What was the name of your first pet?' },
  { key: 'mother_maiden', label: "What is your mother's maiden name?" },
  { key: 'birth_city', label: 'In which city were you born?' },
  { key: 'first_school', label: 'What was the name of your first school?' },
  { key: 'favorite_teacher', label: 'Who was your favorite teacher?' },
  { key: 'childhood_friend', label: 'What is the name of your best childhood friend?' },
  { key: 'first_car', label: 'What was the make and model of your first car?' },
  { key: 'favorite_place', label: 'What is your favorite vacation spot?' },
  { key: 'parents_met', label: 'In which city did your parents meet?' },
  { key: 'childhood_hero', label: 'Who was your childhood hero?' },
];

const UserProfile = () => {
  const { data: user, isLoading, error } = useGetUserProfileByIdSlugQuery();
  console.log('user: ', user);
  const [updateUserProfile] = useUpdateUserProfileMutation();
  const [editMode, setEditMode] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    city: '',
    country: '',
    security_question: '',
    security_answer: '',
    summery: '',
    avatar: '', // URL or local preview
  });
  const [avatarPreview, setAvatarPreview] = useState('');
  useEffect(() => {
    if (user) {
      setFormData({
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        email: user.email || '',
        phone_number: user.phone_number || '',
        city: user.city || '',
        country: user.country || '',
        security_question: user.security_question || '',
        security_answer: user.security_answer || '',
        summery: user.summery || '',
        address2: user.address2 || '',
        avatar: user.profile_image || '',
      });
      setAvatarPreview(user.profile_image || '');
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
        setFormData((prev) => ({ ...prev, avatar: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

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

  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '80vh',
        }}
      >
        <LoadingCircle />
      </Box>
    );
  }
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
              <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }} >
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
              <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }} >
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
              <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                <TextField fullWidth label="Email" name="email" value={formData.email} variant="filled" disabled />
              </Grid>
              <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }} >
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
              <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }} >
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
              <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }} >
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
              <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }} >
                {editMode ? (
                  <FormControl fullWidth variant="filled">
                    <InputLabel id="security-question-label">Security Question</InputLabel>
                    <Select
                      labelId="security-question-label"
                      name="security_question"
                      value={formData.security_question}
                      onChange={handleInputChange}
                      label="Security Question"
                    >
                      {securityQuestions.map((question) => (
                        <MenuItem key={question.key} value={question.key}>
                          {question.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                ) : (
                  // If not editing, you may want to display the friendly label instead of the key.
                  <TextField
                    fullWidth
                    label="Security Question"
                    name="security_question"
                    value={
                      securityQuestions.find(
                        (q) => q.key === formData.security_question
                      )?.label || formData.security_question
                    }
                    variant="filled"
                    disabled
                  />
                )}
              </Grid>

              <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }} >
                <TextField
                  fullWidth
                  label="Security Answer"
                  name="security_answer"
                  value={formData.security_answer}
                  onChange={handleInputChange}
                  disabled={!editMode}
                  variant="filled"
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
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
                <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                  <Button variant="outlined" component="label">
                    Upload Avatar
                    <input type="file" accept="image/*" hidden onChange={handleAvatarChange} />
                  </Button>
                </Grid>
              )}
              <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
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
      </Box >
      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container >
  );
};

export default UserProfile;
