import React from 'react'
import { Grid, List, ListItem, ListItemText, Typography, Divider, Box, Button } from '@mui/material';
import Link from 'next/link';
import NewsCard from '../NewsCard';
import RightSideLatestNews from '../RightSideLatestNews';
import RestoreIcon from '@mui/icons-material/Restore';
import CodeIcon from '@mui/icons-material/Code';
import { oldPosts1, oldPosts2 } from '../../app/dumy';
import InPageTitile from '../InPageTitile';
import { getMostViewedPosts } from '../../lib/blogIndexPagePosts';

export default function MostViewJustIn({ mostViewedPosts, justIn }) {

	const twoMostViewedPosts = mostViewedPosts.slice(0, 2);
	const fourMostViewedPosts = mostViewedPosts.slice(2, 6);
	return (
		<Grid container spacing={3} sx={{ pt: 4 }}>
			<Grid size={{ xs: 12, sm: 12, md: 8, lg: 8 }}>
				<InPageTitile
					title={"Most Viewed"}
					showBreadcrumbs={true}
				/>
				<Grid container spacing={3}>
					{twoMostViewedPosts.map((p, k) => (
						<Grid key={k} size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
							<NewsCard
								imageUrl={p.blogFeaturedImage}
								category={p.category.name}
								headline={p.title}
							/>
						</Grid>
					))}
					{fourMostViewedPosts.map((p, k) => (
						<Grid key={k} size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
							<RightSideLatestNews
								imageUrl={p.blogFeaturedImage}
								category={p.category.name}
								headline={p.title} />
						</Grid>
					))}
				</Grid>
			</Grid>

			{/* Right Side Latest News */}
			<Grid size={{ xs: 12, sm: 12, md: 4, lg: 4 }}>
				<Box
					display="flex"
					alignItems="center"
					justifyContent="space-between"
					mb={1}
				>
					<Box display="flex" alignItems="center">
						<RestoreIcon color="error" sx={{ mr: 1 }} />
						<Typography variant="h6" fontWeight={700}>
							Just In
						</Typography>
					</Box>
					<Box display="flex" alignItems="center">
						<CodeIcon sx={{ mr: 0.5 }} />
						<Typography variant="button">Share</Typography>
					</Box>
				</Box>


				<List>
					{justIn.map((item, idx) => {
						const datetime = new Date(item.publishedAt);
						const date = datetime.getDate();
						const month = datetime.toLocaleDateString('default', { month: 'short' });
						return (
							<React.Fragment key={idx}>
								<ListItem alignItems="flex-start" sx={{ my: 1, }}>
									<ListItemText
										primary={
											<Typography
												sx={{
													fontSize: 18,
													fontWeight: 600,
													pt: 0.2,
													width: 80,
													textAlign: 'left'
												}}
											>
												{date} {month}
											</Typography>}
										sx={{ mr: 1, width: 80, textAlign: 'left' }}
									/>
									<ListItemText
										primary={item.category.name}
										secondary={
											<React.Fragment>
												<Typography
													component="span"
													variant="body2"
													sx={{ color: 'text.primary', display: 'inline' }}
												>
													{item.title}
												</Typography>
												{/* {" — I'll be in your neighborhood doing errands this…"} */}
											</React.Fragment>
										}
										sx={{ ml: 3, width: '100%', textAlign: 'left' }}
									/>
								</ListItem>
								<Divider />
							</React.Fragment>
						)
					})}
				</List>

				<Box>
					{/* See More */}
					<Box textAlign="right" mt={1}>
						<Button
							component={Link}
							href='/news'
							variant="button"
							sx={{
								textTransform: 'uppercase',
								fontWeight: 700,
								'&:hover': { textDecoration: 'underline' },
							}}
						>
							See more →
						</Button>
					</Box>
				</Box>
			</Grid>
		</Grid>
	)
}
