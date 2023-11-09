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
    document.querySelector("#foto_caminho").value = usuario.foto_caminho;
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

    if (response.status === 200) {
      localStorage.setItem(
        "alert",
        JSON.stringify({
          alertType: "success",
          alertMessage: "Usuário deletado com sucesso.",
        })
      );

      window.location.href = "http://localhost:3001/admin/usuario";
    } else {
      console.error("Erro no servidor:", response.data);
    }
  } catch (error) {
    console.error("Erro ao excluir o usuario:", error);
  }
}

const botaoExcluir = document.querySelector("#excluirBotao");
botaoExcluir.addEventListener("click", function () {
  excluirUsuario();
});
