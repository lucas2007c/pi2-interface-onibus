document.addEventListener("DOMContentLoaded", async (event) => {
  const url = window.location.href;
  const urlId = url.split("/").pop();

  try {
    const response = await axios.get(
      `http://localhost:3000/passageiro/${urlId}`
    );
    var passageiro = response.data;
    var passageiroFotoCaminho = passageiro.foto_caminho;

    document.querySelector("#nome").value = passageiro.nome;
    document.querySelector("#usuario").value = passageiro.usuario_id;
    document.querySelector("#cpf").value = passageiro.cpf;
    document.querySelector("#numero").value = passageiro.numero;
    document.querySelector("#email").value = passageiro.email;
    document.querySelector("#codigo_cartao").value = passageiro.codigo_cartao;
    if (passageiro.tipo_cartao == 'Comum') {
      document.querySelector("#tipo_cartao").selectedIndex = 0
    }
    if (passageiro.tipo_cartao == 'Idoso') {
      document.querySelector("#tipo_cartao").selectedIndex = 1
    }
    if (passageiro.tipo_cartao == 'Estudante') {
      document.querySelector("#tipo_cartao").selectedIndex = 2
    }
  } catch (error) {
    console.error("Erro ao buscar os dados:", error);
  }

  if(passageiro.tipo_cartao == 'Idoso' || passageiro.tipo_cartao == 'Estudante'){
    document.querySelector("#saldo").disabled = true;
  }

  const form = document.querySelector("#form-passageiro");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (form.checkValidity()) {
      const formData = new FormData(form);
      const usuarioID = document.querySelector('#usuario').value;
      formData.set("usuario_id", usuarioID);

      const inputFoto = document.querySelector("#foto_checkbox");

      if (!inputFoto.checked) {
        const novoValor = passageiroFotoCaminho;
        formData.set("foto_caminho", novoValor);
      }
      
      
      const saldo = formData.get('saldo')

      if(saldo > 0 && passageiro.tipo_cartao == 'Comum'){
        const cpf = document.querySelector("#cpf").value;
        const valor = document.querySelector("#saldo").value;
        const dataRecarga = {cpf, valor}
        await axios.patch("http://localhost:3000/recarga/", dataRecarga)
      }

      formData.delete('saldo')

      try {
        const response = await axios.patch(
          `http://localhost:3000/passageiro/${urlId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response) {
          Swal.fire({
            text: response.data.msg,
            icon: "success"
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.href = 'http://localhost:3001/admin/passageiro';
            }
          });
        }

        console.log("Dados atualizados com sucesso!");


      } catch (error) {
        Swal.fire({
          text: error.response.data.msg,
          icon: "error"
        });
        console.error("Erro ao atualizar os dados:", error);
      }
    }

    form.classList.add("was-validated");
  });
});
