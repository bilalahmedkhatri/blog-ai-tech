import React from 'react'
import Grid from '@mui/material/Grid';
import NewsCard from '../NewsCard';
import InPageTitile from '../InPageTitile';

export default function Featured({ featurePost, featuredPosts, }) {
	console.log('featured', featuredPosts);
	return (

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
	)
}
