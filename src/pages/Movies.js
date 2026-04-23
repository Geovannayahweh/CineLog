import { useEffect, useState } from 'react';
import MovieCard from '../components/MovieCard';
import movies from '../data/movies';
import { fetchTmdbMovies } from '../services/tmdb';
import { saveFavorite } from '../services/favoritesDb';
import './Movies.css';

function Movies() {
  const [search, setSearch] = useState('');
  const [genreFilter, setGenreFilter] = useState('Todos');
  const [catalog, setCatalog] = useState(movies);
  const [isLoadingCatalog, setIsLoadingCatalog] = useState(true);
  const [catalogSource, setCatalogSource] = useState('Local');
  const [saveMessage, setSaveMessage] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function loadCatalog() {
      try {
        const apiMovies = await fetchTmdbMovies();
        if (isMounted && apiMovies.length > 0) {
          setCatalog(apiMovies);
          setCatalogSource('TMDB API');
        }
      } catch (error) {
        if (isMounted) {
          setCatalog(movies);
          setCatalogSource('Base local (fallback)');
        }
      } finally {
        if (isMounted) {
          setIsLoadingCatalog(false);
        }
      }
    }

    loadCatalog();

    return () => {
      isMounted = false;
    };
  }, []);

  async function handleSaveFavorite(movie) {
    try {
      await saveFavorite(movie);
      setSaveMessage(`"${movie.title}" salvo no banco NoSQL.`);
    } catch (error) {
      setSaveMessage('Não foi possível salvar no banco. Verifique o REACT_APP_FIREBASE_DB_URL.');
    }
  }

  const genres = ['Todos', ...new Set(catalog.flatMap(m => m.genre))];

  const filtered = catalog.filter(movie => {
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
          <p className="data-source">Fonte de dados: {isLoadingCatalog ? 'Carregando...' : catalogSource}</p>
          {saveMessage && <p className="save-message">{saveMessage}</p>}
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
              <MovieCard key={movie.id} movie={movie} onSaveFavorite={handleSaveFavorite} />
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
