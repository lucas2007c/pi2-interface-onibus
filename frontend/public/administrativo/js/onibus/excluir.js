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

    const autor = document.querySelector("#nomeUsuario").textContent;
    const placa = document.querySelector("#placa").value;
    const dataFormatada = dataISO();

    const dataHistorico = {
      autor: autor,
      funcao: "Ônibus",
      nome: placa,
      data: dataFormatada,
      hora: dataFormatada,
      acao: "excluido",
    };

    const responseOnibus = await axios.delete(
      `http://localhost:3000/onibus/${urlId}`
    );

    const responseHistorico = await axios.post(
      "http://localhost:3000/historico",
      dataHistorico
    );

    console.log("Resposta do servidor:", responseOnibus.data);
  } catch (error) {
    Swal.fire({
      text: error.responseOnibus.data.msg,
      icon: "error",
    });
    console.error("Erro ao excluir o ônibus:", error);
  }
}

const botaoConfirmar = document.querySelector("#excluir");
botaoConfirmar.addEventListener("click", function () {
  Swal.fire({
    text: "Tem certeza que deseja excluir esse ônibus?",
    icon: "warning",
    showCancelButton: true,
    reverseButtons: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    cancelButtonText: "Cancelar",
    confirmButtonText: "Excluir",
  }).then((result) => {
    if (result.isConfirmed) {
      excluirOnibus();

      Swal.fire({
        title: "Tudo certo.",
        text: "Ônibus excluído com sucesso!",
        icon: "success",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "http://localhost:3001/admin/onibus";
        }
      });
    }
  });
});

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
