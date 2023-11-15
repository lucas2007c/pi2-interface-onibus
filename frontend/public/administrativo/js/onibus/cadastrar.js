document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#form-onibus");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (form.checkValidity()) {
      const placa = document.querySelector("#placa").value;

      const data = { placa };

      try {
        const response = await axios.post("http://localhost:3000/onibus", data);

        console.log("success", "Cadastro realizado sucesso");

        if (response) {
          Swal.fire({
            text: response.data.msg,
            icon: "success"
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.href = 'http://localhost:3001/admin/onibus';
            }
          });
        }
      } catch (error) {

        Swal.fire({
          text: error.response.data.msg,
          icon: "error"
        });

        console.error("danger", error.message);
      }
    }

    form.classList.add("was-validated");
  });
});
