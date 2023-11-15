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
    const response = await axios.delete(
      `http://localhost:3000/motorista/${urlId}`
    );

    console.log("Resposta do servidor:", response.data);
    
  } catch (error) {
    Swal.fire({
      text: error.response.data.msg,
      icon: "error"
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
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    cancelButtonText: "Cancelar",
    confirmButtonText: "Excluir"
  }).then((result) => {
    if (result.isConfirmed) {

      excluirMotorista();

      Swal.fire({
        title: "Tudo certo.",
        text: "Motorista excluído com sucesso!",
        icon: "success"
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "http://localhost:3001/admin/motorista";
        }
      });
    }
  });
});

