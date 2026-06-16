// ================================
// FUNÇÕES DE VALIDAÇÃO
// ================================

/**
 * Validar formato de email
 */
function validarEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

/**
 * Validar telefone
 */
function validarTelefone(telefone) {
  const regex = /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/;
  return regex.test(telefone);
}

/**
 * Hash de senha (versão simplificada - use bcrypt em produção)
 */
function hashSenha(senha) {
  // TODO: Implementar com bcrypt
  return Buffer.from(senha).toString('base64');
}

/**
 * Comparar senha
 */
function compararSenha(senha, hash) {
  // TODO: Implementar com bcrypt
  return Buffer.from(senha).toString('base64') === hash;
}

/**
 * Sanitizar entrada
 */
function sanitizar(texto) {
  return texto.replace(/[<>"'&]/g, char => {
    const chars = {
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#x27;',
      '&': '&amp;'
    };
    return chars[char];
  });
}

module.exports = {
  validarEmail,
  validarTelefone,
  hashSenha,
  compararSenha,
  sanitizar
};
