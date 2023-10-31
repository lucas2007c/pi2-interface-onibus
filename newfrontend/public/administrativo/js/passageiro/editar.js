document.addEventListener("DOMContentLoaded", async (event) => {
  const url = window.location.href;
  const urlId = url.split("/").pop();

  try {
    const response = await axios.get(
      `http://localhost:3000/passageiro/${urlId}`
    );
    const passageiro = response.data;
    var fotoCaminho = passageiro.foto_caminho;

    document.querySelector("#nome").value = passageiro.nome;
    document.querySelector("#usuario").value = passageiro.usuario_id;
    document.querySelector("#cpf").value = passageiro.cpf;
    document.querySelector("#numero").value = passageiro.numero;
    document.querySelector("#email").value = passageiro.email;
    document.querySelector("#tipo_cartao").value = passageiro.tipo_cartao;
  } catch (error) {
    console.error("Erro ao buscar os dados:", error);
  }

  const form = document.querySelector("#form-passageiro");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (form.checkValidity()) {
      let foto_caminho = "";

      const usuario_id = document.querySelector("#usuario").value;
      const nome = document.querySelector("#nome").value;
      const cpf = document.querySelector("#cpf").value;
      const numero = document.querySelector("#numero").value;
      const email = document.querySelector("#email").value;
      const tipo_cartao = document.querySelector("#tipo_cartao").value;

      const inputFoto = document.querySelector("#foto_checkbox");

      if (inputFoto.checked) {
        foto_caminho = document.querySelector("#foto_caminho").value;
      } else {
        foto_caminho = fotoCaminho;
      }

      const data = { usuario_id, nome, cpf, numero, email, foto_caminho, tipo_cartao };

      try {
        const response = await axios.patch(
          `http://localhost:3000/passageiro/${urlId}`,
          data
        );

        console.log("Dados atualizados com sucesso!");

        window.location.href = `http://localhost:3001/admin/passageiro`;
      } catch (error) {
        console.error("Erro ao atualizar os dados:", error);
      }
    }

    form.classList.add("was-validated");
  });
});