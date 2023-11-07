document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#form-passageiro");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (form.checkValidity()) {
      const nome = document.querySelector("#nome").value;
      const saldo = 100;
      const cpf = document.querySelector("#cpf").value;
      const email = document.querySelector("#email").value;
      const numero = document.querySelector("#numero").value;
      const foto_caminho = document.querySelector("#foto_caminho").value;
      const tipo_cartao = document.querySelector("#tipo_cartao").value;
      const codigo_cartao = document.querySelector("#codigo_cartao").value;
      const usuario_id = document.querySelector("#usuario").value;

      const data = {
        nome,
        saldo,
        cpf,
        email,
        numero,
        foto_caminho,
        tipo_cartao,
        codigo_cartao,
        usuario_id,
      };

      try {
        const response = await axios.post(
          "http://localhost:3000/passageiro",
          data
        );

        console.log("success", "Cadastro realizado sucesso");

        window.location.href = `http://localhost:3001/admin/passageiro`;
      } catch (error) {
        console.error("danger", error.message);
      }
    }

    form.classList.add("was-validated");
  });
});
