import React, { useState, useContext, useEffect, useCallback } from "react";
import { AppTheme } from "../lib/theme";
import { Web3Context } from "../lib/Web3Context";
import { Link } from "react-router-dom";
import AccountCircle from "@mui/icons-material/AccountCircle";
import {
  Box,
  Menu,
  AppBar,
  Button,
  Toolbar,
  MenuItem,
  IconButton,
  Typography,
  CssBaseline,
  createTheme,
  ThemeProvider
} from "@mui/material";

function HomeAppBarLayout() {
  const web3Context = useContext(Web3Context);
  const [account, setAccount] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);

  const initConfig = useCallback(() => {
    web3Context.eth.requestAccounts((error, coinbaseAddress) => {
      if (error) {
        setAccount(null);
        return console.error(error);
      }
      if (coinbaseAddress && coinbaseAddress !== account) {
        setAccount(coinbaseAddress);
      }
    });
  }, [account, web3Context.eth]);

  useEffect(() => {
    const timer = setTimeout(() => {
      initConfig();
    }, 500);
    return () => clearTimeout(timer);
  }, [initConfig]);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <ThemeProvider theme={createTheme(AppTheme)}>
      <CssBaseline />
      <AppBar position="fixed" elevation={0}>
        <Toolbar variant="dense" sx={{ px: { xs: 1, md: 2 } }}>
          <Typography variant="h6" noWrap sx={{ cursor: "pointer", fontWeight: "bolder" }}>
            NFT Marketplace
          </Typography>
          <Box sx={{ flexGrow: 1, ml: 2 }}>
            {/* Boutons de navigation */}
            <Button component={Link} to="/" color="inherit" size="small">
              Accueil
            </Button>
            <Button component={Link} to="/collections" color="inherit" size="small">
              Collections
            </Button>
            <Button component={Link} to="/mint" color="inherit" size="small">
              Créer NFT
            </Button>
          </Box>
          <Box>
            <Button size="small" sx={{ m: 1, color: '#fff' }}>
              {account || 'Disconnected'}
            </Button>
            <IconButton color="inherit" onClick={handleMenuOpen}>
              <AccountCircle fontSize="small" />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <MenuItem onClick={handleMenuClose}>Profil</MenuItem>
              <MenuItem onClick={handleMenuClose}>Déconnexion</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <Box sx={{ height: 64 }} /> {/* Espace pour l'AppBar */}
    </ThemeProvider>
  );
}

export default HomeAppBarLayout;
