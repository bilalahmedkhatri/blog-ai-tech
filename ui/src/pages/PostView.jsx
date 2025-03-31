import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetPostByIdQuery } from '../apiSlice';
import { Helmet } from 'react-helmet-async';
import { Container, Typography, Card, CardContent, Box, Chip, Avatar } from "@mui/material";
import { styled } from '@mui/material/styles';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonIcon from '@mui/icons-material/Person';

// Enhanced styled components
const PostCard = styled(Card)(({ theme }) => ({
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
  borderRadius: theme.spacing(1),
  overflow: 'hidden',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
  }
}));

const PostImage = styled(Box)(({ theme }) => ({
  width: '100%',
  height: 400,
  objectFit: 'cover',
  [theme.breakpoints.down('md')]: {
    height: 300,
  },
  [theme.breakpoints.down('sm')]: {
    height: 200,
  },
}));

const PostHeader = styled(CardContent)(({ theme }) => ({
  padding: theme.spacing(3, 4),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
}));

const PostTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  marginBottom: theme.spacing(2),
  color: theme.palette.text.primary,
}));

const PostMeta = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(2),
  marginBottom: theme.spacing(2),
  color: theme.palette.text.secondary,
}));

const MetaItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(0.5),
  fontSize: '0.875rem',
}));

const TagsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(1),
  marginTop: theme.spacing(2),
}));

const ContentBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(0, 4),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1, 2, 3),
  },
  // Typography styling
  '& p': {
    marginBottom: theme.spacing(2),
    lineHeight: 1.7,
    fontSize: '1.05rem',
  },
  '& h1, & h2, & h3, & h4, & h5, & h6': {
    // marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    fontWeight: 600,
  },
  '& h1': { fontSize: '2rem' },
  '& h2': { fontSize: '1.75rem' },
  '& h3': { fontSize: '1.5rem' },
  '& h4': { fontSize: '1.25rem' },
  '& h5': { fontSize: '1.1rem' },
  '& h6': { fontSize: '1rem' },
  '& a': {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  '& img': {
    maxWidth: '100%',
    height: 'auto',
    borderRadius: theme.spacing(1),
    margin: theme.spacing(2, 0),
  },
  '& blockquote': {
    borderLeft: `4px solid ${theme.palette.primary.main}`,
    paddingLeft: theme.spacing(2),
    fontStyle: 'italic',
    margin: theme.spacing(2, 0),
    color: theme.palette.text.secondary,
  },
  '& ul, & ol': {
    paddingLeft: theme.spacing(3),
    marginBottom: theme.spacing(2),
  },
  '& li': {
    marginBottom: theme.spacing(1),
  },
  // Table styling
  '& table': {
    borderCollapse: 'collapse',
    width: '100%',
    marginBottom: theme.spacing(3),
    marginTop: theme.spacing(2),
    border: '1px solid #e0e0e0',
    borderRadius: theme.spacing(1),
    overflow: 'hidden',
  },
  '& th, & td': {
    border: '1px solid #e0e0e0',
    padding: theme.spacing(1.5),
    textAlign: 'left',
  },
  '& th': {
    backgroundColor: theme.palette.mode === 'dark' 
      ? theme.palette.grey[800] 
      : theme.palette.grey[100],
    fontWeight: 600,
    color: theme.palette.text.primary,
  },
  '& tr:nth-of-type(even)': {
    backgroundColor: theme.palette.mode === 'dark' 
      ? 'rgba(255, 255, 255, 0.05)' 
      : 'rgba(0, 0, 0, 0.02)',
  },
  '& tr:hover': {
    backgroundColor: theme.palette.mode === 'dark' 
      ? 'rgba(255, 255, 255, 0.08)' 
      : 'rgba(0, 0, 0, 0.04)',
  },
  // Code styling
  '& pre, & code': {
    fontFamily: 'monospace',
    backgroundColor: theme.palette.mode === 'dark' 
      ? 'rgba(255, 255, 255, 0.05)' 
      : 'rgba(0, 0, 0, 0.04)',
    padding: theme.spacing(0.5, 1),
    borderRadius: theme.spacing(0.5),
    fontSize: '0.9rem',
  },
  '& pre': {
    padding: theme.spacing(2),
    overflow: 'auto',
    marginBottom: theme.spacing(2),
  },
}));

const PostView = () => {
  const { slug } = useParams();
  const { data: post, error, isLoading } = useGetPostByIdQuery(slug);
  
  if (isLoading) {
    return <div>Loading post...</div>;
  }
  
  if (error) {
    return <div>Error loading post: {error.error ? error : 'Unknown error'}</div>;
  }

  // Format date if available
  const formattedDate = post.created_at 
    ? new Date(post.created_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : null;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }} disableGutters>
      {/* {post.title && (
        <Helmet>
          <title>{post.title} | My Blog</title>
          <meta name="description" content={post.meta_description || ''} />
          <meta property="og:title" content={post.title} />
          <meta property="og:description" content={post.meta_description || ''} />
          <meta property="og:type" content="article" />
          {post.featured_image && <meta property="og:image" content={post.featured_image} />}
          <meta property="og:url" content={`${window.location.origin}/post/${post.slug}`} />
        </Helmet>
      )} */}
      
      <PostCard>
        {post.featured_image && (
          <PostImage
            component="img"
            src={post.featured_image}
            alt={post.title}
          />
        )}
        
        <PostHeader>
          <PostTitle variant="h4">
            {post.title}
          </PostTitle>
          
          <PostMeta>
            {post.author && (
              <MetaItem>
                <PersonIcon fontSize="small" />
                {post.author.first_name && post.author.last_name 
                  ? `${post.author.first_name} ${post.author.last_name}`
                  : post.author.email}
              </MetaItem>
            )}
            
            {formattedDate && (
              <MetaItem>
                <AccessTimeIcon fontSize="small" />
                {formattedDate}
              </MetaItem>
            )}
            
            {post.category && (
              <Chip 
                label={typeof post.category === 'object' ? post.category.name : post.category}
                size="small"
                color="primary"
                variant="outlined"
              />
            )}
          </PostMeta>
          
          {Array.isArray(post.tags) && post.tags.length > 0 && (
            <TagsContainer>
              {post.tags.map((tag, index) => (
                <Chip
                  key={index}
                  label={typeof tag === 'object' ? tag.name : tag}
                  size="small"
                  sx={{
                    backgroundColor: `hsl(${Math.floor(Math.random() * 360)}, 70%, 90%)`,
                    color: 'rgba(0, 0, 0, 0.7)',
                    fontWeight: 500,
                    borderRadius: '4px',
                    border: 'none',
                  }}
                />
              ))}
            </TagsContainer>
          )}
        </PostHeader>
        
        <ContentBox dangerouslySetInnerHTML={{ __html: post.content }} />
      </PostCard>
    </Container>
  );
};

export default PostView;
