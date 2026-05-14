import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Movies from './pages/Movies';
import MovieDetail from './pages/MovieDetail';
import Equipe from './pages/Equipe';
import './styles/global.css';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/filmes" element={<Movies />} />
            <Route path="/filmes/:id" element={<MovieDetail />} />
            <Route path="/equipe" element={<Equipe />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
