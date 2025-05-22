'use client';

import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, Divider, Avatar, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import Link from 'next/link';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const StoryPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(3),
  borderRadius: theme.spacing(1),
}));

const StoryTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  marginBottom: theme.spacing(2),
  paddingBottom: theme.spacing(1),
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const StoryItem = styled(ListItem)(({ theme }) => ({
  padding: theme.spacing(1.5, 0),
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
    borderRadius: theme.spacing(0.5),
  },
}));

const StoryLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: 'inherit',
  display: 'flex',
  width: '100%',
}));

const StoryImage = styled(Avatar)(({ theme }) => ({
  width: 60,
  height: 60,
  borderRadius: theme.spacing(0.5),
  marginRight: theme.spacing(1.5),
}));

const StoryItemTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 500,
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  lineHeight: 1.3,
  marginBottom: theme.spacing(0.5),
}));

const StoryMeta = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(0.5),
  color: theme.palette.text.secondary,
  fontSize: '0.75rem',
}));

export default function TopStories({ posts }) {
  if (!posts || posts.length === 0) {
    return null;
  }

  const formatDate = (dateString) => {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <StoryPaper elevation={1}>
      <StoryTitle variant="h6">
        Top Stories
      </StoryTitle>
      
      <List disablePadding>
        {posts.slice(0, 5).map((post, index) => (
          <React.Fragment key={post.id}>
            {index > 0 && <Divider component="li" />}
            <StoryItem alignItems="flex-start" disableGutters>
              <StoryLink href={`/${post.category?.slug || 'uncategorized'}/${post.slug}`}>
                {post.blogFeaturedImage && (
                  <StoryImage
                    variant="square"
                    src={post.blogFeaturedImage}
                    alt={post.title}
                  />
                )}
                <ListItemText
                  primary={
                    <StoryItemTitle variant="body2">
                      {post.title}
                    </StoryItemTitle>
                  }
                  secondary={
                    <StoryMeta>
                      <AccessTimeIcon fontSize="inherit" />
                      {formatDate(post.publishedAt)}
                    </StoryMeta>
                  }
                  disableTypography
                />
              </StoryLink>
            </StoryItem>
          </React.Fragment>
        ))}
      </List>
    </StoryPaper>
  );
}
