// client/src/ui/CollectionDetail.jsx
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Grid, Card, CardMedia, CardContent, Typography } from "@mui/material";
import { NFTCollectionContext } from "../lib/NFTCollectionContext";
import Web3 from "web3";

const CollectionDetail = () => {
  const { contractAddress } = useParams();
  const { contractA, contractB } = useContext(NFTCollectionContext);
  const [nfts, setNfts] = useState([]);
  const [collectionName, setCollectionName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNFTs = async () => {
      const web3 = new Web3(window.ethereum);
      // Déterminer quel contrat utiliser en fonction de l'adresse
      const contract =
        (contractA && contractA.options.address === contractAddress) ||
        (contractB && contractB.options.address === contractAddress)
          ? (contractA && contractA.options.address === contractAddress ? contractA : contractB)
          : null;

      if (contract) {
        const name = await contract.methods.name().call();
        setCollectionName(name);
        const allNFTs = await contract.methods.getAllNFTs().call();
        setNfts(allNFTs);
      }
      setLoading(false);
    };
    if (contractA && contractB) loadNFTs();
  }, [contractAddress, contractA, contractB]);

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        {collectionName}
      </Typography>
      {loading ? (
        <Typography>Chargement des NFT...</Typography>
      ) : (
        <Grid container spacing={3}>
          {nfts.map((nft, idx) => (
            <Grid item xs={12} sm={6} md={4} key={idx}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={nft.uri} // L'URI stockée sur IPFS
                  alt={`NFT ${nft.id}`}
                />
                <CardContent>
                  <Typography variant="h6">NFT #{nft.id}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default CollectionDetail;
