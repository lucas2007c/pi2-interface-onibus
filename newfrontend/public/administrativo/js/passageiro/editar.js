// ----------------------------------------
// falta corrigir: o axios.put nao funciona porque é necessario enviar o usuario_id.

document.addEventListener("DOMContentLoaded", async (event) => {
  const url = window.location.href;
  const urlId = url.split("/").pop();

  try {
    const response = await axios.get(
      `http://localhost:3000/passageiro/${urlId}`
    );
    const passageiro = response.data;

    document.querySelector("#nome").value = passageiro.nome;
    document.querySelector("#usuario").value = passageiro.usuario_id;
    document.querySelector("#cpf").value = passageiro.cpf;
    document.querySelector("#numero").value = passageiro.numero;
    document.querySelector("#email").value = passageiro.email;
    // document.querySelector("#foto_caminho").value = passageiro.foto_caminho;
    document.querySelector("#tipo_cartao").value = passageiro.tipo_cartao;
  } catch (error) {
    console.error("Erro ao buscar os dados:", error);
  }

  const form = document.querySelector("#form-passageiro");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (form.checkValidity()) {
      const usuario_id = document.querySelector("#usuario").value;
      const nome = document.querySelector("#nome").value;
      const cpf = document.querySelector("#cpf").value;
      const numero = document.querySelector("#numero").value;
      const email = document.querySelector("#email").value;
      const foto_caminho = document.querySelector("#foto_caminho").value;
      const tipo_cartao = document.querySelector("#tipo_cartao").value;

      const data = { usuario_id, nome, cpf, numero, email, foto_caminho, tipo_cartao };

      try {
        const response = await axios.patch(
          `http://localhost:3000/passageiro/${urlId}`,
          data
        );

        console.log("Dados atualizados com sucesso!");

        window.location.href = `http://localhost:3001/admin/passageiro`;
      } catch (error) {
        console.error("Erro ao atualizar os dados:", error);
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

// Função para formatar o numero de celular
function formatarNumero(numero) {
  // Remove qualquer caractere que não seja um dígito
  numero = numero.replace(/\D/g, "");

  // Adiciona os parenteses e o traço
  numero = numero.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");

  return numero;
}

// Função para atualizar o valor do campo de numero de celular formatado
function updateNumero() {
  const numeroInput = document.getElementById("numero");
  numeroInput.value = formatarNumero(numeroInput.value);
}

// Adicione um ouvinte de eventos para chamar a função updateNumero quando o campo é alterado
const numeroInput = document.getElementById("numero");
numeroInput.addEventListener("input", updateNumero);