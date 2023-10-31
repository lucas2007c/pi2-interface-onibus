document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#form-motorista");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (form.checkValidity()) {
      const nome = document.querySelector("#nome").value;
      const cpf = document.querySelector("#cpf").value;
      const email = document.querySelector("#email").value;
      const numero = document.querySelector("#numero").value;
      const foto_caminho = document.querySelector("#foto_caminho").value;

      const data = {
        nome,
        cpf,
        email,
        numero,
        foto_caminho,
      };

      try {
        const response = await axios.post(
          "http://localhost:3000/motorista",
          data
        );

        console.log("success", "Cadastro realizado sucesso");

        window.location.href = `http://localhost:3001/admin/motorista`;
      } catch (error) {
        console.error("danger", error.message);
      }
    }

    form.classList.add("was-validated");
  });
});