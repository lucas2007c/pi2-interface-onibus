document.addEventListener("DOMContentLoaded", async (event) => {
    const table = document.querySelector('#table-historico')
    try {
        const response = await axios.get('http://localhost:3000/historico/recentes')
        const historico = response.data

        if (historico.length == 0) {
            const tr = document.createElement('tr')
            tr.innerHTML = '<td colspan="6" class="text-center">Nenhum registro encontrado</td>'
            table.appendChild(tr)
        }

        historico.forEach((acao) => {
            const data = acao.data.split("T")[0];
            const hora = acao.hora.split("T")[1].split(".")[0];
            const acaoTable = formatarAcao(acao.acao)
            const tr = document.createElement('tr')
            tr.innerHTML =
                `
                <td>${acao.funcao}</td>
                <td>${acao.nome}</td>
                <td>${acao.autor}</td>
                <td>${data}</td>
                <td>${hora}</td>
                <td>${acaoTable}</td>
                `
            table.appendChild(tr)
        });
    } catch (error) {
        console.error("Erro ao buscar os dados:", error);
    }
});

const formatarAcao = (acao) => {
    if (acao == 'cadastrado') {
        return '<span class="badge-dot badge-success mr-2"></span>Cadastrado'
    }

    if (acao == 'excluido') {
        return '<span class="badge-dot badge-danger mr-2"></span>Excluido'
    }

    if (acao == 'editado') {
        return '<span class="badge-dot badge-primary mr-2"></span>Editado'
    }
}