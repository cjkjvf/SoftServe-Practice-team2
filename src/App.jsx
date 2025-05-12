import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Home/Home';
import Layout from './components/Layout';
import './global.css';
import './styles/index.css';

function App() {
  return (
    <BrowserRouter>
      <Layout>
      <Home />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
