import React from 'react';
import {
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import Link from 'next/link';
import { getRandomPosts } from '../lib/randomGenerater';


const relatedHeadlines = [
  "Late Ukrainian hting for Russia, Seoul says journalist's organs removed in Russia captivity",
  "Russia launches barrage hting for Russia, Seoul says of drones on Dnipro and Kharkiv, killing one",
  "About 600 North Korean soldiers killed fighting for Russia, Seoul says hting for Russia, Seoul says",
];

export default function LatestRandomPost({ topRandomPost }) {
  const twoHeadlines = getRandomPosts(relatedHeadlines, 2);
  return (
    <Box sx={{ pt: 2, display: 'flex', flexWrap: 'wrap', gap: 2 }}>
      {topRandomPost.map((text, idx) => (
        <Box key={idx} sx={{ flex: 1, minWidth: '0' }}>
          <Link href={`/news/${text.slug}`} passHref>
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
              title={text.title} // Shows full title on hover
            >
              {text.title}
            </Typography>
          </Link>
        </Box>
      ))}
    </Box>
  );
}
