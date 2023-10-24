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

      const data = { nome, origem, destino, horarioPartida, duracao };

      try {
        const response = await axios.post("http://localhost:3000/linha", data);

        console.log("success", "Cadastro realizado sucesso");

        window.location.href = `http://localhost:3001/admin/linha`;
      } catch (error) {
        console.error("danger", error.message);
      }
    }

    form.classList.add("was-validated");
  });
});
