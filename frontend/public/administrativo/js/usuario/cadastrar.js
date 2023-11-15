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

        if (response) {
          Swal.fire({
            text: response.data.msg,
            icon: "success"
          }).then((result) => {
            if (result.isConfirmed) {
              if (location.href == 'http://localhost:3001/admin/cadastro') {
                location.href = `http://localhost:3001/admin/login`;
              } else {
                location.href = `http://localhost:3001/admin/usuario`;
              }
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

function mostrarSenha() {
  var x = document.getElementById("senha");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}