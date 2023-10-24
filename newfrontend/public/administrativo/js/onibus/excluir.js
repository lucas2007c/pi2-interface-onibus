async function getOnibus() {
  const url = window.location.href;
  const urlId = url.split("/").pop();

  try {
    const response = await axios.get(`http://localhost:3000/onibus/${urlId}`);

    const onibus = response.data;

    document.querySelector("#placa").value = onibus.placa;
  } catch (error) {
    console.error("Erro ao buscar os dados:", error);
  }
}

getOnibus();

async function excluirOnibus() {
  try {
    const url = window.location.href;
    const urlId = url.split("/").pop();
    const response = await axios.delete(
      `http://localhost:3000/onibus/${urlId}`
    );

    console.log("Resposta do servidor:", response.data);

    if (response.status === 200) {
      localStorage.setItem(
        "alert",
        JSON.stringify({
          alertType: "success",
          alertMessage: "Ônibus deletado com sucesso.",
        })
      );

      window.location.href = "http://localhost:3001/admin/onibus";
    } else {
      console.error("Erro no servidor:", response.data);
    }
  } catch (error) {
    console.error("Erro ao excluir o ônibus:", error);
  }
}

const botaoExcluir = document.querySelector("#excluirBotao");
botaoExcluir.addEventListener("click", function () {
  excluirOnibus();
});