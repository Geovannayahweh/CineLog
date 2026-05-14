// authService — simula uma API REST de autenticação.
// Métodos retornam Promises com latência artificial (setTimeout) para
// que os componentes possam usar async/await, loading states e try/catch
// exatamente como fariam com fetch/axios contra um backend real.

import { storage } from '../utils/storage';
import { hashPassword } from '../utils/hash';

const USERS_KEY = 'cinelog:users';
const SESSION_KEY = 'cinelog:session';
const LATENCY = 400; // ms — simula latência de rede

function delay(ms = LATENCY) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function getUsers() {
  return storage.get(USERS_KEY, []);
}

function saveUsers(users) {
  storage.set(USERS_KEY, users);
}

export const authService = {
  // POST /auth/register
  async register({ name, email, password }) {
    await delay();

    const users = getUsers();
    const emailLower = email.trim().toLowerCase();

    if (users.some(u => u.email === emailLower)) {
      throw new Error('Este e-mail já está cadastrado.');
    }

    const passwordHash = await hashPassword(password);

    const newUser = {
      id: Date.now().toString(),
      name: name.trim(),
      email: emailLower,
      passwordHash,
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    saveUsers(users);

    // Inicia a sessão automaticamente após o cadastro
    const session = { id: newUser.id, name: newUser.name, email: newUser.email };
    storage.set(SESSION_KEY, session);

    return session;
  },

  // POST /auth/login
  async login({ email, password }) {
    await delay();

    const users = getUsers();
    const emailLower = email.trim().toLowerCase();
    const user = users.find(u => u.email === emailLower);

    if (!user) {
      throw new Error('E-mail ou senha incorretos.');
    }

    const passwordHash = await hashPassword(password);
    if (user.passwordHash !== passwordHash) {
      throw new Error('E-mail ou senha incorretos.');
    }

    const session = { id: user.id, name: user.name, email: user.email };
    storage.set(SESSION_KEY, session);

    return session;
  },

  // POST /auth/logout
  async logout() {
    await delay(150);
    storage.remove(SESSION_KEY);
    return true;
  },

  // GET /auth/me — recupera a sessão atual (síncrono, sem latência)
  getCurrentUser() {
    return storage.get(SESSION_KEY, null);
  },
};
