document.addEventListener("DOMContentLoaded", async (event) => {
  async function atualizarNumero() {
    try {
      const response = await axios.get(
        `http://localhost:3000/count/passageiro`
      );
      const passageiro = response.data;

      let h2Element = document.querySelector("#count-passageiro");
      h2Element.textContent = passageiro.msg;
    } catch (error) {
      console.error("Erro ao buscar os dados:", error);
    }
  }

  // Chame a função para atualizar o número a cada intervalo de milissegundos determinado (1000 milissegundos = 1 segundo).
  setInterval(atualizarNumero, 1000); // Altere o intervalo conforme necessário.
});
