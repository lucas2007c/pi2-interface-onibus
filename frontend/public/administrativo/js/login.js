document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("#form-login");

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        if (form.checkValidity()) {
            const email = document.querySelector("#email").value;
            const senha = document.querySelector("#senha").value;

            const data = { email, senha };

            try {
                const response = await axios.post("http://localhost:3000/auth/login", data);
                const { token } = response.data;

                localStorage.setItem('token', token);

                window.location.href = `http://localhost:3001/admin`;
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