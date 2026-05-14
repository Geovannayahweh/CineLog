import { useState } from 'react';
import Modal from './Modal';
import { useForm } from '../hooks/useForm';
import { useAuth } from '../context/AuthContext';
import { validators } from '../utils/validators';
import './AuthModal.css';

function AuthModal({ open, onClose }) {
  const [mode, setMode] = useState('login'); // 'login' | 'register'
  const { login, register } = useAuth();

  const isLogin = mode === 'login';

  const form = useForm({
    initial: { name: '', email: '', password: '', confirm: '' },
    validate: (v) => {
      const errs = {};
      if (!isLogin) {
        errs.name = validators.required(v.name, 'Nome')
          || validators.minLength(v.name, 2, 'Nome');
      }
      errs.email = validators.email(v.email);
      errs.password = validators.required(v.password, 'Senha')
        || validators.minLength(v.password, 6, 'Senha');
      if (!isLogin) {
        errs.confirm = validators.match(v.confirm, v.password, 'Confirmação');
      }
      return errs;
    },
    onSubmit: async (v) => {
      if (isLogin) {
        await login({ email: v.email, password: v.password });
      } else {
        await register({ name: v.name, email: v.email, password: v.password });
      }
      form.reset();
      onClose();
    },
  });

  const switchMode = () => {
    setMode(m => m === 'login' ? 'register' : 'login');
    form.reset();
  };

  // Reset ao fechar
  const handleClose = () => {
    form.reset();
    setMode('login');
    onClose();
  };

  const showError = (field) => form.touched[field] && form.errors[field];

  return (
    <Modal open={open} onClose={handleClose} title={isLogin ? 'Entrar' : 'Criar conta'}>
      <form className="auth-form" onSubmit={form.handleSubmit} noValidate>
        {!isLogin && (
          <div className="field">
            <label htmlFor="auth-name">Nome</label>
            <input
              id="auth-name"
              name="name"
              type="text"
              value={form.values.name}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              placeholder="Como devemos te chamar?"
              autoComplete="name"
              aria-invalid={!!showError('name')}
            />
            {showError('name') && <span className="field-error">{form.errors.name}</span>}
          </div>
        )}

        <div className="field">
          <label htmlFor="auth-email">E-mail</label>
          <input
            id="auth-email"
            name="email"
            type="email"
            value={form.values.email}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
            placeholder="seu@email.com"
            autoComplete="email"
            aria-invalid={!!showError('email')}
          />
          {showError('email') && <span className="field-error">{form.errors.email}</span>}
        </div>

        <div className="field">
          <label htmlFor="auth-password">Senha</label>
          <input
            id="auth-password"
            name="password"
            type="password"
            value={form.values.password}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
            placeholder="Mínimo 6 caracteres"
            autoComplete={isLogin ? 'current-password' : 'new-password'}
            aria-invalid={!!showError('password')}
          />
          {showError('password') && <span className="field-error">{form.errors.password}</span>}
        </div>

        {!isLogin && (
          <div className="field">
            <label htmlFor="auth-confirm">Confirmar senha</label>
            <input
              id="auth-confirm"
              name="confirm"
              type="password"
              value={form.values.confirm}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              placeholder="Repita a senha"
              autoComplete="new-password"
              aria-invalid={!!showError('confirm')}
            />
            {showError('confirm') && <span className="field-error">{form.errors.confirm}</span>}
          </div>
        )}

        {form.submitError && (
          <div className="form-alert" role="alert">{form.submitError}</div>
        )}

        <button type="submit" className="auth-submit" disabled={form.submitting}>
          {form.submitting
            ? (isLogin ? 'Entrando...' : 'Criando conta...')
            : (isLogin ? 'Entrar' : 'Criar conta')}
        </button>

        <p className="auth-switch">
          {isLogin ? 'Ainda não tem conta?' : 'Já tem uma conta?'}{' '}
          <button type="button" className="link-button" onClick={switchMode}>
            {isLogin ? 'Cadastre-se' : 'Faça login'}
          </button>
        </p>
      </form>
    </Modal>
  );
}

export default AuthModal;
