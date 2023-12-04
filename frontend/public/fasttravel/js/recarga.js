

document.addEventListener("DOMContentLoaded", () => {

  const form = document.querySelector("#form-recarga");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (form.checkValidity()) {
      const cpf = document.querySelector("#cpfRecarga").value;
      const valor = document.querySelector("#valorRecarga").value;

      const data = {
        cpf,
        valor
      };


      try {
        const passageiro = await axios.get(`http://localhost:3000/passageiro/saldo/${cpf}`);

        if (passageiro.data.passageiro.tipo_cartao == 'Comum') {
          const response = await axios.patch(
            "http://localhost:3000/recarga/",
            data
          );

          if (response) {
            Swal.fire({
              text: response.data.msg,
              icon: "success"
            });
          }
        }

        if (passageiro.data.passageiro.tipo_cartao == 'Idoso' || passageiro.data.passageiro.tipo_cartao == 'Estudante')
          Swal.fire({
            text: 'Passageiros com cartões do tipo estudante e idoso não precisam se preocupar com o saldo.',
            icon: "info"
          });

      } catch (error) {
        Swal.fire({
          text: error.response.data.msg,
          icon: "error"
        });
        console.error(error.message);
      }

      const inputCpf = document.querySelector("#cpfRecarga");
      const inputValor = document.querySelector("#valorRecarga");
      setTimeout(() => {
        inputCpf.value = ''
        inputValor.value = ''
        form.classList.remove("was-validated");
      }, 1000);
    }
    form.classList.add("was-validated");
  });
});
