// useForm — hook customizado para gerenciar formulários.
// Centraliza: estado dos campos, erros de validação, estado de submit,
// touched (campo já foi interagido) e helpers de handle.
//
// Uso:
//   const form = useForm({
//     initial: { email: '', senha: '' },
//     validate: (values) => ({ email: !values.email && 'obrigatório' }),
//     onSubmit: async (values) => { ... }
//   });

import { useState, useCallback } from 'react';

export function useForm({ initial = {}, validate, onSubmit }) {
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const setField = useCallback((name, value) => {
    setValues(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleBlur = useCallback((e) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
  }, []);

  const reset = useCallback(() => {
    setValues(initial);
    setErrors({});
    setTouched({});
    setSubmitError(null);
  }, [initial]);

  const handleSubmit = useCallback(async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    setSubmitError(null);

    // Marca todos os campos como tocados ao tentar submeter
    const allTouched = Object.keys(values).reduce((acc, k) => ({ ...acc, [k]: true }), {});
    setTouched(allTouched);

    // Roda validação
    let validationErrors = {};
    if (validate) {
      validationErrors = validate(values) || {};
      setErrors(validationErrors);
    }

    const hasErrors = Object.values(validationErrors).some(Boolean);
    if (hasErrors) return;

    try {
      setSubmitting(true);
      await onSubmit(values);
    } catch (err) {
      setSubmitError(err.message || 'Algo deu errado. Tente novamente.');
    } finally {
      setSubmitting(false);
    }
  }, [values, validate, onSubmit]);

  return {
    values,
    errors,
    touched,
    submitting,
    submitError,
    setField,
    handleChange,
    handleBlur,
    handleSubmit,
    reset,
  };
}
