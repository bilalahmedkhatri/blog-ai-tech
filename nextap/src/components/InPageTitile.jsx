"use client";

import React from 'react'
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { grey, green } from '@mui/material/colors';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function InPageTitile({ title, showBreadcrumbs = true }) {
  // const [showBreadcrumbs, setshowBreadcrumbs] = React.useState(false);
  // const theme = useTheme();

  // const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  // const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row' }, // Stack vertically on mobile, horizontally on larger screens
        justifyContent: { md: 'center', lg: 'space-between' },
        alignItems: { md: 'center', lg: 'center' },
        gap: { xs: 2, sm: 0 }, // Add some spacing between elements when stacked
        textAlign: 'center',
        width: '100%',
        pb: 1,
      }}
    >
      <Box>
        <Typography
          variant="h2"
          component="h2"
          color={grey[700]}
          fontFamily='Roboto Serif'
          fontSize={27}
          sx={{ textAlign: 'start' }}
        >
          {title}
        </Typography>
      </Box>
      {showBreadcrumbs && (
        <CustomBreadcrumbs />
      )}
    </Box>
  )
}



export const CustomBreadcrumbs = () => {
  return (
    <div role="presentation">
      <Breadcrumbs
        aria-label="breadcrumb"
        sx={{
          fontFamily: 'Roboto Serif',
          textTransform: 'uppercase',
          fontSize: '0.7rem',
          fontWeight: '600',
          color: grey[500],
          textAlign: 'center'
        }}
      >
        <Typography fontFamily='Roboto Serif'
          textTransform='uppercase'
          fontSize='0.7rem'
          fontWeight={600}
          color={green[800]}
        >
          Trending
        </Typography>
        <Link underline="hover" color="inherit">
          Trending
        </Link>
        <Link
          underline="hover"
          color="inherit"
          href="/material-ui/getting-started/installation/"
        >
          Core
        </Link>
      </Breadcrumbs>
    </div>
  )
}


// Movie name
// the rookie watch free online
// Weak Hero Class 1
// little boy destroy all racers korean drama
// https://24drama.to/
// the day of the jackal watch free online
// super me watch online
// 