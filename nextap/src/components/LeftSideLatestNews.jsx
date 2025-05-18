import React from 'react';
import { List, ListItem, ListItemText, Divider, Typography } from '@mui/material';
import Link from 'next/link';
import { formatDate } from '../lib/urlSettings';
import { green } from '@mui/material/colors';

export default function LeftSideLatestNews({ leftJustIn }) {
	return (
		<List>
			{leftJustIn.map((item, idx) => {
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
								primary={
									<Typography
										component={Link}
										href={item.category.slug}
										passHref
										variant="h2"
										sx={{
											color: 'inherit',
											fontSize: 15,
											color: green[800],
											'&:hover': {
												textDecoration: 'underline',
											},
										}}
									>
										{item.category.name}
									</Typography>
								}
								secondary={
									<React.Fragment>
										<Typography
											component={Link}
											href={`/${item.category.slug}/${formatDate(datetime)}/${item.slug}-${item.id}`}
											passHref
											variant="body2"
											sx={{
												marginTop: 5,
												display: 'inline',
												'&:hover': {
													textDecoration: 'underline',
												},
											}}
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
	);
}
