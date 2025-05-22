import { Providers } from '../components/Providers';
import Footer from '../components/Footer';
import BlogHeader from '../components/BlogHeader'
import { Geist, Geist_Mono } from "next/font/google";
import { Container, Toolbar } from "@mui/material";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: 'My Blog – AI & Tech Insights',
  description: 'Deep dives into AI, tech tutorials, and industry news.',
  openGraph: {
    title: 'My Blog – AI & Tech Insights',
    description: 'Deep dives into AI, tech tutorials, and industry news.',
    type: 'website',
    url: 'https://yourdomain.com/blog',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'My Blog – AI & Tech Insights',
    description: 'Deep dives into AI, tech tutorials, and industry news.',
    images: ['https://yourdomain.com/og-default.png'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Providers>
          <BlogHeader />
          <Container maxWidth="xl" component="main" sx={{ py: 4 }}>
            {children}
          </Container>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
