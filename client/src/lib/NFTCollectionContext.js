import React, { createContext, useState, useEffect } from "react";
import truffleContract from "@truffle/contract";
import { _web3Instance, _getLocalProvider } from "./Web3Context";
import NFTCollectionABI from "../contracts/NFTCollection.json";
import { COLLECTION_A_ADDRESS, COLLECTION_B_ADDRESS } from "../config";

// Créer le contexte
export const NFTCollectionContext = createContext({ contractA: null, contractB: null });

const NFTCollectionProvider = ({ children }) => {
  const [contracts, setContracts] = useState({ contractA: null, contractB: null });

  useEffect(() => {
    const loadContracts = async () => {
      try {
        // Charger Collection A
        const instanceA = truffleContract(NFTCollectionABI);
        instanceA.setProvider(_web3Instance ? _web3Instance.currentProvider : _getLocalProvider()?.currentProvider);
        instanceA.setNetwork(parseInt(process.env.NETWORK_ID) || 5777);
        const contractA = await instanceA.at(COLLECTION_A_ADDRESS);

        // Charger Collection B
        const instanceB = truffleContract(NFTCollectionABI);
        instanceB.setProvider(_web3Instance ? _web3Instance.currentProvider : _getLocalProvider()?.currentProvider);
        instanceB.setNetwork(parseInt(process.env.NETWORK_ID) || 5777);
        const contractB = await instanceB.at(COLLECTION_B_ADDRESS);

        // Mettre à jour l'état du contexte
        setContracts({ contractA, contractB });

        console.log("✅ Contrats chargés et mis à jour dans le contexte", { contractA, contractB });
      } catch (error) {
        console.error("❌ Erreur lors du chargement des contrats:", error);
      }
    };

    loadContracts();
  }, []);

  return <NFTCollectionContext.Provider value={contracts}>{children}</NFTCollectionContext.Provider>;
};

// ✅ Ajout des exportations correctes
export { NFTCollectionProvider }; // Export nommé
export default NFTCollectionProvider; // Export par défaut
