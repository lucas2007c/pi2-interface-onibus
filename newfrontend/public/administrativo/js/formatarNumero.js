// NUMERO CELULAR

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
