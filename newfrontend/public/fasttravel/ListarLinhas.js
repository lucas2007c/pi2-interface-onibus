function formatarHorario(data) {
    const date = new Date(data);
    const horaLocal = date.getHours() + date.getTimezoneOffset() / 60;
    const minutos = date.getMinutes();
    return `${horaLocal < 10 ? "0" + horaLocal : horaLocal}:${minutos < 10 ? "0" + minutos : minutos
        }`;
}


async function fetchLinhas() {
    try {
        const response = await axios.get("http://localhost:3000/linha");
        const linhas = response.data;

        const tabelaLinhas = document.querySelector("#tabela-linhas");

        linhas.forEach((linha) => {
            const horarioPartida = formatarHorario(linha.horarioPartida);
            const row = document.createElement("tr");
            row.innerHTML = `
    <td>${linha.nome}</td>
    <td>${linha.origem}</td>
    <td>${linha.destino}</td>
    <td>${horarioPartida}</td>
    <td>${linha.duracao}</td>`;
            tabelaLinhas.appendChild(row);
        });
    } catch (error) {
        console.error("Erro ao buscar os dados:", error);
    }
}

fetchLinhas();