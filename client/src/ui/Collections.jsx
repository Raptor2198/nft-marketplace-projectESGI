import React, { useContext, useEffect, useState } from "react";
import { Box, Grid, Card, CardMedia, CardContent, Typography, Button } from "@mui/material";
import { NFTCollectionContext } from "../lib/NFTCollectionContext";

console.log("✅ Collections.jsx est importé !");

const Collections = () => {
    console.log("✅ Collections.jsx rendu");

    const { contractA, contractB } = useContext(NFTCollectionContext);

    console.log("✅ Valeurs du contexte récupérées :", { contractA, contractB });

    console.log("✅ Contract A complet:", contractA);
    console.log("✅ Contract B complet:", contractB);
    console.log("✅ Contract A methods:", contractA?.methods ? Object.keys(contractA.methods) : "❌ Pas de méthodes disponibles");
    console.log("✅ Contract B methods:", contractB?.methods ? Object.keys(contractB.methods) : "❌ Pas de méthodes disponibles");

    const [collections, setCollections] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadCollections = async () => {
            let cols = [];

            const fetchMetadata = async (contract, collectionName) => {
                try {
                    if (!contract || !contract.methods) {
                        throw new Error(`⚠️ Le contrat ${collectionName} est invalide.`);
                    }

                    // ✅ Accès correct à `contractMetadata` via `methods`
                    const metadataUrl = await contract.methods.contractMetadata().call();

                    console.log(`✅ URL contractMetadata pour ${collectionName}:`, metadataUrl);

                    if (!metadataUrl || typeof metadataUrl !== "string") {
                        throw new Error(`URL de métadonnées invalide pour ${collectionName}`);
                    }

                    // 🔥 Récupération du JSON
                    const response = await fetch(metadataUrl);
                    if (!response.ok) {
                        throw new Error(`Erreur HTTP: ${response.status}`);
                    }

                    const metadataJson = await response.json();
                    console.log(`✅ Métadonnées pour ${collectionName}:`, metadataJson);

                    return {
                        name: metadataJson.name || collectionName,
                        address: contract.options.address,
                        metadata: metadataJson.image || "/fallback-image.jpg",
                    };
                } catch (error) {
                    console.error(`❌ Erreur lors de la récupération des métadonnées pour ${collectionName}:`, error);
                    return null;
                }
            };

            if (contractA) {
                console.log("✅ ContractA chargé", contractA);
                const collectionA = await fetchMetadata(contractA, "Collection A");
                if (collectionA) cols.push(collectionA);
            }

            if (contractB) {
                console.log("✅ ContractB chargé", contractB);
                const collectionB = await fetchMetadata(contractB, "Collection B");
                if (collectionB) cols.push(collectionB);
            }

            setCollections(cols);
            setLoading(false);
        };

        if (contractA && contractB) {
            loadCollections();
        } else {
            console.warn("⚠️ contractA et/ou contractB ne sont pas encore chargés !");
        }
    }, [contractA, contractB]);

    return (
        <Box sx={{ p: 2 }}>
            <Typography variant="h4" gutterBottom>
                Collections Disponibles
            </Typography>
            {loading ? (
                <Typography>Chargement des collections...</Typography>
            ) : (
                <Grid container spacing={3}>
                    {collections.map((col, idx) => (
                        <Grid item xs={12} sm={6} md={4} key={idx}>
                            <Card>
                                <CardMedia
                                    component="img"
                                    height="200"
                                    image={col.metadata}
                                    alt={col.name}
                                    onError={(e) => { e.target.src = "/fallback-image.jpg"; }}
                                />
                                <CardContent>
                                    <Typography variant="h6">{col.name}</Typography>
                                    <Typography variant="body2">Adresse : {col.address}</Typography>
                                    <Button variant="contained" color="primary" href={`/collection/${col.address}`}>
                                        Voir Collection
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Box>
    );
};

export default Collections;
