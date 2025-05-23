'use client';

import React from 'react';
import { Box, Typography, Avatar, Divider, Button, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LanguageIcon from '@mui/icons-material/Language';

const AuthorPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(4),
  borderRadius: theme.spacing(1),
  display: 'flex',
  flexDirection: 'column',
  [theme.breakpoints.up('sm')]: {
    flexDirection: 'row',
    alignItems: 'center',
  },
}));

const AuthorAvatar = styled(Avatar)(({ theme }) => ({
  width: 80,
  height: 80,
  marginRight: theme.spacing(3),
  marginBottom: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    marginBottom: 0,
  },
}));

const AuthorInfo = styled(Box)(({ theme }) => ({
  flex: 1,
}));

const AuthorName = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  marginBottom: theme.spacing(0.5),
}));

const AuthorBio = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(2),
}));

const SocialLinks = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1),
}));

export default function AuthorBioComponent({ author }) {
  // Default author if none provided
  const defaultAuthor = {
    name: 'John Doe',
    avatar: 'https://mui.com/static/images/avatar/1.jpg',
    bio: 'Tech enthusiast and writer with over 10 years of experience in the software industry. Passionate about sharing knowledge and helping others learn about new technologies.',
    twitter: 'https://twitter.com/johndoe',
    linkedin: 'https://linkedin.com/in/johndoe',
    website: 'https://johndoe.com',
  };

  console.log('authorData', author);

  const authorData = author || defaultAuthor;

  return (
    <AuthorPaper elevation={1}>
      <AuthorAvatar src={authorData.avatar} alt={`${authorData.firstName} ${authorData.lastName}`} />
      
      <AuthorInfo>
        <AuthorName variant="h6">
          {`${authorData.firstName} ${authorData.lastName}`}
        </AuthorName>
        
        <AuthorBio variant="body2">
          {authorData.summery}
        </AuthorBio>
        
        <SocialLinks>
          {authorData.twitter && (
            <Button 
              startIcon={<TwitterIcon />} 
              size="small" 
              href={authorData.twitter}
              target="_blank"
              rel="noopener noreferrer"
            >
              Twitter
            </Button>
          )}
          
          {authorData.linkedin && (
            <Button 
              startIcon={<LinkedInIcon />} 
              size="small"
              href={authorData.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </Button>
          )}
          
          {authorData.website && (
            <Button 
              startIcon={<LanguageIcon />} 
              size="small"
              href={authorData.website}
              target="_blank"
              rel="noopener noreferrer"
            >
              Website
            </Button>
          )}
        </SocialLinks>
      </AuthorInfo>
    </AuthorPaper>
  );
}
