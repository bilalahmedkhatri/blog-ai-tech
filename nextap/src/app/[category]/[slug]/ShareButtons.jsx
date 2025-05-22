'use client';

import React from 'react';
import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import RedditIcon from '@mui/icons-material/Reddit';
import LinkIcon from '@mui/icons-material/Link';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const ShareContainer = styled(Box)(({ theme, vertical = true }) => ({
  display: 'flex',
  flexDirection: vertical ? 'column' : 'row',
  alignItems: 'center',
  gap: theme.spacing(1),
  position: vertical ? 'sticky' : 'static',
  top: theme.spacing(10),
}));

const ShareButton = styled(IconButton)(({ theme, color }) => ({
  backgroundColor: color,
  color: '#fff',
  '&:hover': {
    backgroundColor: color,
    opacity: 0.9,
  },
}));

export default function ShareButtons({ title, url, vertical = true }) {
  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(url);
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(url)
      .then(() => {
        alert('Link copied to clipboard!');
      })
      .catch((err) => {
        console.error('Failed to copy link: ', err);
      });
  };
  
  return (
    <ShareContainer vertical={vertical}>
      {vertical && (
        <Typography variant="subtitle2" fontWeight={500} sx={{ mb: 1 }}>
          Share
        </Typography>
      )}
      
      <Tooltip title="Share on Facebook">
        <ShareButton
          aria-label="share on facebook"
          color="#3b5998"
          onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`, '_blank')}
        >
          <FacebookIcon />
        </ShareButton>
      </Tooltip>
      
      <Tooltip title="Share on Twitter">
        <ShareButton
          aria-label="share on twitter"
          color="#1da1f2"
          onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`, '_blank')}
        >
          <TwitterIcon />
        </ShareButton>
      </Tooltip>
      
      <Tooltip title="Share on LinkedIn">
        <ShareButton
          aria-label="share on linkedin"
          color="#0077b5"
          onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`, '_blank')}
        >
          <LinkedInIcon />
        </ShareButton>
      </Tooltip>
      
      <Tooltip title="Share on Reddit">
        <ShareButton
          aria-label="share on reddit"
          color="#ff4500"
          onClick={() => window.open(`https://www.reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`, '_blank')}
        >
          <RedditIcon />
        </ShareButton>
      </Tooltip>
      
      <Tooltip title="Share on WhatsApp">
        <ShareButton
          aria-label="share on whatsapp"
          color="#25d366"
          onClick={() => window.open(`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`, '_blank')}
        >
          <WhatsAppIcon />
        </ShareButton>
      </Tooltip>
      
      <Tooltip title="Copy Link">
        <ShareButton
          aria-label="copy link"
          color="#718096"
          onClick={copyToClipboard}
        >
          <LinkIcon />
        </ShareButton>
      </Tooltip>
    </ShareContainer>
  );
}
