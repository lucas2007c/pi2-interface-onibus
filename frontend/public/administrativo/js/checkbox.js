// Obtém uma referência para o elemento checkbox e o elemento de resultado
const checkbox = document.getElementById("foto_checkbox");

const inputFoto = document.querySelector("#foto_caminho");
const newInputFoto = inputFoto.cloneNode(true);
newInputFoto.removeAttribute("disabled");
newInputFoto.setAttribute("required", "true");


// Adiciona um ouvinte de evento "change" ao checkbox
checkbox.addEventListener("change", function () {
  if (checkbox.checked) {
    inputFoto.replaceWith(newInputFoto);
  } else {
    newInputFoto.replaceWith(inputFoto);
  }
});

const senhaCheckbox = document.getElementById("senha_checkbox");
if (senhaCheckbox) {
  const inputSenha = document.querySelector("#senha");
  const newInputSenha = inputSenha.cloneNode(true);
  newInputSenha.removeAttribute("disabled");
  newInputSenha.setAttribute("required", "true");

  // Adiciona um ouvinte de evento "change" ao checkbox de senha
  senhaCheckbox.addEventListener("change", function () {
    if (senhaCheckbox.checked) {
      inputSenha.replaceWith(newInputSenha);
      console.log("Input de senha foi clicado.");
    } else {
      newInputSenha.replaceWith(inputSenha);
    }
  });
}
