import * as React from 'react';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import {
  useGetPostsQuery,
  useDeletePostMutation,
} from '../../apiSlice';
import { Link, useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import LoadingCircle from '../components/LoadingCircle';
import { Snackbar, Alert, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText, Button } from '@mui/material';
import { getEmailAndName } from '../../tools';

export default function CustomizedDataGrid() {
  const navigate = useNavigate();
  const { data: posts, isLoading, error } = useGetPostsQuery();
  const [deletePost] = useDeletePostMutation();

  const [snackbar, setSnackbar] = React.useState({ open: false, message: '', severity: 'success' });
  const [deleteDialog, setDeleteDialog] = React.useState({ open: false, postId: null, slug: '' });

  const currentUserId = getEmailAndName();

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "80vh",
        }}
      >
        <LoadingCircle />
      </Box>
    );
  };

  if (error) return <div>Error loading posts.</div>;

  const handleEditPost = (id, slug) => {
    navigate(`/dashboard/update-post/${slug}`);
  };

  const handleDeleteConfirmation = (id, slug) => {
    setDeleteDialog({ open: true, postId: id, slug });
  };

  const handleDeletePost = async () => {
    try {
      await deletePost(deleteDialog.slug).unwrap();
      setSnackbar({
        open: true,
        message: 'Post deleted successfully',
        severity: 'success'
      });
    } catch (err) {
      setSnackbar({
        open: true,
        message: `Error deleting post: ${err.message || 'Unknown error'}`,
        severity: 'error'
      });
    } finally {
      setDeleteDialog({ open: false, postId: null, slug: '' });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'published':
        return 'success';
      case 'draft':
        return 'warning';
      case 'pending':
        return 'info';
      default:
        return 'default';
    }
  };

  const columns = [
    {
      field: 'title',
      headerName: 'Title',
      flex: 2,
      minWidth: 150,
      renderCell: (params) => (
        <Link
          to={`/dashboard/post/${params.row.slug}`}
          style={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}
        >
          {params.value}
        </Link>
      )
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      minWidth: 100,
      renderCell: (params) => (
        <Chip
          label={params.value || 'Unknown'}
          color={getStatusColor(params.value)}
          size="small"
          variant="outlined"
        />
      )
    },
    {
      field: 'author',
      headerName: 'Author',
      flex: 1,
      minWidth: 120,
      renderCell: (params) => {
        const firstName = params.row.author_first_name || '';
        const lastName = params.row.author_last_name || '';
        return firstName && lastName ? `${firstName} ${lastName}` : firstName || lastName || 'Unknown';
      }
    },
    { field: 'category', headerName: 'Category', flex: 1, minWidth: 120 },
    {
      field: 'tags',
      headerName: 'Tags',
      flex: 2,
      minWidth: 150,
      renderCell: (params) => {
        if (!Array.isArray(params.value) || params.value.length === 0) {
          return null;
        }

        // Show first 2 tags as chips and count for the rest
        const visibleTags = params.value.slice(0, 2);
        const remainingCount = params.value.length - visibleTags.length;

        const getRandomLightColor = () => {
          // Generate pastel colors by using higher base values
          const hue = Math.floor(Math.random() * 360); // Random hue (0-359)
          const saturation = 70 + Math.floor(Math.random() * 20); // Higher saturation (70-89%)
          const lightness = 85 + Math.floor(Math.random() * 10); // Higher lightness (80-89%)
          return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
        };

        return (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.2, m: 0.2 }}>
            {visibleTags.map((tag, index) => (
              <Chip
                key={index}
                label={tag}
                size="small"
                sx={{
                  height: '16px',
                  fontSize: '0.63rem',
                  '& .MuiChip-label': {
                    padding: '0 3px',
                  },
                  backgroundColor: getRandomLightColor(),
                  border: 'none',
                  fontWeight: 500,
                  color: 'rgba(0, 0, 0, 0.7)',
                  borderRadius: '3px',
                }}
              />
            ))}
            {remainingCount > 0 && (
              <Chip
                label={`+${remainingCount}`}
                size="small"
                color="primary"
                sx={{
                  height: '18px',
                  fontSize: '0.65rem',
                  '& .MuiChip-label': {
                    padding: '0 6px',
                  },
                  backgroundColor: 'rgba(25, 118, 210, 0.15)',
                  border: 'none',
                  fontWeight: 500
                }}
              />
            )}
          </Box>
        );
      },
    },
    { field: 'keywords', headerName: 'Keywords', flex: 2, minWidth: 100 },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      getActions: (params) => {
        const isOwner = params.row.createdBy === currentUserId.userId;
        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            onClick={() => handleEditPost(params.id, params.row.slug)}
            disabled={!isOwner} // disable if not owner
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={() => handleDeleteConfirmation(params.id, params.row.slug)}
            color="error"
            disabled={!isOwner} // disable if not owner
          />,
        ];
      },
    },
  ];

  const rows = posts.map((post) => ({
    id: post.id,
    slug: post.slug || '',
    title: post.title || '',
    status: post.status || '',
    createdBy: post.author?.id || 0,
    author_first_name: post.author?.first_name || '',
    author_last_name: post.author?.last_name || '',
    // Extract a string value from category if it's an object
    category: typeof post.category === 'object' ?
      (post.category?.name || JSON.stringify(post.category)) :
      (post.category || ''),
    tags: Array.isArray(post.tags)
      ? post.tags.map((tag) => {
        if (!tag) return '';
        return typeof tag === 'object' ? (tag.name || '') : tag;
      })
      : [],
    keywords: Array.isArray(post.keywords)
      ? post.keywords.join(', ')
      : (typeof post.keywords === 'object'
        ? JSON.stringify(post.keywords)
        : (post.keywords || '')),
  }));

  return (
    <Box>
      <DataGrid
        // checkboxSelection
        rows={rows}
        columns={columns}
        getRowClassName={(params) =>
          params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
        }
        initialState={{
          pagination: { paginationModel: { pageSize: 20 } },
        }}
        pageSizeOptions={[10, 20, 50]}
        disableColumnResize
        density="compact"
        slotProps={{
          filterPanel: {
            filterFormProps: {
              logicOperatorInputProps: {
                variant: 'outlined',
                size: 'small',
              },
              columnInputProps: {
                variant: 'outlined',
                size: 'small',
                sx: { mt: 'auto' },
              },
              operatorInputProps: {
                variant: 'outlined',
                size: 'small',
                sx: { mt: 'auto' },
              },
              valueInputProps: {
                InputComponentProps: {
                  variant: 'outlined',
                  size: 'small',
                },
              },
            },
          },
        }}
      />
      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>

      {/* Delete confirmation dialog */}
      <Dialog
        open={deleteDialog.open}
        onClose={() => setDeleteDialog({ open: false, postId: null, slug: '' })}
      >
        <DialogTitle>Delete Post</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this post? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog({ open: false, postId: null, slug: '' })}>
            Cancel
          </Button>
          <Button onClick={handleDeletePost} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
