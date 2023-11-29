document.addEventListener("DOMContentLoaded", () => {

    const form = document.querySelector("#form-embarque");

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        if (form.checkValidity()) {
            const cpf = document.querySelector("#cpfEmbarque").value;
            try {
                const response = await axios.get(`http://localhost:3000/embarque/${cpf}`);
                console.log(response.data[0].data)
                const idViagem = response.data[0].viagem_id;
                console.log(idViagem);
                const viagem = await axios.get(`http://localhost:3000/viagem/${idViagem}`);
                console.log(viagem)
                const idLinha = viagem.data.linha_id;
                console.log(idLinha);
                const linha = await axios.get(`http://localhost:3000/linha/${idLinha}`);
                console.log(linha)
                console.log(linha.data.nome)
                if (response) {
                    const tabelaEmbarques = document.querySelector("#tabela-embarques");
                        const row = document.createElement("li");
                        row.innerHTML = `
          <table class="table table-hover table-condensed">
              <thead>
                  <tr class="cor-cabecalho">
                      <th scope="col"></th>
                      <th scope="col">Linha</th>
                      <th scope="col">Data</th>
                      <th scope="col">Horário do embarque</th>
                  </tr>
              </thead>
              <tbody>
                  <tr class="cor-cabecalho">
                      <th scope="row"></th>
                      <td>${linha.data.nome}</td>
                      <td>${response.data}</td>
                      <td>${embarque.data}</td>
                  </tr>
              </tbody>
          </table>
          </div>`;
                        tabelaLinhas.appendChild(row);
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
