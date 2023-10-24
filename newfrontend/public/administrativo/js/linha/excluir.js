async function getLinhas() {
  const url = window.location.href;
  const urlId = url.split("/").pop();

  try {
    const response = await axios.get(`http://localhost:3000/linha/${urlId}`);

    const linha = response.data;

    document.querySelector("#nome").value = linha.nome;
    document.querySelector("#origem").value = linha.origem;
    document.querySelector("#destino").value = linha.destino;
    document.querySelector("#horarioPartida").value = formatarHorario(linha.horarioPartida);
    document.querySelector("#duracao").value = linha.duracao;
  } catch (error) {
    console.error("Erro ao buscar os dados:", error);
  }
}

getLinhas();

async function excluirLinha() {
  const url = window.location.href;
  const urlId = url.split("/").pop();

  try {
    await axios.delete(`http://localhost:3000/linha/${urlId}`);

    console.log("Resposta do servidor:", response.data);

    if (response.status === 200) {
      localStorage.setItem(
        "alert",
        JSON.stringify({
          alertType: "success",
          alertMessage: "Linha deletada com sucesso.",
        })
      );

      window.location.href = "http://localhost:3001/admin/linha";
    } else {
      console.error("Erro no servidor:", response.data);
    }
  } catch (error) {
    console.error("Erro ao excluir a linha:", error);
  }
}

const botaoExcluir = document.querySelector("#excluirBotao");
botaoExcluir.addEventListener("click", function () {
  excluirLinha();
});

function formatarHorario(data) {
  const date = new Date(data);
  const horaLocal = date.getHours() + date.getTimezoneOffset() / 60;
  const minutos = date.getMinutes();
  return `${horaLocal < 10 ? "0" + horaLocal : horaLocal}:${
    minutos < 10 ? "0" + minutos : minutos
  }`;
}
