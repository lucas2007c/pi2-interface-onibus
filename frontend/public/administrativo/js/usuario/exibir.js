async function getUsuario() {
  const url = window.location.href;
  const urlId = url.split("/").pop();

  try {
    const response = await axios.get(`http://localhost:3000/usuario/${urlId}`);

    const usuario = response.data;

    document.querySelector("#usuarioID").value = usuario.id;
    document.querySelector("#nome").value = usuario.nome;
    document.querySelector("#email").value = usuario.email;
    document.querySelector(
      "#src_foto"
    ).src = `http://localhost:3000/${usuario.foto_caminho}`;
  } catch (error) {
    console.error("Erro ao buscar os dados:", error);
  }
}

getUsuario();