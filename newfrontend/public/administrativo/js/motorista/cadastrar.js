document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#form-motorista");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (form.checkValidity()) {
      const nome = document.querySelector("#nome").value;
      const cpf = document.querySelector("#cpf").value;
      const email = document.querySelector("#email").value;
      const numero = document.querySelector("#numero").value;
      const foto_caminho = document.querySelector("#foto_caminho").value;

      const data = {
        nome,
        cpf,
        email,
        numero,
        foto_caminho,
      };

      try {
        const response = await axios.post(
          "http://localhost:3000/motorista",
          data
        );

        console.log("success", "Cadastro realizado sucesso");

        window.location.href = `http://localhost:3001/admin/motorista`;
      } catch (error) {
        console.error("danger", error.message);
      }
    }

    form.classList.add("was-validated");
  });
});

// Função para formatar o CPF
function formatarCPF(cpf) {
  // Remove qualquer caractere que não seja um dígito
  cpf = cpf.replace(/\D/g, "");

  // Adiciona os pontos e o traço
  cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");

  return cpf;
}

// Função para atualizar o valor do campo de CPF formatado
function updateCPF() {
  const cpfInput = document.getElementById("cpf");
  cpfInput.value = formatarCPF(cpfInput.value);
}

// Adicione um ouvinte de eventos para chamar a função updateCPF quando o campo é alterado
const cpfInput = document.getElementById("cpf");
cpfInput.addEventListener("input", updateCPF);
