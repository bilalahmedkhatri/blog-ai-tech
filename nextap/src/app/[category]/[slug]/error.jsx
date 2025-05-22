'use client';

import React from 'react';
import { Container, Typography, Button, Box, Paper } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useRouter } from 'next/navigation';

export default function Error({ error, reset }) {
  const router = useRouter();

  return (
    <Paper
      elevation={3}
      sx={{
        p: 4,
        textAlign: 'center',
        borderRadius: 2,
        backgroundColor: 'rgba(255, 255, 255, 0.9)'
      }}
    >
      <ErrorOutlineIcon color="error" sx={{ fontSize: 60, mb: 2 }} />

      <Typography variant="h4" component="h1" gutterBottom>
        Something went wrong
      </Typography>

      <Typography variant="body1" color="text.secondary" paragraph>
        {error?.message || "We couldn't load the blog post you requested."}
      </Typography>

      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', gap: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => reset()}
        >
          Try again
        </Button>

        <Button
          variant="outlined"
          onClick={() => router.push('/')}
        >
          Go to homepage
        </Button>
      </Box>
    </Paper>
  );
}
