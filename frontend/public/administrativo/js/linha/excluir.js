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
    const response = await axios.delete(`http://localhost:3000/linha/${urlId}`);

    console.log("Resposta do servidor:", response.data);

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
    confirmButtonText: "Excluir"
  }).then((result) => {
    if (result.isConfirmed) {

      excluirLinha();

      Swal.fire({
        title: "Tudo certo.",
        text: "A linha foi excluída.",
        icon: "success"
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = 'http://localhost:3001/admin/linha';
        }
      });
    }
  });
});


function formatarHorario(data) {
  const date = new Date(data);
  const horaLocal = date.getHours() + date.getTimezoneOffset() / 60;
  const minutos = date.getMinutes();
  return `${horaLocal < 10 ? "0" + horaLocal : horaLocal}:${minutos < 10 ? "0" + minutos : minutos
    }`;
}
