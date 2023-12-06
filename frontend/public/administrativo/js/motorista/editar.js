document.addEventListener("DOMContentLoaded", async (event) => {
  const url = window.location.href;
  const urlId = url.split("/").pop();

  try {
    const response = await axios.get(
      `http://localhost:3000/motorista/${urlId}`
    );
    const motorista = response.data;
    var motoristaFotoCaminho = motorista.foto_caminho;

    document.querySelector("#nome").value = motorista.nome;
    document.querySelector("#cpf").value = motorista.cpf;
    document.querySelector("#numero").value = motorista.numero;
    document.querySelector("#email").value = motorista.email;
  } catch (error) {
    console.error("Erro ao buscar os dados:", error);
  }

  const form = document.querySelector("#form-motorista");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const inputFoto = document.querySelector("#foto_checkbox");

    if (form.checkValidity()) {
      const formData = new FormData(form);

      if (!inputFoto.checked) {
        const novoValor = motoristaFotoCaminho;
        formData.set("foto_caminho", novoValor);
      }

      const autor = document.querySelector("#nomeUsuario").textContent;
      const nome = document.querySelector("#nome").value;
      const dataFormatada = dataISO(); // função no final do script.

      const dataHistorico = {
        autor: autor,
        funcao: "Motorista",
        nome: nome,
        data: dataFormatada,
        hora: dataFormatada,
        acao: "editado",
      };

      try {
        const responseMotorista = await axios.patch(
          `http://localhost:3000/motorista/${urlId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        const responseHistorico = await axios.post(
          "http://localhost:3000/historico",
          dataHistorico
        );

        if (responseMotorista) {
          Swal.fire({
            text: responseMotorista.data.msg,
            icon: "success",
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.href = "http://localhost:3001/admin/motorista";
            }
          });
        }

        console.log("Dados atualizados com sucesso!");
      } catch (error) {
        Swal.fire({
          text: error.responseMotorista.data.msg,
          icon: "error",
        });

        console.error("Erro ao atualizar os dados:", error);
      }
    }

    form.classList.add("was-validated");
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
