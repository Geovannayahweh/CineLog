function getDbBaseUrl() {
  return process.env.REACT_APP_FIREBASE_DB_URL;
}

function normalizeDbUrl(url) {
  return url.endsWith('/') ? url.slice(0, -1) : url;
}

export async function saveFavorite(movie) {
  const dbUrl = getDbBaseUrl();

  if (!dbUrl) {
    throw new Error('Firebase DB URL ausente');
  }

  const endpoint = `${normalizeDbUrl(dbUrl)}/favorites.json`;
  const payload = {
    movieId: movie.id,
    title: movie.title,
    year: movie.year,
    poster: movie.poster,
    rating: movie.rating,
    savedAt: new Date().toISOString(),
  };

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Falha ao salvar favorito: ${response.status}`);
  }

  return response.json();
}
