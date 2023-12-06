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
    document.querySelector(
      "#src_foto"
    ).src = `http://localhost:3000/${motorista.foto_caminho}`;
  } catch (error) {
    console.error("Erro ao buscar os dados:", error);
  }
}

getMotorista();

async function excluirMotorista() {
  try {
    const url = window.location.href;
    const urlId = url.split("/").pop();

    const autor = document.querySelector("#nomeUsuario").textContent;
    const nome = document.querySelector("#nome").value;
    const dataFormatada = dataISO(); // função no final do script.

    const dataHistorico = {
      autor: autor,
      funcao: "Motorista",
      nome: nome,
      data: dataFormatada,
      hora: dataFormatada,
      acao: "excluido",
    };

    const responseMotorista = await axios.delete(
      `http://localhost:3000/motorista/${urlId}`
    );

    const responseHistorico = await axios.post(
      "http://localhost:3000/historico",
      dataHistorico
    );

    console.log("Resposta do servidor:", responseMotorista.data);
  } catch (error) {
    Swal.fire({
      text: error.responseMotorista.data.msg,
      icon: "error",
    });
    console.error("Erro ao excluir o motorista:", error);
  }
}

const botaoConfirmar = document.querySelector("#excluir");
botaoConfirmar.addEventListener("click", function () {
  Swal.fire({
    text: "Tem certeza que deseja excluir esse motorista?",
    icon: "warning",
    showCancelButton: true,
    reverseButtons: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    cancelButtonText: "Cancelar",
    confirmButtonText: "Excluir",
  }).then((result) => {
    if (result.isConfirmed) {
      excluirMotorista();

      Swal.fire({
        title: "Tudo certo.",
        text: "Motorista excluído com sucesso!",
        icon: "success",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "http://localhost:3001/admin/motorista";
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
