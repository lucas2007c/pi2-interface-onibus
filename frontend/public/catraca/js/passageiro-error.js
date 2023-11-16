document.addEventListener("DOMContentLoaded", async (event) => {
  const url = window.location.href;
  const urlId = url.split("/").pop();

  try {
    const response = await axios.get(
      `http://localhost:3000/passageiro/${urlId}`
    );
    const passageiro = response.data;
    const saldo = document.querySelector("#saldo");
    const tarifa = document.querySelector("#valor-cobrado");

    saldo.innerHTML = `Saldo atual: R$${passageiro.saldo}`;
    tarifa.innerHTML = `Valor cobrado: R$5,00`;
  } catch (error) {
    console.error("Erro ao buscar os dados:", error);
    window.location.href = `http://localhost:3001/catraca/error404/`;
  }
});
