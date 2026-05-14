// Hash SHA-256 usando Web Crypto API (nativo do navegador, sem dependências)
// Atenção: hash no front-end é apenas demonstrativo (boa prática real é hash no back-end).
export async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}
