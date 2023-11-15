document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#form-motorista");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (form.checkValidity()) {
      const formData = new FormData(form);

      try {
        const response = await axios.post(
          "http://localhost:3000/motorista",
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
              window.location.href = 'http://localhost:3001/admin/motorista';
            }
          });
        }

        console.log("success", "Cadastro realizado sucesso");

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
