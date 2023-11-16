document.addEventListener("DOMContentLoaded", async (event) => {
  const id = await verifyToken();

  const UsuarioId = id;

  try {
    const response = await axios.get(
      `http://localhost:3000/usuario/${UsuarioId}`
    );
    const usuario = response.data;

    document.querySelector(
      "#fotoUsuario"
    ).src = `http://localhost:3000/${usuario.foto_caminho}`;
    document.querySelector("#nomeUsuario").textContent = usuario.nome;
    document.querySelector("#emailUsuario").textContent = usuario.email;
    document.querySelector("#contaUsuario").href = `/admin/usuario/exibir/${usuario.id}`;
    document.querySelector("#configUsuario").href = `/admin/usuario/editar/${usuario.id}`;
    const logout = document.querySelector("#sairUsuario");
    logout.addEventListener('click', () => {
      localStorage.removeItem('token')
      location.href = '/admin/login'
    })
  } catch (error) {
    console.error("Erro ao buscar os dados:", error);
  }
});
