// migrations/2_deploy_nft_collections.js
const fs = require("fs");
const path = require("path");
const NFTCollection = artifacts.require("NFTCollection");

module.exports = async function (deployer, network, accounts) {
  // Déployer la première collection
  await deployer.deploy(
    NFTCollection, 
    accounts[0],
    "https://gateway.pinata.cloud/ipfs/bafkreicmuqkgvfuiqurprwvfpybbbkxlvhmua32eejds4k3ykvwc5cyrxm", // URL de métadonnées pour CollectionOne
    "CollectionOne",  // Nom
    "COL1",           // Symbole
    1000000000000000  // Mint fee (exemple)
  );
  const collectionOne = await NFTCollection.deployed();
  console.log("Collection One déployée à l'adresse :", collectionOne.address);

  // Déployer la deuxième collection en utilisant .new pour une instance distincte
  const collectionTwo = await NFTCollection.new(
    accounts[0],
    "https://gateway.pinata.cloud/ipfs/bafkreigkueti5zsbngwi7hegdioayu7yeawjntl563lau656a2u4y4iliq", // URL pour CollectionTwo
    "CollectionTwo",
    "COL2",
    1000000000000000
  );
  console.log("Collection Two déployée à l'adresse :", collectionTwo.address);

  // Générer un fichier de config pour le front-end
  const configContent = `
export const COLLECTION_A_ADDRESS = "${collectionOne.address}";
export const COLLECTION_B_ADDRESS = "${collectionTwo.address}";
`;
  const configPath = path.join(__dirname, "../client/src/config.js");
  fs.writeFileSync(configPath, configContent, { flag: "w" });
  console.log("Fichier config.js mis à jour :", configPath);
};
