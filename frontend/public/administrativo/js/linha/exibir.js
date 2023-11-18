async function getLinha() {
  const url = window.location.href;
  const urlId = url.split("/").pop();

  try {
    const response = await axios.get(`http://localhost:3000/linha/${urlId}`);

    const linha = response.data;

    document.querySelector("#nome").value = linha.nome;
    document.querySelector("#origem").value = linha.origem;
    document.querySelector("#destino").value = linha.destino;
    document.querySelector("#horarioPartida").value = formatarHorario(
      linha.horarioPartida
    );
    document.querySelector("#duracao").value = linha.duracao;
  } catch (error) {
    console.error("Erro ao buscar os dados:", error);
  }
}

function formatarHorario(data) {
  const date = new Date(data);
  const horaLocal = date.getHours() + date.getTimezoneOffset() / 60;
  const minutos = date.getMinutes();
  return `${horaLocal < 10 ? "0" + horaLocal : horaLocal}:${
    minutos < 10 ? "0" + minutos : minutos
  }`;
}

getLinha();
