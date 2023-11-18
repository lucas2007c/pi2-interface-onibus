async function getPassageiro() {
  const url = window.location.href;
  const urlId = url.split("/").pop();

  try {
    const response = await axios.get(`http://localhost:3000/passageiro/${urlId}`);

    const passageiro = response.data;

    document.querySelector("#usuarioId").value = passageiro.id;
    document.querySelector("#nome").value = passageiro.nome;
    document.querySelector("#cpf").value = passageiro.cpf;  
    document.querySelector("#numero").value = passageiro.numero;  
    document.querySelector("#email").value = passageiro.email;  
    document.querySelector("#tipo_cartao").value = passageiro.tipo_cartao;  
    document.querySelector("#saldo").value = passageiro.saldo;  
    document.querySelector("#codigo_cartao").value = passageiro.codigo_cartao;  
    document.querySelector(
      "#src_foto"
    ).src = `http://localhost:3000/${passageiro.foto_caminho}`;
  } catch (error) {
    console.error("Erro ao buscar os dados:", error);
  }
}

getPassageiro();
