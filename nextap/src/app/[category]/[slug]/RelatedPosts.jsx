'use client';

import React from 'react';
import { Box, Typography, Grid, Card, CardMedia, CardContent, CardActionArea } from '@mui/material';
import { styled } from '@mui/material/styles';
import Link from 'next/link';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const RelatedPostCard = styled(Card)(({ theme }) => ({
	height: '100%',
	display: 'flex',
	flexDirection: 'column',
	transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
	'&:hover': {
		transform: 'translateY(-4px)',
		boxShadow: '0 6px 20px rgba(0, 0, 0, 0.1)',
	},
}));

const PostDate = styled(Box)(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	gap: theme.spacing(0.5),
	color: theme.palette.text.secondary,
	fontSize: '0.75rem',
	marginTop: theme.spacing(1),
}));

export default function RelatedPosts({ posts, currentPostId }) {
	// Filter out the current post and limit to 3 posts
	const relatedPosts = posts
		.filter(post => post.id !== currentPostId)
		.slice(0, 3);

	if (relatedPosts.length === 0) {
		return null;
	}

	return (
		<Box sx={{ mt: 6, mb: 4 }}>
			<Typography variant="h5" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
				Related Articles
			</Typography>

			<Grid container spacing={3}>
				{relatedPosts.map((post) => {
					const formattedDate = post.publishedAt
						? new Date(post.publishedAt).toLocaleDateString('en-US', {
							year: 'numeric',
							month: 'short',
							day: 'numeric',
						})
						: null;

					return (
						<Grid Grid size={{ xs: 12, sm: 12, md: 3, lg: 3 }} key={post.id}>
							<Link
								href={`/${post.category?.slug || 'uncategorized'}/${post.slug}`}
								style={{ textDecoration: 'none' }}
								passHref
							>
								<CardActionArea component="div" sx={{ height: '100%' }}>
									<RelatedPostCard>
										{post.blogFeaturedImage && (
											<CardMedia
												component="img"
												height="140"
												image={post.blogFeaturedImage}
												alt={post.title}
											/>
										)}
										<CardContent>
											<Typography variant="h6" component="h3" sx={{ fontWeight: 600, mb: 1 }}>
												{post.title}
											</Typography>

											{formattedDate && (
												<PostDate>
													<AccessTimeIcon fontSize="inherit" />
													{formattedDate}
												</PostDate>
											)}
										</CardContent>
									</RelatedPostCard>
								</CardActionArea>
							</Link>
						</Grid>
					);
				})}
			</Grid>
		</Box>
	);
}
