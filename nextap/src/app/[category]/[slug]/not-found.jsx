
import React from "react";
import { Container, Box, Typography, Button, Stack, Chip } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import Link from "next/link";
import { getAllCategories } from "../../../lib/blogIndexPagePosts";

export default async function NotFound() {
  const categories = await getAllCategories();

  return (
    <Container maxWidth="md" sx={{ minHeight: "80vh" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          textAlign: "center",
        }}
      >
        <ErrorOutlineIcon
          color="error"
          sx={{ fontSize: { xs: 80, md: 120 }, mb: 2 }}
        />
        <Typography
          variant="h2"
          component="h1"
          sx={{
            fontWeight: 700,
            fontSize: { xs: "2.5rem", md: "3.5rem" },
            mb: 2,
            color: "error.main",
          }}
        >
          404 - Not Found
        </Typography>
        <Typography
          variant="h6"
          sx={{
            mb: 3,
            color: "text.secondary",
            maxWidth: 500,
            mx: "auto",
          }}
        >
          Oops! The page you are looking for does not exist or has been moved.<br />
          Please check the URL or return to the homepage.
        </Typography>

        {/* Categories as Chips */}
        {categories && categories.length > 0 && (
          <Box sx={{ mt: 1, mb: 2 }}>
            <Typography variant="subtitle1" sx={{ mb: 1, color: "text.secondary" }}>
              Explore Categories:
            </Typography>
            <Stack
              direction="row"
              spacing={1}
              flexWrap="wrap"
              justifyContent="center"
              useFlexGap
            >
              {categories.map((cat) => (
                <Chip
                  key={cat.slug}
                  label={cat.name}
                  component={Link}
                  href={`/${cat.slug}`}
                  clickable
                  color="primary"
                  variant="outlined"
                  sx={{ mb: 1 }}
                />
              ))}
            </Stack>
          </Box>
        )}

        <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ mt: 2 }}>
          <Button
            component={Link}
            href="/"
            variant="contained"
            color="primary"
            size="large"
            sx={{ px: 4, fontWeight: 600 }}
          >
            Go to Homepage
          </Button>
        </Stack>
      </Box>
    </Container>
  );
}
