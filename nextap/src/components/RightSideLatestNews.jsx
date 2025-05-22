import React from 'react';
import { Typography, Box, Card, } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { formatDate } from '../lib/urlSettings';

export default function RightSideLatestNews({ id, imageUrl, headline, category, slug, date }) {
	const formattedDate = formatDate(new Date(date));
	return (
		<Card
			component={Link}
			href={`/${category.slug}/${slug}`}
			// href={`/${category.slug}/${formattedDate}/${slug}-${id}`}
			passHref
			sx={{
				display: 'flex',
				alignItems: 'flex-start',
				textDecoration: 'none',
				borderRadius: 0,
				boxShadow: 'none',
				gap: 1,
				'&:hover .title': {
					textDecoration: 'underline',
				},
			}}
		>
			{/* Left image */}
			<Image
				src={imageUrl}
				// src={imageUrl.src}
				alt={headline}
				style={{ objectFit: 'cover' }}
				width={150}
				height={110}
				priority
				unoptimized // remore on deployment
			/>
			{/* <CardMedia
					component="img"
					image={imageUrl}
					// image={image.src}
					alt={headline}
					sx={{
						width: 150,
						height: 110,
						flexShrink: 0,
						objectFit: 'cover',

					}}
				/> */}

			<Box pt={1.5}>
				<Typography
					variant="caption"
					color="blue"
					fontWeight={600}
					gutterBottom
					sx={{ textTransform: 'uppercase', letterSpacing: 0.5 }}
				>
					{category.name}
				</Typography>

				<Typography
					className="title"
					variant="subtitle1"
					fontWeight={600}
					color="black"
					pt={0.6}
					sx={{ lineHeight: 1.2 }}
				>
					{headline}
				</Typography>
			</Box>
		</Card>
	);
}
