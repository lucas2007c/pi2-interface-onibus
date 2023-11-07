async function getPassageiro() {
  const url = window.location.href;
  const urlId = url.split("/").pop();

  try {
    const response = await axios.get(
      `http://localhost:3000/passageiro/${urlId}`
    );

    const passageiro = response.data;

    document.querySelector("#nome").value = passageiro.nome;
    document.querySelector("#cpf").value = passageiro.cpf;
    document.querySelector("#numero").value = passageiro.numero;
    document.querySelector("#saldo").value = passageiro.saldo;
    document.querySelector("#email").value = passageiro.email;
    document.querySelector("#foto_caminho").value = passageiro.foto_caminho;
    document.querySelector("#tipo_cartao").value = passageiro.tipo_cartao;
  } catch (error) {
    console.error("Erro ao buscar os dados:", error);
  }
}

getPassageiro();

async function excluirPassageiro() {
  const url = window.location.href;
  const urlId = url.split("/").pop();

  try {
    const response = await axios.delete(`http://localhost:3000/passageiro/${urlId}`);

    console.log("Resposta do servidor:", response.data);

    if (response.status === 200) {
      localStorage.setItem(
        "alert",
        JSON.stringify({
          alertType: "success",
          alertMessage: "Passageiro deletado com sucesso.",
        })
      );

      window.location.href = "http://localhost:3001/admin/passageiro";
    } else {
      console.error("Erro no servidor:", response.data);
    }
  } catch (error) {
    console.error("Erro ao excluir o passageiro:", error);
  }
}

const botaoExcluir = document.querySelector("#excluirBotao");
botaoExcluir.addEventListener("click", function () {
  excluirPassageiro();
});
