document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#form-recarga");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (form.checkValidity()) {
      const cpf = document.querySelector("#cpfRecarga").value;
      const valor = document.querySelector("#valorRecarga").value;

      const data = {
        cpf,
        valor
      };

      try {
        const response = await axios.patch(
          "http://localhost:3000/recarga/",
          data
        );

        console.log("success", "Cadastro realizado sucesso");
      } catch (error) {
        console.error(error.message);
      }
    }

    form.classList.add("was-validated");
  });
});
