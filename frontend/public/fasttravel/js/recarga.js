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

        console.log(response.data.msg);
      } catch (error) {
        console.error(error.message);
      }
      const inputCpf = document.querySelector("#cpfRecarga");
      const inputValor = document.querySelector("#valorRecarga");
      setTimeout(() => {
        inputCpf.value = ''
        inputValor.value = ''
        form.classList.remove("was-validated");
      }, 1000);
    }
    form.classList.add("was-validated");
  });
});
