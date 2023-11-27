document.addEventListener("DOMContentLoaded", () => {

    const form = document.querySelector("#form-saldo");

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        if (form.checkValidity()) {
            const cpf = document.querySelector("#cpfRecarga").value;
            try {
                const response = await axios.get(`http://localhost:3000/passageiro/saldo/${cpf}`);
                if (response) {
                    Swal.fire({
                        text: response.data.msg,
                        icon: "info"
                    });
                }

            } catch (error) {
                Swal.fire({
                    text: error.response.data.msg,
                    icon: "error"
                });
                console.error(error.message);
            }

            const inputCpf = document.querySelector("#cpfRecarga");
            setTimeout(() => {
                inputCpf.value = ''
                form.classList.remove("was-validated");
            }, 1000);
        }
        form.classList.add("was-validated");
    });
});
