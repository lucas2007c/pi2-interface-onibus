

document.addEventListener("DOMContentLoaded", () => {

    const form = document.querySelector("#form-embarque");
    const card = document.querySelector("#card");
    const h2 = document.querySelector("#titulo");
    const tabelaContainer = document.getElementById('lista-embarque');
    const divEmbarque = document.getElementById('tabelaEmbarques');

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        if (form.checkValidity()) {
            const cpf = document.querySelector("#cpfEmbarque").value;
            try {
                const response = await axios.get(`http://localhost:3000/embarque/${cpf}`);
                const idViagem = response.data[0].viagem_id;
                const viagem = await axios.get(`http://localhost:3000/viagem/${idViagem}`);
                const idLinha = viagem.data.linha_id;
                const linha = await axios.get(`http://localhost:3000/linha/${idLinha}`);
                const embarques = response.data;
                
                if (response) {
                    card.remove();
                    tabelaContainer.style.display = 'block';
                    titulo.innerHTML = `Embarques encontrados:`;


                    for (let i = 0; i < embarques.length; i++) {
                        const embarque = embarques[i];
                        const row = document.createElement("li");
                        row.innerHTML = `
                    
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
                                      <td>$linha.origem}</td>
                                      <td>$linha.destino}</td>
                                      <td>$horarioPartida}</td>
                                      <td>$linha.duracao} min</td>
                                  </tr>
                              </tbody>
                          </table>
                        
                          `;
                        divEmbarque.appendChild(row);
                      }      
                }

            } catch (error) {
                Swal.fire({
                    text: error.response.data.msg,
                    icon: "error"
                });
                console.error(error.message);
            }

            const inputCpf = document.querySelector("#cpfEmbarque");
            setTimeout(() => {
                inputCpf.value = ''
                form.classList.remove("was-validated");
            }, 1000);
        }
        form.classList.add("was-validated");
    });
});
