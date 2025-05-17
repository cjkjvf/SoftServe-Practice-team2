import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Home/Home';
import Layout from './components/Layout';
import About from './pages/About'; 
import Favorites from "./pages/Favorites"; 
import SeatPlanPay  from "./choice/seatplan-pay"; 
import MovieDetails from './pages/MovieDetails';
import Login from './Autorize/Login'; 
import Register from './Autorize/Register';
import Catalog from './Catalog/Catalog';
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
          <Route path="/catalog" element={<Catalog />} />
        </Route>
            {/* Окремий Route без Layout */}
        <Route path="seatplan-pay" element={<SeatPlanPay />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;