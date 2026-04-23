const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p';

function getTmdbToken() {
  return process.env.REACT_APP_TMDB_TOKEN;
}

function buildImageUrl(size, path) {
  if (!path) {
    return '';
  }
  return `${TMDB_IMAGE_BASE}/${size}${path}`;
}

async function tmdbGet(endpoint, searchParams = {}) {
  const token = getTmdbToken();

  if (!token) {
    throw new Error('TMDB token ausente');
  }

  const params = new URLSearchParams(searchParams);
  const url = `${TMDB_BASE_URL}${endpoint}?${params.toString()}`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Falha TMDB: ${response.status}`);
  }

  return response.json();
}

function toMovieShape(movie, genreMap) {
  const year = movie.release_date ? Number(movie.release_date.slice(0, 4)) : null;
  const genre = (movie.genre_ids || []).map((id) => genreMap[id]).filter(Boolean);
  const titleQuery = encodeURIComponent(`${movie.title} trailer legendado`);

  return {
    id: movie.id,
    title: movie.title,
    year: year || new Date().getFullYear(),
    genre: genre.length > 0 ? genre : ['Sem gênero'],
    rating: movie.vote_average || 0,
    votes: movie.vote_count || 0,
    poster: buildImageUrl('w500', movie.poster_path),
    heroImage: buildImageUrl('original', movie.backdrop_path),
    trailerUrl: `https://www.youtube.com/results?search_query=${titleQuery}`,
    imdbUrl: `https://www.imdb.com/find/?q=${encodeURIComponent(movie.title)}`,
    synopsis: movie.overview || 'Sinopse não informada.',
    director: 'Não informado',
  };
}

export async function fetchTmdbMovies() {
  const [genresData, discoverData] = await Promise.all([
    tmdbGet('/genre/movie/list', { language: 'pt-BR' }),
    tmdbGet('/discover/movie', {
      language: 'pt-BR',
      include_adult: 'false',
      include_video: 'false',
      sort_by: 'popularity.desc',
      page: '1',
    }),
  ]);

  const genreMap = (genresData.genres || []).reduce((acc, item) => {
    acc[item.id] = item.name;
    return acc;
  }, {});

  return (discoverData.results || [])
    .filter((movie) => movie.poster_path)
    .slice(0, 20)
    .map((movie) => toMovieShape(movie, genreMap));
}
