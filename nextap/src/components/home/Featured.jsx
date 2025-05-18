import { Box, Typography, Card, CardMedia, CardContent } from '@mui/material';
import Link from 'next/link';
import React from 'react'
import Grid from '@mui/material/Grid';
import NewsCard from '../NewsCard';
import InPageTitile from '../InPageTitile';

export default function Featured({ featurePost, featuredPosts, }) {
	console.log('featurePost', featuredPosts);
	return (
		<>
			<Grid container spacing={3} sx={{ mt: 1 }}>
				<Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
					<InPageTitile title={"Featured"} />
					<Grid container spacing={3}>
						{featurePost.map((p, k) => (
							<Grid key={k} size={{ xs: 12, sm: 12, md: 4, lg: 4 }}>
								<NewsCard
									imageUrl={p.imageUrl}
									category={p.category}
									headline={p.title}
								/>
							</Grid>
						))}
					</Grid>
				</Grid>
			</Grid>

			<Box sx={{ my: 4 }}>
				<Grid container spacing={2}>
					{featuredPosts.map((cat) => (
						<Grid item xs={6} md={4} lg={3} key={cat.id}>
							<Link href={`/category/${cat.slug}`} passHref>
								<Card sx={{ cursor: 'pointer', height: '100%' }}>
									{cat.image && (
										<CardMedia
											component="img"
											image={cat.blogFeaturedImage}
											alt={cat.title}
											height="140"
											sx={{ objectFit: 'cover' }}
										/>
									)}
									<CardContent>
										<Typography variant="subtitle1" fontWeight="bold">
											{cat.title}
										</Typography>
									</CardContent>
								</Card>
							</Link>
						</Grid>
					))}
				</Grid>
			</Box>
		</>
	)
}
