import React from 'react';
import image from '../images/honda.jpg';
import HeroSections from '../components/home/HeroSections';
import NewJustIn from '../components/home/NewJustIn';
import MostViewed from '../components/home/MostViewed';
import Featured from '../components/home/Featured';
import {
  getTopNews,
  getLatestNews,
  getFeaturedNews,
  getMostViewedPosts,
  getJustIn,
  getAllCategories
} from '../lib/blogIndexPagePosts';

import { latestNews, posts, oldPosts1, oldPosts2, oldPosts3Right, featurePost, JustInItem } from './dumy';

export default async function HomePage() {

  // Use try/catch to handle potential data fetching errors
  let topNews = [];
  let latestPosts = [];
  let featuredPosts = [];
  let mostViewedPosts = [];
  let justIn = [];
  let categories = [];

  try {
    // Fetch data with Promise.all
    [topNews, latestPosts, featuredPosts, mostViewedPosts, justIn, categories] = await Promise.all([
      getTopNews(),
      getLatestNews(),
      getFeaturedNews(),
      getMostViewedPosts(),
      getJustIn(),
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
      <NewJustIn NewJustInData={JustInItem} mostViewedPosts={mostViewedPosts} justIn={justIn} />
      <MostViewed mosttViewed={latestNews} Popular={oldPosts2} />
      <Featured featurePost={featurePost} />
    </>
  );
}
