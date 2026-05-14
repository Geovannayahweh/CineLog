import { useParams, Link, useNavigate } from 'react-router-dom';
import movies from '../data/movies';
import CommentsSection from '../components/CommentsSection';
import './MovieDetail.css';

function StarRating({ rating }) {
  const full = Math.floor(rating / 2);
  const stars = Array.from({ length: 5 }, (_, i) => i < full ? '★' : '☆');
  return <span className="stars">{stars.join('')}</span>;
}

function MovieDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const movie = movies.find(m => m.id === Number(id));

  if (!movie) {
    return (
      <main className="movie-detail-not-found">
        <div className="not-found-inner">
          <span>🎬</span>
          <h1>Filme não encontrado</h1>
          <p>Não conseguimos localizar o filme que você procura.</p>
          <Link to="/filmes" className="back-link">← Voltar ao catálogo</Link>
        </div>
      </main>
    );
  }

  const heroImage = movie.heroImage || movie.poster;

  return (
    <main className="movie-detail">
      {/* Hero */}
      <section className="detail-hero">
        <div className="detail-hero-bg" style={{ backgroundImage: `url(${heroImage})` }} />
        <div className="detail-hero-overlay" />
        <div className="detail-hero-content">
          <button
            type="button"
            className="back-btn"
            onClick={() => navigate(-1)}
            aria-label="Voltar"
          >
            ← Voltar
          </button>

          <div className="detail-hero-inner">
            <div className="detail-poster">
              <img
                src={movie.poster}
                alt={`Poster de ${movie.title}`}
                onError={(e) => { e.target.src = 'https://via.placeholder.com/300x450/16161f/8a8698?text=Sem+Poster'; }}
              />
            </div>

            <div className="detail-info">
              <div className="detail-genres">
                {movie.genre.map(g => <span key={g} className="genre-badge">{g}</span>)}
              </div>
              <h1 className="detail-title">{movie.title}</h1>
              <p className="detail-meta">
                {movie.year} &bull; Dir. {movie.director}
              </p>
              <div className="detail-rating">
                <StarRating rating={movie.rating} />
                <span className="detail-rating-num">{movie.rating.toFixed(1)}</span>
                <span className="detail-votes">({movie.votes.toLocaleString('pt-BR')} votos)</span>
              </div>
              <p className="detail-synopsis">{movie.synopsis}</p>

              <div className="detail-actions">
                {movie.trailerUrl && (
                  <a
                    href={movie.trailerUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="detail-action-primary"
                  >
                    ▶ Assistir Trailer
                  </a>
                )}
                {movie.imdbUrl && (
                  <a
                    href={movie.imdbUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="detail-action-secondary"
                  >
                    Ver no IMDb
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comentários */}
      <section className="detail-comments-section">
        <div className="detail-comments-inner">
          <CommentsSection movieId={movie.id} />
        </div>
      </section>
    </main>
  );
}

export default MovieDetail;
