import React from 'react';
import { Typography, Box } from '@mui/material';
import Link from 'next/link';
import { formatDate } from '../lib/urlSettings';


export default function LatestRandomPost({ id, headline, category, slug, date, key }) {
  const formattedDate = formatDate(new Date(date));
  return (
    <Box key={key} sx={{ flex: 1, minWidth: '0' }}>
      <Link href={`/${category.slug}/${formattedDate}/${slug}-${id}`} >
        <Typography
          variant="body2"
          sx={{
            color: 'black',
            fontWeight: 600,
            cursor: 'pointer',
            mb: 1,
            whiteSpace: 'normal', // Allows text to wrap
            overflow: 'hidden', // Not necessary here since we're wrapping
            textOverflow: 'clip', // Clips overflow if needed (though not required with wrapping)
            '&:hover': {
              textDecoration: 'underline',
            },
          }}
          title={headline} // Shows full title on hover
        >
          {headline}
        </Typography>
      </Link>
    </Box>
  );
}
