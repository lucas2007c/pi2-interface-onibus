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
    document.querySelector("#codigo_cartao").value = passageiro.codigo_cartao;
    document.querySelector("#tipo_cartao").value = passageiro.tipo_cartao;
    document.querySelector(
      "#src_foto"
    ).src = `http://localhost:3000/${passageiro.foto_caminho}`;
  } catch (error) {
    console.error("Erro ao buscar os dados:", error);
  }
}

getPassageiro();

async function excluirPassageiro() {
  const url = window.location.href;
  const urlId = url.split("/").pop();

  const autor = document.querySelector("#nomeUsuario").textContent;
  const nome = document.querySelector("#nome").value;
  const dataFormatada = dataISO(); // função no final do script.

  const dataHistorico = {
    autor: autor,
    funcao: "Passageiro",
    nome: nome,
    data: dataFormatada,
    hora: dataFormatada,
    acao: "excluido",
  };

  try {
    const responsePassageiro = await axios.delete(
      `http://localhost:3000/passageiro/${urlId}`
    );

    const responseHistorico = await axios.post(
      "http://localhost:3000/historico",
      dataHistorico
    );

    console.log("Resposta do servidor:", responsePassageiro.data);
  } catch (error) {
    Swal.fire({
      text: error.responsePassageiro.data.msg,
      icon: "error",
    });
    console.error("Erro ao excluir o passageiro:", error);
  }
}

const botaoConfirmar = document.querySelector("#excluir");
botaoConfirmar.addEventListener("click", function () {
  Swal.fire({
    text: "Tem certeza que deseja excluir esse passageiro?",
    icon: "warning",
    showCancelButton: true,
    reverseButtons: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    cancelButtonText: "Cancelar",
    confirmButtonText: "Excluir",
  }).then((result) => {
    if (result.isConfirmed) {
      excluirPassageiro();

      Swal.fire({
        title: "Tudo certo.",
        text: "Passageiro excluído com sucesso!",
        icon: "success",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "http://localhost:3001/admin/passageiro";
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
