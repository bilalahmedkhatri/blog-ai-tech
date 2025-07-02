import React from 'react';
import { notFound } from 'next/navigation';
import { Container, Grid, Box } from "@mui/material";
import { getPostBySlug, incrementViewCount, getTopNews, getJustIn, getPopularNews } from '../../../lib/blogIndexPagePosts';
import PostViewClient from './PostViewClient';
import RelatedPosts from './RelatedPosts';
import CommentSection from './CommentSection';
import AuthorBio from './AuthorBio';
import TableOfContents from './TableOfContents';
import TopStories from './TopStories';
import MostRecent from './MostRecent';

// Generate metadata for SEO
export async function generateMetadata({ params }) {
  const post = await getPostBySlug(params.slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The requested post could not be found.'
    };
  }

  return {
    title: `${post.title} | Blog AI Tech`,
    description: post.excerpt || `Read about ${post.title} in our tech blog`,
    openGraph: {
      title: post.title,
      description: post.excerpt || `Read about ${post.title} in our tech blog`,
      images: post.blogFeaturedImage ? [post.blogFeaturedImage] : [],
      type: 'article',
      publishedTime: post.publishedAt,
      tags: post.tags?.map(tag => typeof tag === 'object' ? tag.name : tag) || [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt || `Read about ${post.title} in our tech blog`,
      images: post.blogFeaturedImage ? [post.blogFeaturedImage] : [],
    },
    alternates: {
      canonical: `https://yourdomain.com/${params.category}/${params.slug}`,
    }
  };
}

export default async function PostPage({ params }) {

  // await new Promise(res => setTimeout(res, 50000)); // 2 seconds

  const post = await getPostBySlug(params.slug);
  console.log('post', post);
  if (!post) {
    notFound();
  }
  
  // Increment view count
  await incrementViewCount(post.id);
  
  // Get related posts (using top news as a simple way to get related content)
  const relatedPosts = await getTopNews();
  
  // Get popular posts for Top Stories
  const popularPosts = await getPopularNews();
  
  // Get most recent posts
  const recentPosts = await getJustIn();
  
  const formattedDate = post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }) : null;

  console.log('Post:', post);

  return (
    <Container maxWidth="lg" disableGutters>
      <Grid container spacing={3}>
        {/* Main content */}
        <Grid size={{ xs: 12, sm: 12, md: 8, lg: 8 }}>
          <PostViewClient post={post} formattedDate={formattedDate} slug={params.slug} category={params.category} />
          
          <AuthorBio author={post.author} />
          
          {/* abhi ke liye comment section ko band kiya hai, user authentication add kerni hogi. */}
          {/* <CommentSection postId={post.id} /> */}
        </Grid>
        
        {/* Sidebar */}
        <Grid size={{ xs: 12, sm: 12, md: 4, lg: 4 }}>
          <Box sx={{ position: 'sticky', top: 80 }}>
            <TableOfContents />
            
            {/* Top Stories section */}
            <TopStories posts={popularPosts} />
            
            {/* Most Recent section */}
            <MostRecent posts={recentPosts} />
          </Box>
        </Grid>
      </Grid>
      
      {/* Related posts section */}
      <RelatedPosts posts={relatedPosts} currentPostId={post.id} />
      
      {/* Structured data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            'headline': post.title,
            'image': post.blogFeaturedImage ? [post.blogFeaturedImage] : [],
            'datePublished': post.publishedAt,
            'dateModified': post.updatedAt || post.publishedAt,
              'author': {
                '@type': 'Person',
                'name': post.author ? 
                  (post.author.first_name && post.author.last_name ? 
                    `${post.author.first_name} ${post.author.last_name}` : 
                    post.author.email) : 
                  'Anonymous'
              },
            'publisher': {
              '@type': 'Organization',
              'name': 'Blog AI Tech',
              'logo': {
                '@type': 'ImageObject',
                'url': 'https://yourdomain.com/logo.png'
              }
            },
            'description': post.excerpt || `Read about ${post.title} in our tech blog`,
            'mainEntityOfPage': {
              '@type': 'WebPage',
              '@id': `https://yourdomain.com/${params.category}/${params.slug}`
            }
          })
        }}
      />
    </Container>
  );
}
