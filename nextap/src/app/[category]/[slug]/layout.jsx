import { Container } from "@mui/material";

// export async function generateMetadata({ params }) {
  // const post = await getPostBySlug(params.slug);
//   return {
//     title: post.title,
//     description: post.excerpt,
//     openGraph: {
//       title: post.title,
//       description: post.excerpt,
//       url: `https://yourdomain.com/blog/${params.slug}`,
//       images: [post.coverImageUrl],
//       type: 'article',
//       publishedTime: post.date,
//       authors: [post.author],
//     },
//     twitter: {
//       card: 'summary_large_image',
//       title: post.title,
//       description: post.excerpt,
//       images: [post.coverImageUrl],
//     },
//     other: {
//       'article:section': post.category,
//     },
//   };
// }

export default function BlogPageLayout({ children }) {
  return (
    <Container maxWidth="lg" component="main" sx={{ py: 3 }}>
      {children}
    </Container>
  );
}
