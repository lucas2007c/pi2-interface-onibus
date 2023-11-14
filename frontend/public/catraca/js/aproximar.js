document.addEventListener("DOMContentLoaded", async (event) => {
  const form = document.querySelector("#form-escondido");

  form.addEventListener("submit", async (event) => {
    console.log('oi');
    const codigo_cartao = document.querySelector("#cartao_codigo").value;
    const data = { codigo_cartao };

    try {
      const response = await axios.post("http://localhost:3000/asdsad", data);

      console.log("success", "Cartão válido");

      window.location.href = `http://localhost:3001/catraca/true`;
    } catch (error) {
      window.location.href = `http://localhost:3001/catraca/error`;
      console.error("danger", error.message);
    }
  });
});
