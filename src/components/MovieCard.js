import './MovieCard.css';

function StarRating({ rating }) {
  const full = Math.floor(rating / 2);
  const stars = Array.from({ length: 5 }, (_, i) => i < full ? '★' : '☆');
  return <span className="stars">{stars.join('')}</span>;
}

function MovieCard({ movie }) {
  const { title, year, genre, rating, poster, director } = movie;

  return (
    <div className="movie-card">
      <div className="movie-poster-wrap">
        <img
          src={poster}
          alt={`Poster de ${title}`}
          className="movie-poster"
          onError={(e) => { e.target.src = 'https://via.placeholder.com/300x450/16161f/8a8698?text=Sem+Poster'; }}
        />
        <div className="movie-overlay">
          <p className="movie-director">Dir. {director}</p>
        </div>
      </div>
      <div className="movie-info">
        <div className="movie-genres">
          {genre.slice(0, 2).map((g) => (
            <span key={g} className="genre-tag">{g}</span>
          ))}
        </div>
        <h3 className="movie-title">{title}</h3>
        <div className="movie-meta">
          <span className="movie-year">{year}</span>
          <div className="movie-rating">
            <StarRating rating={rating} />
            <span className="rating-value">{rating.toFixed(1)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
