async function getUsuario() {
  const url = window.location.href;
  const urlId = url.split("/").pop();

  try {
    const response = await axios.get(`http://localhost:3000/usuario/${urlId}`);

    const usuario = response.data;

    document.querySelector("#nome").value = usuario.nome;
    document.querySelector("#email").value = usuario.email;
    document.querySelector(
      "#src_foto"
    ).src = `http://localhost:3000/${usuario.foto_caminho}`;
  } catch (error) {
    console.error("Erro ao buscar os dados:", error);
  }
}

getUsuario();

async function excluirUsuario() {
  try {
    const url = window.location.href;
    const urlId = url.split("/").pop();

    const autor = document.querySelector("#nomeUsuario").textContent;
    const nome = document.querySelector("#nome").value;
    const dataFormatada = dataISO(); // função no final do script.

    const dataHistorico = {
      autor: autor,
      funcao: "Usuário",
      nome: nome,
      data: dataFormatada,
      hora: dataFormatada,
      acao: "excluido",
    };

    const responseUsuario = await axios.delete(
      `http://localhost:3000/usuario/${urlId}`
    );

    const responseHistorico = await axios.post(
      "http://localhost:3000/historico",
      dataHistorico
    );

    console.log("Resposta do servidor:", responseUsuario.data);
  } catch (error) {
    Swal.fire({
      text: error.responseUsuario.data.msg,
      icon: "error",
    });
    console.error("Erro ao excluir o usuario:", error);
  }
}

const botaoConfirmar = document.querySelector("#excluir");
botaoConfirmar.addEventListener("click", function () {
  Swal.fire({
    text: "Tem certeza que deseja excluir esse usuário?",
    icon: "warning",
    showCancelButton: true,
    reverseButtons: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    cancelButtonText: "Cancelar",
    confirmButtonText: "Excluir",
  }).then((result) => {
    if (result.isConfirmed) {
      excluirUsuario();

      Swal.fire({
        title: "Tudo certo.",
        text: "Usuário excluído com sucesso!",
        icon: "success",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "http://localhost:3001/admin/usuario";
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
