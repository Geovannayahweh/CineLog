import { useState, useEffect } from 'react';
import { tmdbService } from '../services/tmdbService';
import './TrendingSection.css';

function TrendingSection() {
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        setError(null);
        const data = await tmdbService.getTrending();
        if (!cancelled) setTrending(data);
      } catch (err) {
        if (!cancelled) setError(err.message || 'Não foi possível carregar os filmes em alta.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => { cancelled = true; };
  }, []);

  return (
    <section className="trending-section">
      <div className="trending-inner">
        <div className="trending-header">
          <div>
            <h2 className="section-title">🔥 Em Alta no Mundo</h2>
            <p className="trending-subtitle">
              Filmes populares essa semana — dados em tempo real
            </p>
          </div>
        </div>

        {loading && (
          <div className="trending-loading">
            <div className="spinner" aria-hidden="true" />
            <span>Buscando dados externos...</span>
          </div>
        )}

        {!loading && error && (
          <div className="trending-error">
            <span>⚠️</span>
            <div>
              <p><strong>Não foi possível carregar.</strong></p>
              <p className="trending-error-detail">{error}</p>
            </div>
          </div>
        )}

        {!loading && !error && trending.length > 0 && (
          <div className="trending-grid">
            {trending.map(item => (
              <article key={item.id} className="trending-card">
                <div className="trending-poster">
                  {item.poster ? (
                    <img src={item.poster} alt={`Poster de ${item.title}`} />
                  ) : (
                    <div className="trending-poster-fallback">🎬</div>
                  )}
                  {item.rating > 0 && (
                    <span className="trending-badge">★ {item.rating.toFixed(1)}</span>
                  )}
                </div>
                <div className="trending-info">
                  <h3 className="trending-title">{item.title}</h3>
                  {item.year && <p className="trending-year">{item.year}</p>}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default TrendingSection;
