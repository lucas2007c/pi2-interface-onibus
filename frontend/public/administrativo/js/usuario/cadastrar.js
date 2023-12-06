document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#form-usuario");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (form.checkValidity()) {
      const formData = new FormData(form);

      const nome = document.querySelector("#nome").value;
      try {
        var autor = document.querySelector("#nomeUsuario").textContent;
      } catch (error) {
        autor = nome
      }

      const dataFormatada = dataISO(); // função no final do script.
      const dataHistorico = {
        autor: autor,
        funcao: "Usuário",
        nome: nome,
        data: dataFormatada,
        hora: dataFormatada,
        acao: "cadastrado",
      };

      try {
        const responseUsuario = await axios.post(
          "http://localhost:3000/usuario",
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
              if (location.href == "http://localhost:3001/admin/cadastro") {
                location.href = `http://localhost:3001/admin/login`;
              } else {
                location.href = `http://localhost:3001/admin/usuario`;
              }
            }
          });
        }

        console.log(responseUsuario.data.msg);
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

function mostrarSenha() {
  var x = document.getElementById("senha");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}

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
