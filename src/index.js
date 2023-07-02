import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import App from './App';
import Home from "./pages/Home"
import Anime from "./pages/Anime"
import Pesquisa from "./pages/Pesquisa"
import Animes from './pages/Animes';
import Mangas from './pages/Mangas';
import Personagens from './pages/Personagens';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route element={<App />} >
          <Route path="/" element={<Home />} />
          <Route path="/animes" element={<Animes />} />
          <Route path="/mangas" element={<Mangas />} />
          <Route path="/personagens" element={<Personagens />} />
          <Route path="/anime/:id" element={<Anime />} />
          <Route path="/pesquisa" element={<Pesquisa />} />
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>
);