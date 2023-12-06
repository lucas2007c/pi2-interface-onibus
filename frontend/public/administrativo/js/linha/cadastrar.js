document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#form-linhas");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (form.checkValidity()) {
      const nome = document.querySelector("#nome").value;
      const origem = document.querySelector("#origem").value;
      const destino = document.querySelector("#destino").value;
      const horarioPartida = document.querySelector("#horarioPartida").value;
      const duracao = document.querySelector("#duracao").value;

      const dataLinha = { nome, origem, destino, horarioPartida, duracao };

      const autor = document.querySelector("#nomeUsuario").textContent;
      const dataFormatada = dataISO(); // função no final do script.

      const dataHistorico = {
        autor: autor,
        funcao: "Linha",
        nome: nome,
        data: dataFormatada,
        hora: dataFormatada,
        acao: "cadastrado",
      };

      try {
        const responseLinha = await axios.post(
          "http://localhost:3000/linha",
          dataLinha
        );

        const responseHistorico = await axios.post(
          "http://localhost:3000/historico",
          dataHistorico
        );

        console.log("success", "Cadastro realizado sucesso");

        if (responseLinha) {
          Swal.fire({
            text: responseLinha.data.msg,
            icon: "success",
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.href = "http://localhost:3001/admin/linha";
            }
          });
        }
      } catch (error) {
        Swal.fire({
          text: error.responseLinha.data.msg,
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
