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
import AdminLogin from './pages/Admin/pages/Login';
import Dashboard from './pages/Admin/pages/Dashboard';
import Movies from './pages/Admin/pages/Movies';
import Casts from './pages/Admin/pages/Casts';
import Halls from './pages/Admin/pages/Halls';
import Screenings from './pages/Admin/pages/Screenings';
import Navbar from './pages/Admin/components/Navbar';
import ProtectedRoute from './pages/Admin/components/ProtectedRoute';
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
        <Route path="/admin" element={<Navbar />}>
          <Route
            index
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="movies"
            element={
              <ProtectedRoute>
                <Movies />
              </ProtectedRoute>
            }
          />
          <Route
            path="casts"
            element={
              <ProtectedRoute>
                <Casts />
              </ProtectedRoute>
            }
          />
          <Route
            path="halls"
            element={
              <ProtectedRoute>
                <Halls />
              </ProtectedRoute>
            }
          />
          <Route
            path="screenings"
            element={
              <ProtectedRoute>
                <Screenings />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path="/admin/login" element={<AdminLogin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
