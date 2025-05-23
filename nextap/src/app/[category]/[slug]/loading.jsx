import React from 'react';
import { Container, Grid, Box, Skeleton, Card, CardContent } from '@mui/material';

export default function Loading() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={3}>
        {/* Main content */}
        <Grid size={{ xs: 12, sm: 12, md: 8, lg: 8 }}>
          <Card sx={{ mb: 4 }}>
            {/* Featured image skeleton */}
            <Skeleton variant="rectangular" height={400} />

            <CardContent>
              {/* Title skeleton */}
              <Skeleton variant="text" height={60} width="80%" sx={{ mb: 2 }} />

              {/* Meta info skeleton */}
              <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                <Skeleton variant="text" width={120} />
                <Skeleton variant="text" width={150} />
              </Box>

              {/* Tags skeleton */}
              <Box sx={{ display: 'flex', gap: 1, mb: 4 }}>
                <Skeleton variant="rounded" width={80} height={24} />
                <Skeleton variant="rounded" width={100} height={24} />
                <Skeleton variant="rounded" width={90} height={24} />
              </Box>

              {/* Content skeleton */}
              <Box sx={{ mb: 4 }}>
                <Skeleton variant="text" height={20} sx={{ mb: 1 }} />
                <Skeleton variant="text" height={20} sx={{ mb: 1 }} />
                <Skeleton variant="text" height={20} sx={{ mb: 1 }} />
                <Skeleton variant="text" height={20} sx={{ mb: 1 }} />
                <Skeleton variant="text" height={20} width="80%" sx={{ mb: 3 }} />

                <Skeleton variant="rectangular" height={200} sx={{ mb: 3 }} />

                <Skeleton variant="text" height={20} sx={{ mb: 1 }} />
                <Skeleton variant="text" height={20} sx={{ mb: 1 }} />
                <Skeleton variant="text" height={20} sx={{ mb: 1 }} />
                <Skeleton variant="text" height={20} width="60%" sx={{ mb: 3 }} />
              </Box>
            </CardContent>
          </Card>

          {/* Author bio skeleton */}
          <Card sx={{ mb: 4, p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Skeleton variant="circular" width={80} height={80} sx={{ mr: 2 }} />
              <Box sx={{ flex: 1 }}>
                <Skeleton variant="text" height={30} width="40%" sx={{ mb: 1 }} />
                <Skeleton variant="text" height={20} />
                <Skeleton variant="text" height={20} width="80%" />
              </Box>
            </Box>
            <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
              <Skeleton variant="rounded" width={100} height={36} />
              <Skeleton variant="rounded" width={100} height={36} />
              <Skeleton variant="rounded" width={100} height={36} />
            </Box>
          </Card>

          {/* Comments section skeleton */}
          <Card sx={{ mb: 4, p: 3 }}>
            <Skeleton variant="text" height={40} width="40%" sx={{ mb: 3 }} />

            <Skeleton variant="rectangular" height={120} sx={{ mb: 2 }} />
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 4 }}>
              <Skeleton variant="rounded" width={120} height={36} />
            </Box>

            <Skeleton variant="text" width="100%" sx={{ mb: 3 }} />

            {/* Comment item skeletons */}
            {[1, 2].map((item) => (
              <Box key={item} sx={{ mb: 3, pb: 3, borderBottom: '1px solid #eee' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Skeleton variant="circular" width={40} height={40} sx={{ mr: 2 }} />
                    <Box>
                      <Skeleton variant="text" width={120} />
                      <Skeleton variant="text" width={80} />
                    </Box>
                  </Box>
                  <Skeleton variant="circular" width={24} height={24} />
                </Box>

                <Skeleton variant="text" sx={{ mb: 1 }} />
                <Skeleton variant="text" width="90%" sx={{ mb: 2 }} />

                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Skeleton variant="rounded" width={80} height={32} />
                  <Skeleton variant="rounded" width={80} height={32} />
                </Box>
              </Box>
            ))}
          </Card>
        </Grid>

        {/* Sidebar */}
        <Grid size={{ xs: 12, sm: 12, md: 4, lg: 4 }}>
          <Box sx={{ position: 'sticky', top: 80 }}>
            {/* Table of contents skeleton */}
            <Card sx={{ p: 2, mb: 4 }}>
              <Skeleton variant="text" height={32} width="60%" sx={{ mb: 2 }} />

              <Box sx={{ pl: 1 }}>
                <Skeleton variant="text" height={24} sx={{ mb: 1 }} />
                <Skeleton variant="text" height={24} sx={{ mb: 1 }} />
                <Skeleton variant="text" height={24} sx={{ mb: 1 }} />
                <Skeleton variant="text" height={24} width="80%" sx={{ mb: 1 }} />
                <Skeleton variant="text" height={24} sx={{ mb: 1 }} />
                <Skeleton variant="text" height={24} width="70%" />
              </Box>
            </Card>

            {/* Additional sidebar components skeleton */}
            <Card sx={{ p: 2 }}>
              <Skeleton variant="text" height={32} width="70%" sx={{ mb: 2 }} />
              <Skeleton variant="rectangular" height={200} sx={{ mb: 2 }} />
              <Skeleton variant="text" height={24} sx={{ mb: 1 }} />
              <Skeleton variant="text" height={24} width="90%" />
            </Card>
          </Box>
        </Grid>
      </Grid>

      {/* Related posts skeleton */}
      <Box sx={{ mt: 6 }}>
        <Skeleton variant="text" height={40} width="30%" sx={{ mb: 3 }} />

        <Grid container spacing={3}>
          {[1, 2, 3, 4].map((item) => (
            <Grid item xs={12} sm={6} md={3} key={item}>
              <Card>
                <Skeleton variant="rectangular" height={160} />
                <CardContent>
                  <Skeleton variant="text" height={24} sx={{ mb: 1 }} />
                  <Skeleton variant="text" height={24} width="80%" sx={{ mb: 2 }} />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Skeleton variant="text" width={80} />
                    <Skeleton variant="text" width={60} />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}

