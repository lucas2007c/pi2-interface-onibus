document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#form-passageiro");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (form.checkValidity()) {
      const formData = new FormData(form)

      try {
        const response = await axios.post(
          "http://localhost:3000/passageiro",
          formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
        );

        console.log(response.data.msg);

        window.location.href = `http://localhost:3001/admin/passageiro`;
      } catch (error) {
        console.error("danger", error.message);
      }
    }

    form.classList.add("was-validated");
  });
});
