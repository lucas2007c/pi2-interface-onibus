document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#form-usuario");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (form.checkValidity()) {
      const formData = new FormData(form)

      try {
        const response = await axios.post(
          "http://localhost:3000/usuario",
          formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
        );

        console.log(response.data.msg);
        if (location.href == 'http://localhost:3001/admin/cadastro') {
          location.href = `http://localhost:3001/admin/login`;
        } else {
          location.href = `http://localhost:3001/admin/usuario`;
        }
      } catch (error) {
        console.error("danger", error.message);
      }
    }

    form.classList.add("was-validated");
  });
});