// ----------------------------------------
// falta corrigir: o axios.put nao funciona porque é necessario enviar o usuario_id.

document.addEventListener("DOMContentLoaded", async (event) => {
  const url = window.location.href;
  const urlId = url.split("/").pop();

  try {
    const response = await axios.get(
      `http://localhost:3000/passageiro/${urlId}`
    );
    const passageiro = response.data;

    document.querySelector("#nome").value = passageiro.nome;
    document.querySelector("#cpf").value = passageiro.cpf;
    document.querySelector("#numero").value = passageiro.numero;
    document.querySelector("#saldo").value = passageiro.saldo;
    document.querySelector("#email").value = passageiro.email;
    document.querySelector("#foto_caminho").value = passageiro.foto_caminho;
    document.querySelector("#tipo_cartao").value = passageiro.tipo_cartao;
  } catch (error) {
    console.error("Erro ao buscar os dados:", error);
  }

  const form = document.querySelector("#form-passageiro");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (form.checkValidity()) {
      const nome = document.querySelector("#nome").value;
      const cpf = document.querySelector("#cpf").value;
      const numero = document.querySelector("#numero").value;
      const saldo = document.querySelector("#saldo").value;
      const email = document.querySelector("#email").value;
      const foto_caminho = document.querySelector("#foto_caminho").value;
      const tipo_cartao = document.querySelector("#tipo_cartao").value;

      const data = { nome, cpf, numero, saldo, email, foto_caminho, tipo_cartao };

      try {
        const response = await axios.put(
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