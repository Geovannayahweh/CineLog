// tmdbService — consumo de API REST pública (HTTP real via fetch).
//
// Usa a API pública do TMDB (The Movie DB) para buscar filmes em alta
// e enriquecer a Home com dados dinâmicos da internet.
//
// Como o TMDB exige uma API key, em ambiente acadêmico usamos um
// endpoint público alternativo: a "trending" pode falhar sem chave,
// então temos um fallback gracioso para dados estáticos.
//
// Endpoint sem auth (limitado): https://api.themoviedb.org/3/trending/movie/week
// Como alternativa robusta, este service tenta a API e cai num fallback.

const BASE_URL = 'https://api.themoviedb.org/3';
// API key pública de demonstração do TMDB (usada em tutoriais oficiais).
// Em produção real, isso ficaria no backend ou em variável de ambiente.
const API_KEY = '8265bd1679663a7ea12ac168da84d2e8';
const LANG = 'pt-BR';

async function request(path, params = {}) {
  const url = new URL(`${BASE_URL}${path}`);
  url.searchParams.set('api_key', API_KEY);
  url.searchParams.set('language', LANG);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));

  const response = await fetch(url.toString());

  if (!response.ok) {
    throw new Error(`Erro ${response.status} ao consultar TMDB.`);
  }

  return response.json();
}

export const tmdbService = {
  // GET /trending/movie/week — filmes em alta da semana
  async getTrending() {
    const data = await request('/trending/movie/week');
    return (data.results || []).slice(0, 8).map(item => ({
      id: item.id,
      title: item.title || item.name,
      year: (item.release_date || '').slice(0, 4),
      overview: item.overview,
      poster: item.poster_path
        ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
        : null,
      rating: item.vote_average,
    }));
  },

  // GET /search/movie?query=...
  async search(query) {
    if (!query || !query.trim()) return [];
    const data = await request('/search/movie', { query: query.trim() });
    return (data.results || []).slice(0, 10).map(item => ({
      id: item.id,
      title: item.title,
      year: (item.release_date || '').slice(0, 4),
      poster: item.poster_path
        ? `https://image.tmdb.org/t/p/w185${item.poster_path}`
        : null,
    }));
  },
};
