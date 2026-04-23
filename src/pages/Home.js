import { Link } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import movies from '../data/movies';
import './Home.css';

function Home() {
  const destaque = movies[0];
  const recentes = movies.slice(1, 4);

  return (
    <main className="home">
      {/* Hero */}
      <section className="hero">
        <div className="hero-bg" style={{ backgroundImage: `url(${destaque.poster})` }} />
        <div className="hero-overlay" />
        <div className="hero-content">
          <span className="hero-badge">🎬 Em Destaque</span>
          <h1 className="hero-title">{destaque.title}</h1>
          <p className="hero-meta">
            {destaque.year} &bull; Dir. {destaque.director} &bull; ⭐ {destaque.rating}
          </p>
          <p className="hero-synopsis">{destaque.synopsis}</p>
          <div className="hero-genres">
            {destaque.genre.map(g => <span key={g} className="genre-badge">{g}</span>)}
          </div>
          <Link to="/filmes" className="hero-btn">Explorar Catálogo →</Link>
        </div>
      </section>

      {/* Filmes Recentes */}
      <section className="section">
        <div className="section-inner">
          <div className="section-header">
            <h2 className="section-title">Filmes em Destaque</h2>
            <Link to="/filmes" className="see-all">Ver todos →</Link>
          </div>
          <div className="movies-grid">
            {recentes.map(movie => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      </section>

      {/* Sobre o Projeto */}
      <section className="about-banner">
        <div className="about-inner">
          <h2>O que é o CineLog?</h2>
          <p>
            Uma plataforma para explorar filmes, buscar por título, filtrar por gênero
            e descobrir novos títulos em destaque no catálogo.
          </p>
          <div className="about-features">
            {['📽️ Catálogo de Filmes', '🔎 Busca por Título', '🏷️ Filtro por Gênero', '🎬 Destaques'].map(f => (
              <span key={f} className="feature-pill">{f}</span>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;
