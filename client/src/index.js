import React from 'react';
import ReactDOM from 'react-dom/client';
import 'dotenv/config';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Web3Context, _web3Instance } from "./lib/Web3Context";
import NFTCollectionProvider from "./lib/NFTCollectionContext"; // ✅ Correction ici (pas d'accolades !)
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Web3Context.Provider value={_web3Instance}>
    <NFTCollectionProvider> {/* ✅ Utilisation du Provider dynamique */}
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </NFTCollectionProvider>
  </Web3Context.Provider>
);

reportWebVitals();
