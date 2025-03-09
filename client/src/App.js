// client/src/App.js
import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CircularLoaderUI from "./ui/CircularLoaderUI.jsx";
import HomeAppBarLayout from "./ui/HomeAppBarLayout.jsx";
import Home from "./ui/Home.jsx";
import Collections from "./ui/Collections.jsx";
import CollectionDetail from "./ui/CollectionDetail.jsx";
import MintNFT from "./ui/MintNFT.jsx";  // Assurez-vous que ce composant est correctement défini
import NotFound from "./ui/NotFound.jsx";

function App() {
  return (
    <Suspense fallback={<div><CircularLoaderUI /></div>}>
      <Router>
        <HomeAppBarLayout />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/collection/:contractAddress" element={<CollectionDetail />} />
          <Route path="/mint" element={<MintNFT />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </Suspense>
  );
}

export default App;
