// CPF

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
    const cpfInput = document.getElementById("cpfRecarga");
    cpfInput.value = formatarCPF(cpfInput.value);
  }
  
  // Adicione um ouvinte de eventos para chamar a função updateCPF quando o campo é alterado
  const cpfInput = document.getElementById("cpfRecarga");
  cpfInput.addEventListener("input", updateCPF);
  