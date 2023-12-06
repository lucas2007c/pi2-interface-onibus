async function getLinhas() {
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

getLinhas();

async function excluirLinha() {
  try {
    const url = window.location.href;
    const urlId = url.split("/").pop();

    const autor = document.querySelector("#nomeUsuario").textContent;
    const nome = document.querySelector("#nome").value;
    const dataFormatada = dataISO(); // função no final do script.

    const dataHistorico = {
      autor: autor,
      funcao: "Linha",
      nome: nome,
      data: dataFormatada,
      hora: dataFormatada,
      acao: "excluido",
    };

    const responseLinha = await axios.delete(
      `http://localhost:3000/linha/${urlId}`
    );

    const responseHistorico = await axios.post(
      "http://localhost:3000/historico",
      dataHistorico
    );

    console.log("Resposta do servidor:", responseLinha.data);
  } catch (error) {
    console.error("Erro ao excluir a linha:", error);
  }
}

const botaoConfirmar = document.querySelector("#excluir");
botaoConfirmar.addEventListener("click", function () {
  Swal.fire({
    text: "Tem certeza que deseja excluir essa linha?",
    icon: "warning",
    showCancelButton: true,
    reverseButtons: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    cancelButtonText: "Cancelar",
    confirmButtonText: "Excluir",
  }).then((result) => {
    if (result.isConfirmed) {
      excluirLinha();

      Swal.fire({
        title: "Tudo certo.",
        text: "A linha foi excluída.",
        icon: "success",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "http://localhost:3001/admin/linha";
        }
      });
    }
  });
});

function formatarHorario(data) {
  const date = new Date(data);
  const horaLocal = date.getHours() + date.getTimezoneOffset() / 60;
  const minutos = date.getMinutes();
  return `${horaLocal < 10 ? "0" + horaLocal : horaLocal}:${
    minutos < 10 ? "0" + minutos : minutos
  }`;
}

function dataISO() {
  const dataAtual = new Date();

  const padZero = (value) => String(value).padStart(2, "0");

  const dia = padZero(dataAtual.getDate());
  const mes = padZero(dataAtual.getMonth() + 1);
  const ano = dataAtual.getFullYear();
  const horas = padZero(dataAtual.getHours());
  const minutos = padZero(dataAtual.getMinutes());
  const segundos = padZero(dataAtual.getSeconds());

  const dataFormatada = `${ano}-${mes}-${dia}T${horas}:${minutos}:${segundos}.000Z`;

  return dataFormatada;
}
