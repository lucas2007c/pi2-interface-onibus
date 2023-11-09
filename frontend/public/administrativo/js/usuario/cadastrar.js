document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#form-usuario");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (form.checkValidity()) {
      const nome = document.querySelector("#nome").value;
      const email = document.querySelector("#email").value;
      const senha = document.querySelector("#senha").value;
      const foto_caminho = document.querySelector("#foto_caminho").value;

      const data = {
        nome,
        email,
        senha,
        foto_caminho,
      };

      try {
        const response = await axios.post(
          "http://localhost:3000/usuario",
          data
        );

        console.log("success", "Cadastro realizado sucesso");

        window.location.href = `http://localhost:3001/admin/usuario`;
      } catch (error) {
        console.error("danger", error.message);
      }
    }

    form.classList.add("was-validated");
  });
});