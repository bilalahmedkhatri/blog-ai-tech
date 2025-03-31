import React, { useState } from 'react';
import Grid from '@mui/material/Grid2';
import Copyright from '../internals/components/Copyright';
import CustomizedDataGrid from './CustomizedDataGrid';

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
  CircularProgress,
  Alert,
  Container,
  useTheme,
  useMediaQuery,
  OutlinedInput
} from '@mui/material';


export default function MianCreatBlogPost() {

  const [title, setTitle] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [featuredImage, setFeaturedImage] = useState(null);
  const [keywords, setKeywords] = useState('');
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  // Generate random light color for chips
  const getRandomLightColor = () => {
    const hue = Math.floor(Math.random() * 360);
    return `hsl(${hue}, 70%, 85%)`;
  };

  const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  };

  const saveContent = React.useCallback(
    debounce((content) => {
      localStorage.setItem('editorContent', JSON.stringify(content));
    }, 1000),
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [categoriesResponse, tagsResponse] = await Promise.all([
          api.getcategory(),
          api.getTags()
        ]);

        // Make sure we're setting the data property from the responses
        setCategories(categoriesResponse.data || []);
        setTags(tagsResponse.data || []);

        const savedContent = localStorage.getItem('editorContent');
        if (savedContent) {
          setEditorState(EditorState.createWithContent(convertFromRaw(JSON.parse(savedContent))));
        }
      } catch (err) {
        setError('Failed to load categories and tags');
        console.error('Error fetching data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);


  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
      {/* cards */}
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Write Article
      </Typography>
      <Grid container spacing={2} columns={12}>
        <Grid size={{ xs: 12, lg: 12 }}>
        <Grid item xs={12}>
          <form >
          {/* <form onSubmit={handleSubmit}> */}
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                />
              </Grid>
              {/* editor area */}
              
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel id="categories-label">Categories</InputLabel>
                  <Select
                    labelId="categories-label"
                    multiple
                    value={selectedCategories}
                    onChange={(e) => setSelectedCategories(e.target.value)}
                    input={<OutlinedInput label="Categories" sx={{ borderRadius: 2 }} />}
                    renderValue={(selected) => (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => {
                          const category = categories.find(c => c.id === value);
                          return (
                            <Chip 
                              key={value} 
                              label={category ? category.name : value}
                              sx={{ 
                                backgroundColor: getRandomLightColor(),
                                borderRadius: 2
                              }}
                            />
                          );
                        })}
                      </Box>
                    )}
                  >
                    {categories.map((cat) => (
                      <MenuItem key={cat.id} value={cat.id}>
                        {cat.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel id="tags-label">Tags</InputLabel>
                  <Select
                    labelId="tags-label"
                    multiple
                    value={selectedTags}
                    onChange={(e) => setSelectedTags(e.target.value)}
                    input={<OutlinedInput label="Tags" sx={{ borderRadius: 2 }} />}
                    renderValue={(selected) => (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => {
                          const tag = tags.find(t => t.id === value);
                          return (
                            <Chip 
                              key={value} 
                              label={tag ? tag.name : value}
                              sx={{ 
                                backgroundColor: getRandomLightColor(),
                                borderRadius: 2
                              }}
                            />
                          );
                        })}
                      </Box>
                    )}
                  >
                    {tags.map((tag) => (
                      <MenuItem key={tag.id} value={tag.id}>
                        {tag.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  ref={fileInputRef}
                  onChange={(e) => setFeaturedImage(e.target.files[0])}
                />
                <Button 
                  variant="outlined" 
                  onClick={() => fileInputRef.current.click()}
                  sx={{ borderRadius: 2 }}
                >
                  Upload Featured Image
                </Button>
                {featuredImage && (
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Selected: {featuredImage.name}
                  </Typography>
                )}
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Keywords (comma-separated)"
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                />
              </Grid>

              <Grid item xs={12}>
                <Button 
                  type="submit" 
                  variant="contained"
                  sx={{ borderRadius: 2 }}
                >
                  Create Post
                </Button>
              </Grid>

              {isLoading && (
                <Grid item xs={12}>
                  <CircularProgress />
                </Grid>
              )}

              {error && (
                <Grid item xs={12}>
                  <Alert severity="error" sx={{ borderRadius: 2 }}>{error}</Alert>
                </Grid>
              )}

              {imagePreview && (
                <Grid item xs={12}>
                  <Box sx={{ mt: 2, maxWidth: 300, borderRadius: 2, overflow: 'hidden' }}>
                    <img
                      src={imagePreview}
                      alt="Preview"
                      style={{ width: '100%', height: 'auto' }}
                    />
                  </Box>
                </Grid>
              )}
            </Grid>
          </form>
        </Grid>
        </Grid>
      </Grid>
      <Copyright sx={{ my: 4 }} />
    </Box>
  );
}
