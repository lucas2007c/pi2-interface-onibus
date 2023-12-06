document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#form-motorista");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (form.checkValidity()) {
      const formData = new FormData(form);

      const autor = document.querySelector("#nomeUsuario").textContent;
      const nome = document.querySelector("#nome").value;
      const dataFormatada = dataISO(); // função no final do script.

      const dataHistorico = {
        autor: autor,
        funcao: "Motorista",
        nome: nome,
        data: dataFormatada,
        hora: dataFormatada,
        acao: "cadastrado",
      };

      try {
        const responseMotorista = await axios.post(
          "http://localhost:3000/motorista",
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

        console.log("success", "Cadastro realizado sucesso");
      } catch (error) {
        Swal.fire({
          text: error.responseMotorista.data.msg,
          icon: "error",
        });

        console.error("danger", error.message);
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
