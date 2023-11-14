document.addEventListener("DOMContentLoaded", async (event) => {
  const url = window.location.href;
  const urlId = url.split("/").pop();

  try {
    const response = await axios.get(
      `http://localhost:3000/motorista/${urlId}`
    );
    const motorista = response.data;
    var motoristaFotoCaminho = motorista.foto_caminho;

    document.querySelector("#nome").value = motorista.nome;
    document.querySelector("#cpf").value = motorista.cpf;
    document.querySelector("#numero").value = motorista.numero;
    document.querySelector("#email").value = motorista.email;
  } catch (error) {
    console.error("Erro ao buscar os dados:", error);
  }

  const form = document.querySelector("#form-motorista");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const inputFoto = document.querySelector("#foto_checkbox");

    if (form.checkValidity()) {
      const formData = new FormData(form);

      if (!inputFoto.checked) {
        const novoValor = motoristaFotoCaminho;
        formData.set("foto_caminho", novoValor);
      }

      const inputValue = formData.get("foto_caminho");
      console.log(inputValue);

      try {
        const response = await axios.patch(
          `http://localhost:3000/motorista/${urlId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log("Dados atualizados com sucesso!");

        window.location.href = `http://localhost:3001/admin/motorista`;
      } catch (error) {
        console.error("Erro ao atualizar os dados:", error);
      }
    }

    form.classList.add("was-validated");
  });
});
