import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { commentsService } from '../services/commentsService';
import { useForm } from '../hooks/useForm';
import { validators } from '../utils/validators';
import AuthModal from './AuthModal';
import './CommentsSection.css';

const MAX_TEXT = 600;

function StarDisplay({ value, max = 10 }) {
  const fullStars = Math.round((value / max) * 5);
  return (
    <span className="stars" aria-label={`Nota ${value} de ${max}`}>
      {Array.from({ length: 5 }, (_, i) => i < fullStars ? '★' : '☆').join('')}
    </span>
  );
}

function formatDate(iso) {
  try {
    return new Date(iso).toLocaleDateString('pt-BR', {
      day: '2-digit', month: 'short', year: 'numeric',
    });
  } catch {
    return '';
  }
}

function CommentsSection({ movieId }) {
  const { user, isAuthenticated } = useAuth();

  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);
  const [stats, setStats] = useState({ average: 0, count: 0 });
  const [authOpen, setAuthOpen] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  // Carrega comentários ao montar / trocar de filme
  const loadComments = useCallback(async () => {
    try {
      setLoading(true);
      setLoadError(null);
      const [list, statsResult] = await Promise.all([
        commentsService.listByMovie(movieId),
        commentsService.statsForMovie(movieId),
      ]);
      setComments(list);
      setStats(statsResult);
    } catch (err) {
      setLoadError(err.message || 'Erro ao carregar comentários.');
    } finally {
      setLoading(false);
    }
  }, [movieId]);

  useEffect(() => {
    loadComments();
  }, [loadComments]);

  // Formulário de novo comentário
  const form = useForm({
    initial: { text: '', rating: '8' },
    validate: (v) => ({
      text: validators.required(v.text, 'Comentário')
        || validators.minLength(v.text, 5, 'Comentário')
        || validators.maxLength(v.text, MAX_TEXT, 'Comentário'),
      rating: validators.ratingRange(v.rating),
    }),
    onSubmit: async (v) => {
      await commentsService.create({
        movieId,
        userId: user.id,
        userName: user.name,
        text: v.text,
        rating: v.rating,
      });
      form.reset();
      await loadComments();
    },
  });

  const handleDelete = async (commentId) => {
    if (!window.confirm('Tem certeza que deseja excluir este comentário?')) return;
    try {
      setDeletingId(commentId);
      await commentsService.remove(commentId, user.id);
      await loadComments();
    } catch (err) {
      alert(err.message);
    } finally {
      setDeletingId(null);
    }
  };

  const showError = (field) => form.touched[field] && form.errors[field];
  const textLen = form.values.text.length;

  return (
    <section className="comments-section">
      <header className="comments-header">
        <div>
          <h2 className="comments-title">Comentários</h2>
          <p className="comments-subtitle">
            {stats.count > 0
              ? `${stats.count} ${stats.count === 1 ? 'avaliação' : 'avaliações'} · média ${stats.average.toFixed(1)}/10`
              : 'Seja o primeiro a comentar sobre este filme.'}
          </p>
        </div>
        {stats.count > 0 && (
          <div className="comments-average">
            <StarDisplay value={stats.average} />
            <span className="comments-average-num">{stats.average.toFixed(1)}</span>
          </div>
        )}
      </header>

      {/* Formulário ou CTA de login */}
      {isAuthenticated ? (
        <form className="comment-form" onSubmit={form.handleSubmit} noValidate>
          <div className="field">
            <label htmlFor="comment-text">
              Seu comentário
              <span className="char-count">{textLen}/{MAX_TEXT}</span>
            </label>
            <textarea
              id="comment-text"
              name="text"
              value={form.values.text}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              placeholder="Compartilhe sua opinião sobre o filme..."
              rows={4}
              maxLength={MAX_TEXT}
              aria-invalid={!!showError('text')}
            />
            {showError('text') && <span className="field-error">{form.errors.text}</span>}
          </div>

          <div className="field comment-rating-field">
            <label htmlFor="comment-rating">
              Sua nota: <strong className="rating-display">{form.values.rating}</strong>/10
            </label>
            <input
              id="comment-rating"
              name="rating"
              type="range"
              min="0"
              max="10"
              step="0.5"
              value={form.values.rating}
              onChange={form.handleChange}
              className="rating-slider"
            />
            <div className="rating-scale">
              <span>0</span>
              <span>5</span>
              <span>10</span>
            </div>
            {showError('rating') && <span className="field-error">{form.errors.rating}</span>}
          </div>

          {form.submitError && (
            <div className="form-alert" role="alert">{form.submitError}</div>
          )}

          <div className="comment-form-actions">
            <span className="comment-form-user">
              Postando como <strong>{user.name}</strong>
            </span>
            <button type="submit" className="auth-submit" disabled={form.submitting}>
              {form.submitting ? 'Publicando...' : 'Publicar comentário'}
            </button>
          </div>
        </form>
      ) : (
        <div className="comments-login-cta">
          <p>Faça login para deixar seu comentário e nota neste filme.</p>
          <button
            type="button"
            className="auth-submit"
            onClick={() => setAuthOpen(true)}
          >
            Entrar ou criar conta
          </button>
        </div>
      )}

      {/* Lista de comentários */}
      <div className="comments-list">
        {loading && (
          <div className="comments-loading">
            <div className="spinner" aria-hidden="true" />
            <span>Carregando comentários...</span>
          </div>
        )}

        {!loading && loadError && (
          <div className="form-alert" role="alert">{loadError}</div>
        )}

        {!loading && !loadError && comments.length === 0 && (
          <div className="comments-empty">
            <span>💬</span>
            <p>Nenhum comentário ainda. Que tal ser o primeiro?</p>
          </div>
        )}

        {!loading && comments.map(c => {
          const isOwn = isAuthenticated && c.userId === user.id;
          return (
            <article key={c.id} className="comment-item">
              <div className="comment-item-header">
                <div className="comment-user">
                  <span className="comment-avatar">{c.userName.charAt(0).toUpperCase()}</span>
                  <div>
                    <p className="comment-user-name">
                      {c.userName}
                      {isOwn && <span className="comment-badge">você</span>}
                    </p>
                    <p className="comment-date">{formatDate(c.createdAt)}</p>
                  </div>
                </div>
                <div className="comment-rating">
                  <StarDisplay value={c.rating} />
                  <span className="comment-rating-num">{c.rating.toFixed(1)}</span>
                </div>
              </div>
              <p className="comment-text">{c.text}</p>
              {isOwn && (
                <div className="comment-actions">
                  <button
                    type="button"
                    className="comment-delete"
                    onClick={() => handleDelete(c.id)}
                    disabled={deletingId === c.id}
                  >
                    {deletingId === c.id ? 'Excluindo...' : 'Excluir'}
                  </button>
                </div>
              )}
            </article>
          );
        })}
      </div>

      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </section>
  );
}

export default CommentsSection;
