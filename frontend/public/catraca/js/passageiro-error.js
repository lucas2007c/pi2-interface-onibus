document.addEventListener("DOMContentLoaded", async (event) => {
  try {
    const msg = document.querySelector("#msg");
    const saldo = document.querySelector("#saldo");
    const mensagem = localStorage.getItem("mensagem");
    const passageiroSaldo = localStorage.getItem("passageiro");
    const saldoFormatado = formatarDinheiro(passageiroSaldo);

    msg.innerHTML = mensagem;

    console.log(mensagem);
    if (mensagem == "Saldo insuficiente") {
      saldo.innerHTML = `Seu saldo atual é de R$${saldoFormatado}`;
    }

    localStorage.removeItem("mensagem");

    setTimeout(function () {
      window.location.href = `http://localhost:3001/catraca/`;
    }, 5000);
  } catch (error) {
    console.error("Erro ao buscar os dados:", error);
    window.location.href = `http://localhost:3001/catraca/errorServer`;
  }
});

function formatarDinheiro(valor) {
  // Arredonda o valor para duas casas decimais
  valor = Math.round(valor * 100) / 100;

  // Converte o valor para uma string com duas casas decimais
  let valorFormatado = valor.toFixed(2);

  // Substitui o ponto por vírgula, se necessário
  valorFormatado = valorFormatado.replace(".", ",");

  return valorFormatado;
}