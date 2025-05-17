import React from 'react'
import { Typography, Grid, Button } from '@mui/material';
import NewsCard from '../NewsCard';
import RightSideLatestNews from '../RightSideLatestNews';
import InPageTitile from '../InPageTitile';


export default function MostViewed({ mosttViewed, Popular }) {
	return (
		<Grid container spacing={3} sx={{ mt: 1 }}>
			<Grid size={{ xs: 12, sm: 12, md: 8, lg: 8 }}>
				<InPageTitile title={"Most Viewed"} />
				<Grid container spacing={3}>
					{mosttViewed.map((p, k) => (
						<Grid key={k} size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
							<NewsCard
								imageUrl={p.imageUrl}
								category={p.category}
								headline={p.title}
							/>
						</Grid>
					))}
				</Grid>
			</Grid>

			{/* Right Side Latest News */}
			<Grid size={{ xs: 12, sm: 12, md: 4, lg: 4 }}>
				<Grid container spacing={3}>
					<Typography variant="h6" fontSize={25} color='black' sx={{ fontWeight: 600 }}>
						Popular News
					</Typography>
					{Popular.map((p, k) => (
						<Grid key={k} size={{ xs: 12 }}>
							<RightSideLatestNews
								imageUrl={p.imageUrl}
								category={p.category}
								headline={p.title} />
						</Grid>
					))}
				</Grid>
			</Grid>
		</Grid>
	)
}
