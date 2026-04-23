import { useState } from 'react';
import MovieCard from '../components/MovieCard';
import movies from '../data/movies';
import './Movies.css';

function Movies() {
  const [search, setSearch] = useState('');
  const [genreFilter, setGenreFilter] = useState('Todos');

  const genres = ['Todos', ...new Set(movies.flatMap(m => m.genre))];

  const filtered = movies.filter(movie => {
    const matchSearch = movie.title.toLowerCase().includes(search.toLowerCase());
    const matchGenre = genreFilter === 'Todos' || movie.genre.includes(genreFilter);
    return matchSearch && matchGenre;
  });

  return (
    <main className="movies-page">
      <div className="movies-inner">
        <div className="movies-header">
          <h1 className="page-title">Catálogo de Filmes</h1>
          <p className="page-subtitle">{filtered.length} título{filtered.length !== 1 ? 's' : ''} encontrado{filtered.length !== 1 ? 's' : ''}</p>
        </div>

        <div className="filters">
          <input
            type="text"
            placeholder="Buscar por título..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="search-input"
          />
          <div className="genre-filters">
            {genres.map(genre => (
              <button
                key={genre}
                onClick={() => setGenreFilter(genre)}
                className={`genre-btn ${genreFilter === genre ? 'active' : ''}`}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>

        {filtered.length > 0 ? (
          <div className="catalog-grid">
            {filtered.map(movie => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <span>🎬</span>
            <p>Nenhum filme encontrado para "{search}".</p>
          </div>
        )}
      </div>
    </main>
  );
}

export default Movies;
