// função auxiliar que carrega o header de autorização HTTP
// para solicitações ao backend do localStorage
export default function authHeader() {
    const usuario = JSON.parse(localStorage.getItem('usuario'));
  
    if (usuario && usuario.accessToken) {
      // para Node.js Express back-end
      return { 'x-access-token': usuario.accessToken };
    } else {
      return {};
    }
  }
  
  