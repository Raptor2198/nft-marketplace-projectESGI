import React from "react";
import { Box, Button, Typography, Stack, createTheme, ThemeProvider } from "@mui/material";
import { AppTheme } from "../lib/theme";

const Home = () => {
  return (
    <ThemeProvider theme={createTheme(AppTheme)}>
      <Box sx={{ p: 2, pt: 10, textAlign: "center" }}>
        <Typography variant="h4" gutterBottom>
          Bienvenue sur la NFT Marketplace
        </Typography>
        <Stack direction="row" spacing={2} justifyContent="center">
          <Button component="a" href="/collections" variant="contained" color="primary">
            Voir les Collections
          </Button>
          <Button component="a" href="/mint" variant="contained" color="secondary">
            Créer un NFT
          </Button>
        </Stack>
      </Box>
    </ThemeProvider>
  );
};

export default Home;
