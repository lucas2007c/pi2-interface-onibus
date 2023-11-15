async function getUsuario() {
  const url = window.location.href;
  const urlId = url.split("/").pop();

  try {
    const response = await axios.get(
      `http://localhost:3000/usuario/${urlId}`
    );

    const usuario = response.data;

    document.querySelector("#nome").value = usuario.nome;
    document.querySelector("#email").value = usuario.email;
    document.querySelector("#src_foto").src = `http://localhost:3000/${usuario.foto_caminho}`;
  } catch (error) {
    console.error("Erro ao buscar os dados:", error);
  }
}

getUsuario();

async function excluirUsuario() {
  try {
    const url = window.location.href;
    const urlId = url.split("/").pop();
    const response = await axios.delete(
      `http://localhost:3000/usuario/${urlId}`
    );

    console.log("Resposta do servidor:", response.data);

  } catch (error) {
    Swal.fire({
      text: error.response.data.msg,
      icon: "error"
    });
    console.error("Erro ao excluir o usuario:", error);
  }
}

const botaoConfirmar = document.querySelector("#excluir");
botaoConfirmar.addEventListener("click", function () {
  Swal.fire({
    text: "Tem certeza que deseja excluir esse usuário?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    cancelButtonText: "Cancelar",
    confirmButtonText: "Excluir"
  }).then((result) => {
    if (result.isConfirmed) {

      excluirUsuario();

      Swal.fire({
        title: "Tudo certo.",
        text: "Usuário excluído com sucesso!",
        icon: "success"
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "http://localhost:3001/admin/usuario";
        }
      });
    }
  });
});
