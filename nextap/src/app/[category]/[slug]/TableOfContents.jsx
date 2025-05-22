'use client';

import React, { useEffect, useState } from 'react';
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';
import { styled } from '@mui/material/styles';

const TOCContainer = styled(Box)(({ theme }) => ({
  position: 'sticky',
  top: theme.spacing(10),
  maxHeight: 'calc(100vh - 120px)',
  overflowY: 'auto',
  padding: theme.spacing(2),
  backgroundColor: theme.palette.mode === 'dark' 
    ? 'rgba(0, 0, 0, 0.05)' 
    : 'rgba(255, 255, 255, 0.8)',
  borderRadius: theme.spacing(1),
  border: `1px solid ${theme.palette.divider}`,
  marginBottom: theme.spacing(2),
  '&::-webkit-scrollbar': {
    width: '6px',
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: 'transparent',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: theme.palette.mode === 'dark' 
      ? 'rgba(255, 255, 255, 0.2)' 
      : 'rgba(0, 0, 0, 0.2)',
    borderRadius: '3px',
  },
}));

const TOCListItem = styled(ListItem)(({ theme, active }) => ({
  padding: theme.spacing(0.5, 1),
  borderLeft: `2px solid ${active ? theme.palette.primary.main : 'transparent'}`,
  backgroundColor: active ? 
    (theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)') : 
    'transparent',
  transition: 'all 0.2s ease',
  '&:hover': {
    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.05)',
  },
}));

export default function TableOfContents() {
  const [headings, setHeadings] = useState([]);
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    // Find all headings in the content
    const contentHeadings = Array.from(document.querySelectorAll('h2, h3, h4, h5, h6'))
      .filter(heading => heading.id) // Only include headings with IDs
      .map(heading => ({
        id: heading.id,
        text: heading.textContent,
        level: parseInt(heading.tagName.substring(1)), // Extract level from tag name (h2 -> 2)
      }));
    
    setHeadings(contentHeadings);

    // Set up intersection observer to highlight active heading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-100px 0px -80% 0px' }
    );

    // Observe all headings
    contentHeadings.forEach(heading => {
      const element = document.getElementById(heading.id);
      if (element) observer.observe(element);
    });

    return () => {
      // Clean up observer
      contentHeadings.forEach(heading => {
        const element = document.getElementById(heading.id);
        if (element) observer.unobserve(element);
      });
    };
  }, []);

  if (headings.length === 0) {
    return null;
  }

  const scrollToHeading = (id) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100,
        behavior: 'smooth'
      });
    }
  };

  return (
    <TOCContainer>
      <Typography variant="subtitle1" fontWeight={600} gutterBottom>
        Table of Contents
      </Typography>
      
      <List dense disablePadding>
        {headings.map((heading) => (
          <TOCListItem 
            key={heading.id}
            active={activeId === heading.id}
            onClick={() => scrollToHeading(heading.id)}
            sx={{ 
              pl: (heading.level - 2) * 1.5 + 1, // Indent based on heading level
              cursor: 'pointer'
            }}
            disableGutters
          >
            <ListItemText 
              primary={heading.text} 
              primaryTypographyProps={{ 
                variant: 'body2',
                color: activeId === heading.id ? 'primary' : 'textPrimary',
                fontWeight: activeId === heading.id ? 500 : 400,
              }}
            />
          </TOCListItem>
        ))}
      </List>
    </TOCContainer>
  );
}
