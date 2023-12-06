document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#form-onibus");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (form.checkValidity()) {
      const placa = document.querySelector("#placa").value;

      const dataOnibus = { placa };

      const autor = document.querySelector("#nomeUsuario").textContent;
      const dataFormatada = dataISO(); // função no final do script.

      const dataHistorico = {
        autor: autor,
        funcao: "Ônibus",
        nome: placa,
        data: dataFormatada,
        hora: dataFormatada,
        acao: "cadastrado",
      };

      try {
        const responseOnibus = await axios.post(
          "http://localhost:3000/onibus",
          dataOnibus
        );
        
        const responseHistorico = await axios.post(
          "http://localhost:3000/historico",
          dataHistorico
        );

        console.log("success", "Cadastro realizado sucesso");

        if (responseOnibus) {
          Swal.fire({
            text: responseOnibus.data.msg,
            icon: "success",
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.href = "http://localhost:3001/admin/onibus";
            }
          });
        }
      } catch (error) {
        Swal.fire({
          text: error.response.data.msg,
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