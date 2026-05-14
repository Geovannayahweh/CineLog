// Validações reutilizáveis para formulários.
// Cada função retorna string com mensagem de erro, ou null se válido.

export const validators = {
  required(value, fieldName = 'Campo') {
    if (!value || !value.toString().trim()) {
      return `${fieldName} é obrigatório.`;
    }
    return null;
  },

  email(value) {
    if (!value) return 'E-mail é obrigatório.';
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(value)) return 'E-mail inválido.';
    return null;
  },

  minLength(value, min, fieldName = 'Campo') {
    if (!value || value.length < min) {
      return `${fieldName} precisa ter pelo menos ${min} caracteres.`;
    }
    return null;
  },

  maxLength(value, max, fieldName = 'Campo') {
    if (value && value.length > max) {
      return `${fieldName} deve ter no máximo ${max} caracteres.`;
    }
    return null;
  },

  match(value, other, fieldName = 'Campo') {
    if (value !== other) return `${fieldName} não confere.`;
    return null;
  },

  ratingRange(value) {
    const n = Number(value);
    if (isNaN(n) || n < 0 || n > 10) {
      return 'Nota deve ser um número entre 0 e 10.';
    }
    return null;
  },
};
