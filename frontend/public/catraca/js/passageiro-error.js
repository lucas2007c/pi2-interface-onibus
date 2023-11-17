document.addEventListener("DOMContentLoaded", async (event) => {
  const url = window.location.href;
  const urlId = url.split("/").pop();

  try {

    const msg = document.querySelector("#msg");
    const saldo = document.querySelector("#saldo");
    const mensagem = localStorage.getItem('mensagem')
    const passageiroSaldo = localStorage.getItem('passageiro')

    msg.innerHTML = mensagem
    console.log(mensagem);
    if (mensagem == 'Saldo insuficiente') {
      saldo.innerHTML = `seu saldo atual é de R$${passageiroSaldo}`
    }
    localStorage.removeItem('mensagem')
  } catch (error) {
    console.error("Erro ao buscar os dados:", error);
    window.location.href = `http://localhost:3001/catraca/errorServer`;
  }
});
