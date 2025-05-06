import { Routes, Route } from 'react-router-dom';
import Home from './Home/Home';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="#" element={<Home />} />
          <Route path="#" element={<Sessions />} />

        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
