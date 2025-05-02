import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './components/Home/Home'
import Catalog from './components/Catalog/Catalog'
import Register from './components/Autorize/Register'
import Login from './components/Autorize/Login'
import ListActors from './components/ListActors/ListActors'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Catalog />} />
          <Route path="/catalog" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/list-acrots" element={<ListActors />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
