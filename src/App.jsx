import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Home/Home';
import Layout from './components/Layout';
import About from './pages/About'; 
import Favorites from "./pages/Favorites"; 
import SeatPlanPay from "./choice/seatplan-pay"; 
import MovieDetails from './pages/MovieDetails';
import Login from './Autorize/Login'; 
import Register from './Autorize/Register';
import ListFilms from './Home/ListFilms';
// import Catalog from './Catalog/Catalog';
import './global.css';
import './styles/index.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Головна обгортка з Layout */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="favorites" element={<Favorites />} />
          <Route path="movies/:movieId" element={<MovieDetails />} />
          <Route path="listfilms" element={<ListFilms />} />
          {/* <Route path="catalog" element={<Catalog />} /> */}
        </Route>

        {/* Маршрути поза Layout (без header/footer) */}
        <Route path="seatplan-pay" element={<SeatPlanPay />} />
        <Route path="seatplan" element={<SeatPlanPay />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
