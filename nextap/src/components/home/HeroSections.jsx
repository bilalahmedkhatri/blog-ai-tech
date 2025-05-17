import React from 'react'
import LatestRandomPost from '../LatestRandomPost';
import Grid from '@mui/material/Grid';
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
						imageUrl={oneRandomPost.blogFeaturedImage}
						category={oneRandomPost.category.name}
						headline={oneRandomPost.title}
						mediaHeight={300}
					/>

					<LatestRandomPost topRandomPost={twoRandomPosts} />
				</Grid>
				<Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
					<Grid container spacing={3}>
						{fourRandomPost.map((p, k) => {
							return (
								<Grid key={k} size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
									<NewsCard
										imageUrl={p.blogFeaturedImage}
										category={p.category.name}
										headline={p.title}
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
