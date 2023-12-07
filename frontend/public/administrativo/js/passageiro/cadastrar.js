document.addEventListener("DOMContentLoaded", async () => {
  const form = document.querySelector("#form-passageiro");
  const usuarioId = await verifyToken();
  document.querySelector("#usuario").value = usuarioId;
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (form.checkValidity()) {
      const formData = new FormData(form);

      formData.set("usuario_id", usuarioId);

      const autor = document.querySelector("#nomeUsuario").textContent;
      const nome = document.querySelector("#nome").value;
      const dataFormatada = dataISO(); // função no final do script.

      const dataHistorico = {
        autor: autor,
        funcao: "Passageiro",
        nome: nome,
        data: dataFormatada,
        hora: dataFormatada,
        acao: "cadastrado",
      };

      try {
        const responsePassageiro = await axios.post(
          "http://localhost:3000/passageiro",
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

        if (responsePassageiro) {
          Swal.fire({
            text: responsePassageiro.data.msg,
            icon: "success",
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.href = "http://localhost:3001/admin/passageiro";
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
