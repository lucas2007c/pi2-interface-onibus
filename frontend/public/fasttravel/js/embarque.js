
document.addEventListener("DOMContentLoaded", () => {

    const form = document.querySelector("#form-embarque");
    const card = document.querySelector("#card");
    const titulo = document.querySelector("#titulo");
    const tabelaContainer = document.getElementById('lista-embarque');
    const divEmbarque = document.getElementById('tabelaEmbarques');

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        if (form.checkValidity()) {
            const cpf = document.querySelector("#cpfRecarga").value;

            try {
                const response = await axios.get(`http://localhost:3000/embarque/${cpf}`);

                const embarques = response.data;

                if (response) {

                    card.remove();

                    tabelaContainer.style.display = 'block';

                    for (let i = 0; i < embarques.length; i++) {

                        const embarque = embarques[i];

                        const idViagem = embarque.viagem_id;

                        const viagem = await axios.get(`http://localhost:3000/viagem/${idViagem}`);

                        const idLinha = viagem.data.linha_id;

                        const linha = await axios.get(`http://localhost:3000/linha/${idLinha}`);

                        const dataObj = new Date(embarque.data);

                        const dia = String(dataObj.getDate()).padStart(2, '0');
                        const mes = String(dataObj.getMonth() + 1).padStart(2, '0');
                        const ano = dataObj.getFullYear();

                        const dataFormatada = `${dia}/${mes}/${ano}`;

                        const hora = String(dataObj.getUTCHours()).padStart(2, '0');
                        const minuto = String(dataObj.getMinutes()).padStart(2, '0')
                        const segundos = String(dataObj.getSeconds()).padStart(2, '0');
                        const horarioFormatado = `${hora}:${minuto}:${segundos}`;

                        titulo.innerHTML = `Embarques encontrados:`

                        const row = document.createElement("li");
                        row.classList.add('mt-2')
                        row.innerHTML = `
                            
                          <table class="table table-hover table-condensed">
                              <thead>
                                  <tr class="cor-cabecalho">
                                      <th scope="col"></th>
                                      <th scope="col">Linha</th>
                                      <th scope="col">Data</th>
                                      <th scope="col">Horário</th>
                                  </tr>
                              </thead>
                              <tbody>
                                  <tr class="cor-cabecalho">
                                      <th scope="row"></th>
                                      <td>${linha.data.nome}</td>
                                      <td>${dataFormatada}</td>
                                      <td>${horarioFormatado}</td>
                                  </tr>
                              </tbody>
                          </table>
                          `;
                        divEmbarque.appendChild(row);
                    }
                } else {
                    Swal.fire({
                        text: error.response.data.msg,
                        icon: "error"
                    });
                }

            } catch (error) {
                console.error(error.message);
            }

            const inputCpf = document.querySelector("#cpfRecarga");
            setTimeout(() => {
                inputCpf.value = ''
                form.classList.remove("was-validated");
            }, 1000);
        }
        form.classList.add("was-validated");
    });
});

