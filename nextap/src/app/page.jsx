import React from 'react';
import image from '../images/honda.jpg';
import HeroSections from '../components/home/HeroSections';
import MostViewJustIn from '../components/home/MostViewJustIn';
import Popular from '../components/home/Popular';
import Featured from '../components/home/Featured';
import {
  getTopNews,
  getLatestNews,
  getMostViewedPosts,
  getJustIn,
  getPopularNews,
  getFeaturedNews,
  getAllCategories
} from '../lib/blogIndexPagePosts';

import { latestNews, posts, oldPosts1, oldPosts2, oldPosts3Right, featurePost, JustInItem } from './dumy';

export default async function HomePage() {

  // Use try/catch to handle potential data fetching errors
  let topNews = [];
  let mostViewedPosts = [];
  let justIn = [];
  let popularNews = [];
  let featuredPosts = [];
  let categories = [];

  try {
    // Fetch data with Promise.all
    [topNews, mostViewedPosts, justIn, popularNews, featuredPosts, categories] = await Promise.all([
      getTopNews(),
      getMostViewedPosts(),
      getJustIn(),
      getPopularNews(),
      getFeaturedNews(),
      getAllCategories()
    ]);
  } catch (error) {
    console.error("Error fetching data:", error);
    // Use dummy data as fallback if fetching fails
    latestPosts = latestNews;
    featuredPosts = featurePost;
  }

  return (
    <>
      <HeroSections posts={topNews} />
      <MostViewJustIn mostViewedPosts={mostViewedPosts} justIn={justIn} />
      <Popular mosttViewed={latestNews} Popular={oldPosts2} popularNews={popularNews} />
      <Featured featurePost={featurePost} featuredPosts={featuredPosts}  />
    </>
  );
}
