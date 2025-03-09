<p align="center"> <img src="https://user-images.githubusercontent.com/99184393/157167080-02e4e9af-2038-406f-ae10-d6b18a8a6a85.png" width="150" alt="NFT Marketplace Logo"/> <h1 align="center">🎨 Marketplace NFT - React, Ethereum & IPFS 🎨</h1> </p> <p align="center"> Une Marketplace décentralisée de NFT avec React.js, Solidity, IPFS, Ganache et Metamask. Projet développé dans le cadre d'un apprentissage blockchain et décentralisation. </p>
🚀 Objectif du Projet
Créer une Marketplace NFT similaire à OpenSea permettant :

🖼 Affichage et gestion de collections de NFT.
📦 Stockage des images 3D et métadonnées sur IPFS.
🔗 Interaction avec Ethereum via Metamask.
💳 Achat/Vente et gestion de NFT par les utilisateurs.

🎯 Fonctionnalités clés
Connexion wallet Metamask pour les transactions.
Hébergement décentralisé (IPFS) des images et métadonnées NFT.
Affichage clair et esthétique des collections NFT.
Architecture moderne avec React.js et Material UI.
Contrats intelligents écrits en Solidity.
Utilisation de Ganache pour la blockchain locale en développement.

⚙️ Technologies Utilisées durant le projet
Catégorie	Technologies
Frontend	React.js, Material UI
Blockchain	Ethereum (Solidity, Truffle, Ganache)
Interactions	Web3.js, Metamask
Stockage	IPFS (Pinata)
Déploiement	Ganache, Réseaux de test Ethereum (Sepolia, Holesky)

💻 Installation & Test en local
Pré-requis :
Ganache
Node.js
Metamask installé dans le navigateur
Truffle

📌 Cloner et configurer le projet :

git clone git@github.com:Raptor2198/nft-marketplace-projectESGI.git
cd votre-repo

# Installer les dépendances du frontend
cd client
npm install

🛠 Déployer les contrats avec Truffle & Ganache
# Démarrez Ganache
ganache-cli
ou 
ganache gui

# Déploiement des contrats
truffle migrate --reset
🌐 Lancer l'application React.js :

cd client
yarn install
yarn start
Ouvrir votre navigateur sur : http://localhost:3000

🎯 Réalisations du Projet (succès)
✅ Déploiement des contrats intelligents via Truffle
✅ Intégration React.js avec Material UI
✅ Hébergement des métadonnées sur IPFS via Pinata
✅ Intégration complète de Metamask pour gérer les transactions
✅ Tests locaux avec Ganache réussis

🐞 Problèmes rencontrés
❌ Difficultés à récupérer les métadonnées via contractMetadata.
❌ Erreurs d'appel à contract.methods (fonction .call() non reconnue).
❌ Problèmes avec les formats des URL IPFS dans l'affichage frontend.
❌ Problèmes d'affichage des collections NFT (problème d'état initial vide).
⚠️ À faire pour résoudre les problèmes rencontrés
Vérifier et ajuster la fonction contractMetadata() du contrat.
Vérifier la compatibilité entre Web3.js et le type retourné par Truffle Contract.
Implémenter un mécanisme de fallback robuste en cas d’erreur lors du fetch JSON sur IPFS.
Corriger l'appel et le parsing du JSON stocké dans IPFS.

📌 Roadmap (prochaines étapes)
✅ Résoudre le problème de récupération des métadonnées JSON des NFT.
✅ Finaliser l'intégration complète du frontend avec les smart contracts.
🔄 Mettre en place une fonction d'achat/vente des NFT.
🔄 Déployer officiellement sur Sepolia ou Holesky.
🔄 Effectuer des audits de sécurité du smart contract.
🔄 Documenter précisément chaque étape du déploiement final.
🛡️ Sécurité & Bonnes pratiques
Audits et tests rigoureux des smart contracts pour prévenir les failles (phishing, manipulation des transactions).
Validation stricte des entrées utilisateur et des transactions blockchain.
Bonnes pratiques recommandées par OpenZeppelin pour les contrats ERC721.

📚 Documentation et Ressources Complémentaires
Truffle Framework
Ganache
Metamask
Pinata (IPFS)
Material UI
Web3.js

👨‍💻 L'équipe de développement
Mitchel Steeve ANDRIATSILAVO

<p align="center"> <strong>Merci d'avoir consulté notre projet ! ⭐️</strong><br> N'hésitez pas à ouvrir une issue si vous rencontrez des problèmes ou avez des suggestions d'amélioration. </p>