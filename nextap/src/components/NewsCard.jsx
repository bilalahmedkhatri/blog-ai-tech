'use client';

import React from 'react';
import { Card, Box, CardContent, Typography, } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { green } from '@mui/material/colors';
import { formatDate } from '../lib/urlSettings';


const NewsCard = ({ id, imageUrl, headline, category, slug, date }) => {
  // const formattedDate = formatDate(new Date(date));
  return (
    <Link href={`/${category.slug}/${slug}`} passHref>
    {/* <Link href={`/${category.slug}/${formattedDate}/${slug}-${id}`} passHref> */}
      <Card
        sx={{
          width: '100%',
          overflow: 'hidden',
          boxShadow: 'none',
          '&:hover': {
            textDecoration: 'underline',
          },
        }}
      >
        <Box sx={{ position: 'relative', width: '100%', height: 0, pt: '56.25%' }}>
          <Image
            src={imageUrl}
            alt={headline}
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 1000px) 100vw, 360px"
            priority
            unoptimized // remore on deployment
          />
          <Typography
            variant="caption"
            sx={{
              position: 'absolute',
              bottom: 0,
              bgcolor: 'rgb(255, 255, 255)',
              pr: 2,
              py: 0.5,
              textTransform: 'uppercase',
              fontWeight: 500,
              fontSize: '0.8rem',
              color: green[800],
            }}
          >
            {category.name}
          </Typography>
        </Box>
        <CardContent sx={{
          p: 0,
          '&:last-child': {
            paddingBottom: 0,
          },
        }}>
          <Typography
            variant="subtitle1"
            fontWeight={600}
            sx={{
              overflowWrap: 'break-word',
              wordBreak: 'break-word',
              py: 1,
              lineHeight: 1.4,
              cursor: 'pointer',
            }}
          >
            {headline}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
};

export default NewsCard;
