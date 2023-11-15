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
    const response = await axios.delete(
      `http://localhost:3000/onibus/${urlId}`
    );

    console.log("Resposta do servidor:", response.data);

  } catch (error) {
    Swal.fire({
      text: error.response.data.msg,
      icon: "error"
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
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    cancelButtonText: "Cancelar",
    confirmButtonText: "Excluir"
  }).then((result) => {
    if (result.isConfirmed) {

      excluirOnibus();

      Swal.fire({
        title: "Tudo certo.",
        text: "Ônibus excluído com sucesso!",
        icon: "success"
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "http://localhost:3001/admin/onibus";
        }
      });
    }
  });
});