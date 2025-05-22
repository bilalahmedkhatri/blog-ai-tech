import React from 'react'
import { Typography, Grid, Button } from '@mui/material';
import NewsCard from '../NewsCard';
import RightSideLatestNews from '../RightSideLatestNews';
import InPageTitile from '../InPageTitile';


export default function Popular({ popularNews }) {

	const leftPopularNews = popularNews.slice(0, 4);
	const rightPopularNews = popularNews.slice(4, 8);
	return (
		<Grid container spacing={3} sx={{ mt: 1 }}>
			{/* left Side Popular News */}
			<Grid size={{ xs: 12, sm: 12, md: 4, lg: 4 }}>
				<Grid container spacing={3}>
					<Typography variant="h6" fontSize={25} color='black' sx={{ fontWeight: 600 }}>
						Popular News
					</Typography>
					{leftPopularNews.map((p, k) => (
						<Grid key={k} size={{ xs: 12 }}>
							<RightSideLatestNews
								id={p.id}
								imageUrl={p.blogFeaturedImage}
								category={p.category}
								headline={p.title}
								slug={p.slug}
								date={p.publishedAt}
							/>
						</Grid>
					))}
				</Grid>
			</Grid>

			<Grid size={{ xs: 12, sm: 12, md: 8, lg: 8 }}>
				<InPageTitile title={"Most Viewed"} />
				<Grid container spacing={3}>
					{rightPopularNews.map((p, k) => (
						<Grid key={k} size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
							<NewsCard
								id={p.id}
								imageUrl={p.blogFeaturedImage}
								category={p.category}
								headline={p.title}
								slug={p.slug}
								date={p.publishedAt}
							/>
						</Grid>
					))}
				</Grid>
			</Grid>
		</Grid>
	)
}
