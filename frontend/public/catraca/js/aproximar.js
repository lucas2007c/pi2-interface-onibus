document.addEventListener("DOMContentLoaded", async (event) => {
  const form = document.querySelector("#form-escondido");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const codigo_cartao = document.querySelector("#cartao_codigo").value;
    const data = { codigo_cartao };
    console.log(codigo_cartao);

    try {
      const response = await axios.post("http://localhost:3000/catraca", data);
      const passageiroId = response.data.passageiroId.id;

      console.log("Cartão válido");

      localStorage.setItem('viagemId', response.data.viagemId);
      localStorage.setItem('tarifa', response.data.tarifa);

      window.location.href = `http://localhost:3001/catraca/true/${passageiroId}`;
    } catch (error) {
      console.error("danger", error.message);
      if (error.response.data.passageiroId) {
        localStorage.setItem('passageiro', error.response.data.passageiroId.saldo);
      }
      localStorage.setItem('mensagem', error.response.data.msg);
      window.location.href = `http://localhost:3001/catraca/error`;
    }
  });
});
