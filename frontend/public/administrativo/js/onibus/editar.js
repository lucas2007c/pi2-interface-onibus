document.addEventListener("DOMContentLoaded", async (event) => {
  const url = window.location.href;
  const urlId = url.split("/").pop();

  try {
    const response = await axios.get(`http://localhost:3000/onibus/${urlId}`);
    const onibus = response.data;

    document.querySelector("#placa").value = onibus.placa;
  } catch (error) {
    console.error("Erro ao buscar os dados:", error);
  }

  const form = document.querySelector("#form-onibus");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (form.checkValidity()) {
      const placa = document.querySelector("#placa").value;

      const dataOnibus = { placa };

      const autor = document.querySelector("#nomeUsuario").textContent;
      const dataFormatada = dataISO();

      const dataHistorico = {
        autor: autor,
        funcao: "Ônibus",
        nome: placa,
        data: dataFormatada,
        hora: dataFormatada,
        acao: "editado",
      };

      try {
        const responseOnibus = await axios.patch(
          `http://localhost:3000/onibus/${urlId}`,
          dataOnibus
        );

        const responseHistorico = await axios.post(
          "http://localhost:3000/historico",
          dataHistorico
        );

        console.log("Dados atualizados com sucesso!");

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
          text: error.responseOnibus.data.msg,
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
