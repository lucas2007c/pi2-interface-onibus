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
    document.querySelector("#src_foto").src = `http://localhost:3000/${passageiro.foto_caminho}`;
  } catch (error) {
    console.error("Erro ao buscar os dados:", error);
  }
}

getPassageiro();

async function excluirPassageiro() {
  const url = window.location.href;
  const urlId = url.split("/").pop();

  try {
    const response = await axios.delete(
      `http://localhost:3000/passageiro/${urlId}`
    );

    console.log("Resposta do servidor:", response.data);

    
  } catch (error) {
    Swal.fire({
      text: error.response.data.msg,
      icon: "error"
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
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    cancelButtonText: "Cancelar",
    confirmButtonText: "Excluir"
  }).then((result) => {
    if (result.isConfirmed) {

      excluirPassageiro();

      Swal.fire({
        title: "Tudo certo.",
        text: "Passageiro excluído com sucesso!",
        icon: "success"
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "http://localhost:3001/admin/passageiro";
        }
      });
    }
  });
});
