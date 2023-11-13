document.addEventListener("DOMContentLoaded", async (event) => {
  const url = window.location.href;
  const urlId = url.split("/").pop();

  try {
    const response = await axios.get(`http://localhost:3000/passageiro/${urlId}`);
    const passageiro = response.data;
    const nome = document.querySelector('#liberado');
    const saldo = document.querySelector("#saldo");

    nome.innerHTML = `Liberado, ${passageiro.nome}`;
    saldo.innerHTML = `Saldo atual: R$${passageiro.saldo}`;
  } catch (error) {
    console.error("Erro ao buscar os dados:", error);
  }
});