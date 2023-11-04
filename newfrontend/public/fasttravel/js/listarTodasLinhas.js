function formatarHorario(data) {
    const date = new Date(data);
    const horaLocal = date.getHours() + date.getTimezoneOffset() / 60;
    const minutos = date.getMinutes();
    return `${horaLocal < 10 ? "0" + horaLocal : horaLocal}:${
      minutos < 10 ? "0" + minutos : minutos
    }`;
  }
  
  async function fetchLinhas() {
    try {
      const response = await axios.get("http://localhost:3000/linha");
      const linhas = response.data;
  
      const tabelaLinhas = document.querySelector("#tabela-linhas");
  
      for (let i = 0; i < linhas.length; i++) {
          const linha = linhas[i];
          const horarioPartida = formatarHorario(linha.horarioPartida);
          const row = document.createElement("li");
          row.innerHTML = `
          <i class="bx bx-bus icon-help"></i>
          <a data-bs-toggle="collapse" class="collapsed" data-bs-target="#faq-list-${linha.id}">
          (${linha.id}) ${linha.nome}
            <i class="bx bx-chevron-down icon-show"></i>
            <i class="bx bx-chevron-up icon-close"></i>
          </a>
          <div id="faq-list-${linha.id}" class="collapse" data-bs-parent=".faq-list">
            <table class="table table-hover table-condensed">
                <thead>
                    <tr class="cor-cabecalho">
                        <th scope="col"></th>
                        <th scope="col">Origem</th>
                        <th scope="col">Destino</th>
                        <th scope="col">Horário da partida</th>
                        <th scope="col">Intervalo</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="cor-cabecalho">
                        <th scope="row"></th>
                        <td>${linha.origem}</td>
                        <td>${linha.destino}</td>
                        <td>${horarioPartida}</td>
                        <td>${linha.duracao} min</td>
                    </tr>
                </tbody>
            </table>
            </div>`;
          tabelaLinhas.appendChild(row);
        }      
    } catch (error) {
      console.error("Erro ao buscar os dados:", error);
    }
  }
  
  fetchLinhas();  