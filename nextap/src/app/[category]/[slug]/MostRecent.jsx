'use client';

import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, Divider, Paper, Chip } from '@mui/material';
import { styled } from '@mui/material/styles';
import Link from 'next/link';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const RecentPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(3),
  borderRadius: theme.spacing(1),
}));

const RecentTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  marginBottom: theme.spacing(2),
  paddingBottom: theme.spacing(1),
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const RecentItem = styled(ListItem)(({ theme }) => ({
  padding: theme.spacing(1.5, 0),
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
    borderRadius: theme.spacing(0.5),
  },
}));

const RecentLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: 'inherit',
  width: '100%',
}));

const RecentItemTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 500,
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  lineHeight: 1.3,
  marginBottom: theme.spacing(0.5),
}));

const RecentMeta = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginTop: theme.spacing(0.5),
}));

const DateDisplay = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(0.5),
  color: theme.palette.text.secondary,
  fontSize: '0.75rem',
}));

export default function MostRecent({ posts }) {
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
    <RecentPaper elevation={1}>
      <RecentTitle variant="h6">
        Most Recent
      </RecentTitle>
      
      <List disablePadding>
        {posts.slice(0, 5).map((post, index) => (
          <React.Fragment key={post.id}>
            {index > 0 && <Divider component="li" />}
            <RecentItem alignItems="flex-start" disableGutters>
              <RecentLink href={`/${post.category?.slug || 'uncategorized'}/${post.slug}`}>
                <RecentItemTitle variant="body2">
                  {post.title}
                </RecentItemTitle>
                
                <RecentMeta>
                  <DateDisplay>
                    <AccessTimeIcon fontSize="inherit" />
                    {formatDate(post.publishedAt)}
                  </DateDisplay>
                  
                  {post.category && (
                    <Chip
                      label={post.category.name}
                      size="small"
                      color="primary"
                      variant="outlined"
                      sx={{ height: 20, fontSize: '0.625rem' }}
                    />
                  )}
                </RecentMeta>
              </RecentLink>
            </RecentItem>
          </React.Fragment>
        ))}
      </List>
    </RecentPaper>
  );
}
