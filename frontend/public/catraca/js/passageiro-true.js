document.addEventListener("DOMContentLoaded", async (event) => {
  const url = window.location.href;
  const urlId = url.split("/").pop();

  try {
    const responseGet = await axios.get(
      `http://localhost:3000/passageiro/${urlId}`
    );
    // console.log(responseGet);

    // manipulação dom
    const passageiro = responseGet.data;
    const nome = document.querySelector("#liberado");
    const saldo = document.querySelector("#saldo");
    const tarifa = document.querySelector("#valor-cobrado");
    const saldoFormatado = formatarDinheiro(passageiro.saldo);

    if (passageiro.tipo_cartao === "Comum") {
      nome.innerHTML = `Liberado, ${passageiro.nome}`;
      saldo.innerHTML = `Saldo atual: R$${saldoFormatado}`;
      tarifa.innerHTML = `Valor cobrado: R$5,00`;
    } else {
      nome.innerHTML = `Liberado, ${passageiro.nome}`;
      tarifa.innerHTML = `Valor cobrado: Gratuito`;
    }

    // criar embarque
    const tarifaEmbarque = localStorage.getItem("tarifa");

    // Formatando a data atual para o formato ISO 8601.
    const dataErrada = new Date();

    const dia = String(dataErrada.getDate()).padStart(2, '0');
    const mes = String(dataErrada.getMonth() + 1).padStart(2, '0');
    const ano = dataErrada.getFullYear();
    const horas = String(dataErrada.getHours()).padStart(2, '0');;
    const minutos = String(dataErrada.getMinutes()).padStart(2, '0');;
    const segundos = String(dataErrada.getSeconds()).padStart(2, '0');;

    const hhmmss = [horas, minutos, segundos].join(':');
    const dataAtualFormatada = `${ano}-${mes}-${dia}`
    const dataFormatada = `${dataAtualFormatada}T${hhmmss}.000Z`

    const viagem_id = localStorage.getItem("viagemId");
    const passageiro_id = passageiro.id;
    const data = {
      tarifa: tarifaEmbarque,
      data: dataFormatada,
      passageiro_id: passageiro_id,
      viagem_id: viagem_id,
    };

    const responsePost = await axios.post(
      "http://localhost:3000/embarque",
      data
    );
    localStorage.removeItem("tarifa");
    localStorage.removeItem("viagemId");

    setTimeout(function () {
      window.location.href = `http://localhost:3001/catraca/`;
    }, 5000);

    console.log(responsePost.data.msg);
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
