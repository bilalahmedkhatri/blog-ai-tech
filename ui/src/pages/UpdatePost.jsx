import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useTheme,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import LoadingCircle from '../dashboard/components/LoadingCircle';
import {
  useGetPostByIdQuery,
  useUpdatePostMutation,
  useGetCategoriesQuery,
  useGetTagsQuery,
  useUploadImageMutation,
} from '../apiSlice';
import Editor from '../dashboard/editor/Editor';

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

function PostUpdate() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();

  // Local state for form fields
  const [blogTitle, setBlogTitle] = useState('');
  const [editorContent, setEditorContent] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [featuredImage, setFeaturedImage] = useState(null);
  const [keywords, setKeywords] = useState('');
  const [status, setStatus] = useState('draft');
  const [formError, setFormError] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [previewOpen, setPreviewOpen] = useState(false);

  // RTK Query hooks
  const { data: postData, isLoading: isPostLoading } = useGetPostByIdQuery(slug);
  const { data: categories, isLoading: categoriesLoading } = useGetCategoriesQuery();
  const { data: tags, isLoading: tagsLoading } = useGetTagsQuery();
  const [updatePost, { error: updateError, isLoading: isUpdating,  }] = useUpdatePostMutation();
  const [uploadImage] = useUploadImageMutation();

  // Load post data into state for editing
  useEffect(() => {
    if (postData) {
      setBlogTitle(postData.title || '');
      setEditorContent(postData.content || '');
      setSelectedCategory(postData.category?.id || '');

      if (Array.isArray(postData.tags)) {
        const tagIds = postData.tags.map(tag =>
          typeof tag === 'object' ? tag.id : tag
        );
        setSelectedTags(tagIds);
      }

      if (Array.isArray(postData.keywords)) {
        setKeywords(postData.keywords.join(', '));
      } else if (typeof postData.keywords === 'string') {
        setKeywords(postData.keywords);
      }

      setStatus(postData.status || 'draft');

      if (postData.featured_image) {
        setImagePreview(postData.featured_image);
      }
    }
  }, [postData]);

  // Handlers
  const onEditorChange = useCallback((content) => {
    setEditorContent(content);
  }, []);

  const handleImageChange = useCallback((e) => {
    const file = e.target.files[0];
    if (file) {
      setFeaturedImage(file);
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
      setFormError('At least one tag are required.');
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    const formData = new FormData();
    formData.append('title', blogTitle);
    formData.append('content', editorContent);
    formData.append('category', selectedCategory);
    selectedTags.forEach(tagId => formData.append('tags', tagId));
    if (featuredImage) {
      formData.append('featured_image', featuredImage);
    }
    formData.append('keywords', keywords);
    formData.append('status', status);

    try {
      const formDataObj = {};
      for (const [key, value] of formData.entries()) {
        if (key === 'tags') {
          if (!formDataObj[key]) {
            formDataObj[key] = [];
          }
          formDataObj[key].push(value);
        } else {
          formDataObj[key] = value;
        }
      }
      await updatePost({ slug, formData }).unwrap();
      navigate('/dashboard');
    } catch (error) {
      if (error.data.title) {
        setFormError(error.data.title[0]);
      } else if (error.data.content) {
        setFormError(error.data.content[0]);
      } else if (error.data.category) {
        setFormError(error.data.category);
      } else if (error.data.tags) {
        setFormError(error.data.tags);
      } else if (error.data.featured_image) {
        setFormError(error.data.featured_image);
      } else if (error.data.keywords) {
        setFormError(error.data.keywords);
      } else if (error.data.status) {
        setFormError(error.data.status);
      } else {
        setFormError('Failed to create post. Please try again.');
      }
      console.error('Error creating post:', error);
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

  if (isPostLoading || categoriesLoading || tagsLoading) {
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
            Update Post
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
                    disabled={isUpdating}
                    sx={{ borderRadius: 2 }}
                  >
                    {isUpdating ? 'Updating...' : 'Update Post'}
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

export default PostUpdate;
