async function getOnibus() {
  const url = window.location.href;
  const urlId = url.split("/").pop();

  try {
    const response = await axios.get(`http://localhost:3000/onibus/${urlId}`);

    const onibus = response.data;

    document.querySelector("#onibusId").value = onibus.id;
    document.querySelector("#placa").value = onibus.placa;
  } catch (error) {
    console.error("Erro ao buscar os dados:", error);
  }
}

getOnibus();
