import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Home/Home';
import Layout from './components/Layout';
import About from './pages/About'; // Це просто для тесту, можеш потім видалити
import Favorites from "./pages/Favorites"; // Обрані фільми
import MovieDetails from './pages/MovieDetails';
import SeatPlanPay  from "./choice/seatplan-pay"; // Обрані фільми
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
        </Route>
            {/* Окремий Route без Layout */}
        <Route path="/seatplan" element={<SeatPlanPay />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;