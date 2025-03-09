// client/src/ui/MintNFT.jsx
import React, { useState, useEffect, useContext } from "react";
import Web3 from "web3";
import { Box, TextField, Button, Typography } from "@mui/material";
import { NFTCollectionContext } from "../lib/NFTCollectionContext";
import CollectionAABI from "../contracts/NFTCollection.json"; // Utilise la même ABI pour la collection choisie

const MintNFT = () => {
  const { account, contractA } = useContext(NFTCollectionContext);
  const [uri, setUri] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const mintNFT = async () => {
    if (!contractA) {
      setMessage("Le contrat n'est pas chargé.");
      return;
    }
    if (!uri.trim()) {
      setMessage("Veuillez saisir une URI.");
      return;
    }
    setLoading(true);
    try {
      const receipt = await contractA.methods.mintNFT(uri).send({ from: account });
      setMessage(`NFT créé avec succès, tx hash: ${receipt.transactionHash}`);
    } catch (error) {
      setMessage("Minting échoué: " + error.message);
    }
    setLoading(false);
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Créer un NFT
      </Typography>
      <TextField
        label="Token URI"
        value={uri}
        onChange={(e) => setUri(e.target.value)}
        fullWidth
        margin="normal"
        placeholder="https://gateway.pinata.cloud/ipfs/..."
      />
      <Button variant="contained" onClick={mintNFT} disabled={loading} sx={{ mt: 2 }}>
        {loading ? "Création en cours..." : "Créer NFT"}
      </Button>
      {message && (
        <Typography variant="body1" sx={{ mt: 2 }}>
          {message}
        </Typography>
      )}
    </Box>
  );
};

export default MintNFT;
