import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import {
  TextField,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Box,
  Alert,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import LoadingCircle from '../dashboard/components/LoadingCircle';
import {
  useCreatePostMutation,
  useGetCategoriesQuery,
  useGetTagsQuery,
  useUploadImageMutation,
} from '../apiSlice';
import Editor from './editor/Editor';
import { useAutosave, getAutosavedFormState } from './components/useAutosave'; // Adjust the path as necessary

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

function PostCreate() {
  const storagePrefix = 'post_create_';
  const [blogTitle, setBlogTitle] = useState('');
  const [editorContent, setEditorContent] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [featuredImage, setFeaturedImage] = useState(null);
  const [keywords, setKeywords] = useState('');
  const [formError, setFormError] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [status, setStatus] = useState('draft');

  const theme = useTheme();
  const navigate = useNavigate();

  // RTK Query hooks
  const { data: categories, isLoading: categoriesLoading } = useGetCategoriesQuery();
  const { data: tags, isLoading: tagsLoading } = useGetTagsQuery();
  const [createPost, { isLoading: isSubmitting }] = useCreatePostMutation();
  const [uploadImage] = useUploadImageMutation();

  // On mount, load autosaved data from localStorage
  useEffect(() => {
    const savedData = getAutosavedFormState(storagePrefix, [
      'title',
      'content',
      'category',
      'tags',
      'keywords',
      'status',
    ]);
    if (savedData.title) setBlogTitle(savedData.title);
    if (savedData.content) setEditorContent(savedData.content);
    if (savedData.category) setSelectedCategory(savedData.category);
    if (savedData.tags) setSelectedTags(savedData.tags);
    if (savedData.keywords) setKeywords(savedData.keywords);
    if (savedData.status) setStatus(savedData.status);
  }, [storagePrefix]);

  // Consolidate form state for autosave
  const formState = { 
    title: blogTitle, 
    content: editorContent, 
    category: selectedCategory, 
    tags: selectedTags, 
    keywords, 
    status 
  };

  // Autosave form state with debouncing (using our custom hook)
  useAutosave(storagePrefix, formState);

  // Handler functions
  const onEditorChange = useCallback((content) => {
    setEditorContent(content);
  }, []);

  const handleImageChange = useCallback((e) => {
    const file = e.target.files[0];
    if (file) {
      setFeaturedImage(file);
      // Generate image preview
      setImagePreview(URL.createObjectURL(file));
    }
  }, []);

  const validateForm = () => {
    if (!blogTitle) {
      setFormError('Title is required.');
      return false;
    }
    if (!editorContent || editorContent === '<p></p>') {
      setFormError('Content is required.');
      return false;
    }
    if (!selectedCategory) {
      setFormError('Category is required.');
      return false;
    }
    if (!selectedTags || selectedTags.length < 1) {
      setFormError('At least three tags are required.');
      return false;
    }
    if (!keywords) {
      setFormError('Keywords are required.');
      return false;
    }
    if (!status) {
      setFormError('Status is required.');
      return false;
    }
    setFormError('');
    return true;
  };

  const clearLocalStorage = () => {
    ['title', 'content', 'category', 'tags', 'keywords', 'status'].forEach(key =>
      localStorage.removeItem(`${storagePrefix}${key}`)
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    const formData = new FormData();
    formData.append('title', blogTitle);
    formData.append('content', editorContent);
    formData.append('category', selectedCategory);
    selectedTags.forEach(tagId => formData.append('tags', tagId));
    if (featuredImage) formData.append('featured_image', featuredImage);
    formData.append('keywords', keywords);
    formData.append('status', status);

    try {
      await createPost(formData).unwrap();
      clearLocalStorage();
      navigate('/dashboard');
    } catch (error) {
      console.error('Error creating post:', error);
      setFormError(`Failed to create post: ${error.message || 'Unknown error'}`);
    }
  };

  const uploadImageCallBack = async (file) => {
    try {
      const formData = new FormData();
      formData.append('image', file);
      const response = await uploadImage(formData).unwrap();
      if (response && response.url) {
        return { data: { link: response.url } };
      }
      throw new Error('Failed to upload image');
    } catch (error) {
      console.error('Error uploading image:', error);
      return null;
    }
  };

  if (categoriesLoading || tagsLoading) {
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

  return (
    <>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12 }}>
          <Typography variant="h4" gutterBottom>
            Create Post
          </Typography>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, sm: 12, md: 9, lg: 9 }}>
                <TextField
                  fullWidth
                  variant="filled"
                  label="Title"
                  value={blogTitle}
                  onChange={(e) => setBlogTitle(e.target.value)}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 12, md: 3, lg: 3 }}>
                <Button
                  component="label"
                  variant="contained"
                  fullWidth
                  sx={{ padding: '16px 24px', maxHeight: '70px' }}
                >
                  {featuredImage ? 'Image selected' : 'Upload Featured Image'}
                  <VisuallyHiddenInput
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </Button>
              </Grid>

              <Grid size={{ xs: 12 }}>
                <Box sx={{ border: '1px solid #ccc', borderRadius: 2, overflow: 'hidden', p: 1 }}>
                  <Editor
                    value={editorContent}
                    onChange={onEditorChange}
                    uploadImage={uploadImageCallBack}
                  />
                </Box>
              </Grid>

              <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                <FormControl variant="filled" fullWidth>
                  <InputLabel id="category-label">Category</InputLabel>
                  <Select
                    labelId="category-label"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    {categories?.map((cat) => (
                      <MenuItem key={cat.id} value={cat.id}>
                        {cat.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                <FormControl variant="filled" fullWidth>
                  <InputLabel id="status-label">Status</InputLabel>
                  <Select
                    labelId="status-label"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <MenuItem value="draft">Draft</MenuItem>
                    <MenuItem value="pending">Pending</MenuItem>
                    <MenuItem value="published">Published</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                <FormControl variant="filled" fullWidth>
                  <InputLabel id="tags-label">Tags</InputLabel>
                  <Select
                    labelId="tags-label"
                    multiple
                    value={selectedTags}
                    onChange={(e) => setSelectedTags(e.target.value)}
                    renderValue={(selected) => (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => {
                          const tag = tags?.find((t) => t.id === value);
                          return (
                            <Chip
                              key={value}
                              label={tag ? tag.name : value}
                              sx={{
                                backgroundColor: `hsl(${Math.floor(Math.random() * 360)}, 70%, 85%)`,
                                borderRadius: 2,
                              }}
                            />
                          );
                        })}
                      </Box>
                    )}
                  >
                    {tags?.map((tag) => (
                      <MenuItem key={tag.id} value={tag.id}>
                        {tag.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                <TextField
                  multiline
                  variant="filled"
                  fullWidth
                  label="Keywords (comma-separated)"
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                />
              </Grid>

              {formError && (
                <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                  <Alert severity="error" sx={{ borderRadius: 2 }}>
                    {formError}
                  </Alert>
                </Grid>
              )}

              <Grid size={{ xs: 12 }} container spacing={2} justifyContent="flex-end">
                <Grid>
                  <Button
                    variant="outlined"
                    onClick={() => setPreviewOpen(true)}
                    sx={{ borderRadius: 2 }}
                  >
                    Preview
                  </Button>
                </Grid>
                <Grid>
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={isSubmitting}
                    sx={{ borderRadius: 2 }}
                  >
                    {isSubmitting ? 'Creating...' : 'Create Post'}
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>

      <Dialog open={previewOpen} onClose={() => setPreviewOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>{blogTitle}</DialogTitle>
        <DialogContent dividers>
          <div dangerouslySetInnerHTML={{ __html: editorContent }} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPreviewOpen(false)} variant="outlined" sx={{ borderRadius: 2 }}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default PostCreate;
