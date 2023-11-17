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

    if (passageiro.tipo_cartao === "Comum") {
      nome.innerHTML = `Liberado, ${passageiro.nome}`;
      saldo.innerHTML = `Saldo atual: R$${passageiro.saldo}`;
      tarifa.innerHTML = `Valor cobrado: R$5,00`;
    } else {
      nome.innerHTML = `Liberado, ${passageiro.nome}`;
      tarifa.innerHTML = `Valor cobrado: Gratuito`;
    }

    // criar embarque
    const tarifaEmbarque = localStorage.getItem("tarifa");

    // Formatando a data atual para o formato ISO 8601.
    const dataAtual = new Date();
    const horas = String(dataAtual.getHours()).padStart(2, "0");
    const minutos = String(dataAtual.getMinutes()).padStart(2, "0");
    const segundos = String(dataAtual.getSeconds()).padStart(2, "0");

    const dataIso = new Date().toISOString().split("T")[0];

    const dataFormatada = `${dataIso}T${horas}:${minutos}:${segundos}.000Z`;

    const viagem_id = localStorage.getItem("viagemId");
    const passageiro_id = passageiro.id;
    const data = {
      tarifa: tarifaEmbarque,
      data: dataFormatada,
      passageiro_id: passageiro_id,
      viagem_id: viagem_id,
    };

    const responsePost = await axios.post("http://localhost:3000/embarque", data);
    localStorage.removeItem("tarifa");
    localStorage.removeItem("viagemId");

    console.log(responsePost.data.msg);
  } catch (error) {
    console.error("Erro ao buscar os dados:", error);
    window.location.href = `http://localhost:3001/catraca/error404/`;
  }
});
