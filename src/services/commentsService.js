// commentsService — simula uma API REST de comentários.
// Endpoints simulados:
//   GET    /movies/:movieId/comments
//   POST   /movies/:movieId/comments
//   DELETE /comments/:commentId

import { storage } from '../utils/storage';

const COMMENTS_KEY = 'cinelog:comments';
const LATENCY = 350;

function delay(ms = LATENCY) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function getAll() {
  return storage.get(COMMENTS_KEY, []);
}

function saveAll(comments) {
  storage.set(COMMENTS_KEY, comments);
}

export const commentsService = {
  // GET /movies/:movieId/comments
  async listByMovie(movieId) {
    await delay();
    const all = getAll();
    return all
      .filter(c => c.movieId === movieId)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  },

  // POST /movies/:movieId/comments
  async create({ movieId, userId, userName, text, rating }) {
    await delay();

    const newComment = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      movieId,
      userId,
      userName,
      text: text.trim(),
      rating: Number(rating),
      createdAt: new Date().toISOString(),
    };

    const all = getAll();
    all.push(newComment);
    saveAll(all);

    return newComment;
  },

  // DELETE /comments/:commentId
  async remove(commentId, userId) {
    await delay(200);

    const all = getAll();
    const target = all.find(c => c.id === commentId);

    if (!target) throw new Error('Comentário não encontrado.');
    if (target.userId !== userId) {
      throw new Error('Você não tem permissão para excluir este comentário.');
    }

    const updated = all.filter(c => c.id !== commentId);
    saveAll(updated);

    return true;
  },

  // GET /comments/stats/:movieId — média + contagem (útil para mostrar no card)
  async statsForMovie(movieId) {
    await delay(150);
    const list = getAll().filter(c => c.movieId === movieId);
    if (list.length === 0) return { average: 0, count: 0 };
    const sum = list.reduce((acc, c) => acc + c.rating, 0);
    return { average: sum / list.length, count: list.length };
  },
};
