document.addEventListener("DOMContentLoaded", async () => {
  const form = document.querySelector("#form-passageiro");
  const usuarioId = await verifyToken();
  document.querySelector('#usuario').value = usuarioId
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (form.checkValidity()) {
      const formData = new FormData(form)
      formData.set("usuario_id", usuarioId);
      try {
        const response = await axios.post(
          "http://localhost:3000/passageiro",
          formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
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

        console.log(response.data.msg);

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
