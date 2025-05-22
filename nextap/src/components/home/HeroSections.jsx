import React from 'react'
import LatestRandomPost from '../LatestRandomPost';
import Grid from '@mui/material/Grid';
import { Box } from '@mui/material';
import NewsCard from '../NewsCard';
import InPageTitile from '../InPageTitile';
import { getRandomPosts } from '../../lib/randomGenerater';


export default async function HeroSections({ posts }) {
	const oneRandomPost = getRandomPosts(posts, 1)[0];
	const postsWithoutFirst = posts.filter(post => post.id !== oneRandomPost.id);
	const twoRandomPosts = getRandomPosts(postsWithoutFirst, 2);
	const allSelectedIds = [oneRandomPost.id, ...twoRandomPosts.map(post => post.id)];
	const fourRandomPost = posts.filter(post => !allSelectedIds.includes(post.id));
	return (
		<>
			<InPageTitile title={"Top Stories"} showBreadcrumbs={false} />
			<Grid container spacing={3}>
				<Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
					<NewsCard
						id={oneRandomPost.id}
						imageUrl={oneRandomPost.blogFeaturedImage}
						category={oneRandomPost.category}
						headline={oneRandomPost.title}
						slug={oneRandomPost.slug}
						date={oneRandomPost.publishedAt}
					/>
					<Box sx={{ pt: 2, display: 'flex', flexWrap: 'wrap', gap: 2 }}>
						{twoRandomPosts.map((p, key) => (
							<LatestRandomPost
								id={p.id}
								category={p.category}
								headline={p.title}
								slug={p.slug}
								date={p.publishedAt}
								key={key}
							/>
						))}
					</Box>
				</Grid>
				<Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
					<Grid container spacing={3}>
						{fourRandomPost.map((p, k) => {
							return (
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
							);
						})}
					</Grid>
				</Grid>
			</Grid>
		</>
	)
}
