document.addEventListener("DOMContentLoaded", async (event) => {
  const url = window.location.href;
  const urlId = url.split("/").pop();

  try {
    const response = await axios.get(`http://localhost:3000/linha/${urlId}`);
    const linha = response.data;

    const horarioPartida = linha.horarioPartida.substring(11, 16);

    document.querySelector("#nome").value = linha.nome;
    document.querySelector("#origem").value = linha.origem;
    document.querySelector("#destino").value = linha.destino;
    document.querySelector("#horarioPartida").value = horarioPartida;
    document.querySelector("#duracao").value = linha.duracao;
  } catch (error) {
    console.error("Erro ao buscar os dados:", error);
  }

  const form = document.querySelector("#form-linha");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (form.checkValidity()) {
      const nome = document.querySelector("#nome").value;
      const origem = document.querySelector("#origem").value;
      const destino = document.querySelector("#destino").value;
      const horarioPartida = document.querySelector("#horarioPartida").value;
      const duracao = document.querySelector("#duracao").value;

      const data = { nome, origem, destino, horarioPartida, duracao };

      const autor = document.querySelector("#nomeUsuario").textContent;
      const dataFormatada = dataISO(); // função no final do script.

      const dataHistorico = {
        autor: autor,
        funcao: "Linha",
        nome: nome,
        data: dataFormatada,
        hora: dataFormatada,
        acao: "editado",
      };

      try {
        const responseLinha = await axios.patch(
          `http://localhost:3000/linha/${urlId}`,
          data
        );

        const responseHistorico = await axios.post(
          "http://localhost:3000/historico",
          dataHistorico
        );

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

        console.log("Dados atualizados com sucesso!");
      } catch (error) {
        Swal.fire({
          text: error.responseLinha.data.msg,
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
