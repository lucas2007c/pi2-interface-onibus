document.addEventListener("DOMContentLoaded", async (event) => {
  const url = window.location.href;
  const urlId = url.split("/").pop();

  try {
    const response = await axios.get(
      `http://localhost:3000/passageiro/${urlId}`
    );
    const passageiro = response.data;
    const nome = document.querySelector("#liberado");
    const saldo = document.querySelector("#saldo");
    const tarifa = document.querySelector('#valor-cobrado');

    if (passageiro.tipo_cartao === "Comum" || passageiro.tipo_cartao === "Estudante") {
      nome.innerHTML = `Liberado, ${passageiro.nome}`;
      saldo.innerHTML = `Saldo atual: R$${passageiro.saldo}`;
      tarifa.innerHTML = `Valor cobrado: R$5,00`;
    } else {
      nome.innerHTML = `Liberado, ${passageiro.nome}`;
      saldo.innerHTML = `Saldo atual: R$${passageiro.saldo}`;
      tarifa.innerHTML = `Valor cobrado: Gratuito`;
    }
  } catch (error) {
    console.error("Erro ao buscar os dados:", error);
    window.location.href = `http://localhost:3001/catraca/error404/`;
  }
});
