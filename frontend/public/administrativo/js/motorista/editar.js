document.addEventListener("DOMContentLoaded", async (event) => {
  const url = window.location.href;
  const urlId = url.split("/").pop();

  try {
    const response = await axios.get(
      `http://localhost:3000/motorista/${urlId}`
    );
    const motorista = response.data;
    var fotoCaminho = motorista.foto_caminho;

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

    if (form.checkValidity()) {
      let foto_caminho = "";
      
      const nome = document.querySelector("#nome").value;
      const cpf = document.querySelector("#cpf").value;
      const numero = document.querySelector("#numero").value;
      const email = document.querySelector("#email").value;

      const inputFoto = document.querySelector("#foto_checkbox");

      if (inputFoto.checked) {
        foto_caminho = document.querySelector("#foto_caminho").value;
      } else {
        foto_caminho = fotoCaminho;
      }

      const data = { foto_caminho, nome, cpf, numero, email };

      try {
        const response = await axios.patch(
          `http://localhost:3000/motorista/${urlId}`,
          data
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