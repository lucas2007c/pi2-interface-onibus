// document.addEventListener("DOMContentLoaded", async (event) => {
//   displayFlashMessage();

//   const url = window.location.href;
//   const urlId = url.split("/").pop();

//   try {
//     const response = await axios.get(`http://localhost:3000/api/linhas/buscar/${urlId}`);
//     const linha = response.data;

//     const horarioPartida = linha.horarioPartida.substring(11, 16);

//     document.querySelector("#id").value = linha.id;
//     document.querySelector("#nome").value = linha.nome;
//     document.querySelector("#origem").value = linha.origem;
//     document.querySelector("#destino").value = linha.destino;
//     document.querySelector("#horarioPartida").value = horarioPartida;
//     document.querySelector("#duracao").value = linha.duracao;
//   } catch (error) {
//     triggerFlashMessage("danger", error.message);
//   }

//   const form = document.querySelector("#linhaOnibusForm");
//   form.addEventListener("submit", async (event) => {
//     event.preventDefault();

//     if (form.checkValidity()) {
//         const id = document.querySelector("#id").value;
//         const nome = document.querySelector("#nome").value;
//         const origem = document.querySelector("#origem").value;
//         const destino = document.querySelector("#destino").value;
//         const horarioPartida = document.querySelector("#horarioPartida").value;
//         const duracao = document.querySelector("#duracao").value;

//         const data = { id, nome, origem, destino, horarioPartida, duracao };

//         try {
//           const response = await axios.put(`http://localhost:3000/api/linhas/editar/${data.id}`, data);

//           storeFlashMessage("success", "Edição realizada com sucesso");

//           const id = response.data.id;        
//           window.location.href = `http://localhost:3001/linhas/exibir/${id}`;         
//         } catch (error) {
//           triggerFlashMessage("danger", error.message);
//         }
//     }

//     form.classList.add("was-validated");
//   });
// });

// ------------------

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

      try {
        const response = await axios.patch(
          `http://localhost:3000/linha/${urlId}`,
          data
        );

        console.log("Dados atualizados com sucesso!");

        window.location.href = `http://localhost:3001/admin/linha`;
      } catch (error) {
        console.error("Erro ao atualizar os dados:", error);
      }
    }

    form.classList.add("was-validated");
  });
});
