import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Home/Home';
import Layout from './components/Layout';
import About from './pages/About'; // Це просто для тесту, можеш потім видалити
import Favorites from "./pages/Favorites";
import MovieDetails from './pages/MovieDetails';
import CatalogFilm from './pages/CatalogFilm';
import './global.css';
import './styles/index.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="favorites" element={<Favorites />} />
          <Route path="movies/:movieId" element={<MovieDetails />} />
          <Route path="/catalogfilm" element={<CatalogFilm/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;