$(document).ready(function () {
    $("#table").DataTable({
        language: {
            url: "//cdn.datatables.net/plug-ins/1.13.7/i18n/pt-BR.json",
        },
        ajax: {
            url: "http://localhost:3000/historico",
            dataSrc: "",
        },
        columns: [
            { data: "funcao" },
            { data: "nome" },
            { data: "autor" },
            {
                data: "data",
                render: function formatarData(data) {
                    data = data.split("T")[0];
                    const partes = data.split("-");
                    const dia = partes[2];
                    const mes = partes[1];
                    const ano = partes[0];

                    return `${dia}/${mes}/${ano}`
                },
            },
            {
                data: "hora",
                render: function formatarHorario(hora) {
                    hora = hora.split("T")[1].split(".")[0];
                    return hora
                },
            },
            {
                data: "acao",
                render: function formatarAcao(acao) {
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
            },
        ],
        order: [
            [2, 'desc'],  // Ordena pela coluna "data" de forma descendente
            [3, 'desc']    // Em seguida, ordena pela coluna "hora" de forma ascendente
        ]
    });
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
