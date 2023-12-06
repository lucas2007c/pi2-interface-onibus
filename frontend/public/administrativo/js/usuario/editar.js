document.addEventListener("DOMContentLoaded", async (event) => {
  const url = window.location.href;
  const urlId = url.split("/").pop();

  try {
    const response = await axios.get(`http://localhost:3000/usuario/${urlId}`);
    const usuario = response.data;
    var usuarioFotoCaminho = usuario.foto_caminho;

    document.querySelector("#nome").value = usuario.nome;
    document.querySelector("#email").value = usuario.email;
  } catch (error) {
    console.error("Erro ao buscar os dados:", error);
  }

  const form = document.querySelector("#form-usuario");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (form.checkValidity()) {
      const formData = new FormData(form);

      const inputFoto = document.querySelector("#foto_checkbox");

      if (!inputFoto.checked) {
        const novoValor = usuarioFotoCaminho;
        formData.set("foto_caminho", novoValor);
      }

      const autor = document.querySelector("#nomeUsuario").textContent;
      const nome = document.querySelector("#nome").value;
      const dataFormatada = dataISO(); // função no final do script.

      const dataHistorico = {
        autor: autor,
        funcao: "Usuário",
        nome: nome,
        data: dataFormatada,
        hora: dataFormatada,
        acao: "editado",
      };

      try {
        const responseUsuario = await axios.patch(
          `http://localhost:3000/usuario/${urlId}`,
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

        if (responseUsuario) {
          Swal.fire({
            text: responseUsuario.data.msg,
            icon: "success",
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.href = "http://localhost:3001/admin/usuario";
            }
          });
        }
        console.log("Dados atualizados com sucesso!");
      } catch (error) {
        Swal.fire({
          text: error.responseUsuario.data.msg,
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
