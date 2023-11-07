async function getMotorista() {
  const url = window.location.href;
  const urlId = url.split("/").pop();

  try {
    const response = await axios.get(
      `http://localhost:3000/motorista/${urlId}`
    );

    const motorista = response.data;

    document.querySelector("#nome").value = motorista.nome;
    document.querySelector("#cpf").value = motorista.cpf;
    document.querySelector("#numero").value = motorista.numero;
    document.querySelector("#email").value = motorista.email;
    document.querySelector("#foto_caminho").value = motorista.foto_caminho;
  } catch (error) {
    console.error("Erro ao buscar os dados:", error);
  }
}

getMotorista();

async function excluirMotorista() {
  try {
    const url = window.location.href;
    const urlId = url.split("/").pop();
    const response = await axios.delete(
      `http://localhost:3000/motorista/${urlId}`
    );

    console.log("Resposta do servidor:", response.data);

    if (response.status === 200) {
      localStorage.setItem(
        "alert",
        JSON.stringify({
          alertType: "success",
          alertMessage: "Motorista deletado com sucesso.",
        })
      );

      window.location.href = "http://localhost:3001/admin/motorista";
    } else {
      console.error("Erro no servidor:", response.data);
    }
  } catch (error) {
    console.error("Erro ao excluir o motorista:", error);
  }
}

const botaoExcluir = document.querySelector("#excluirBotao");
botaoExcluir.addEventListener("click", function () {
  excluirMotorista();
});
