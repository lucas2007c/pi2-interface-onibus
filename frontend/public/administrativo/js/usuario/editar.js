document.addEventListener("DOMContentLoaded", async (event) => {
  const url = window.location.href;
  const urlId = url.split("/").pop();

  try {
    const response = await axios.get(
      `http://localhost:3000/usuario/${urlId}`
    );
    const usuario = response.data;
    var fotoCaminho = usuario.foto_caminho;

    document.querySelector("#nome").value = usuario.nome;
    document.querySelector("#email").value = usuario.email;
    document.querySelector("#senha").value = usuario.senha;
  } catch (error) {
    console.error("Erro ao buscar os dados:", error);
  }

  const form = document.querySelector("#form-usuario");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (form.checkValidity()) {
      let foto_caminho = "";
      
      const nome = document.querySelector("#nome").value;
      const email = document.querySelector("#email").value;
      const senha = document.querySelector("#senha").value;

      const inputFoto = document.querySelector("#foto_checkbox");

      if (inputFoto.checked) {
        foto_caminho = document.querySelector("#foto_caminho").value;
      } else {
        foto_caminho = fotoCaminho;
      }

      const data = { foto_caminho, nome, email, senha };

      try {
        const response = await axios.patch(
          `http://localhost:3000/usuario/${urlId}`,
          data
        );

        console.log("Dados atualizados com sucesso!");

        window.location.href = `http://localhost:3001/admin/usuario`;
      } catch (error) {
        console.error("Erro ao atualizar os dados:", error);
      }
    }

    form.classList.add("was-validated");
  });
});