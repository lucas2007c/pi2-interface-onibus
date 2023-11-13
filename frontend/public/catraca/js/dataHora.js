function formatarHorario() {
    const dataAtual = new Date();
    console.log(dataAtual);

    const dia = String(dataAtual.getDate()).padStart(2, '0');
    const mes = String(dataAtual.getMonth() + 1).padStart(2, '0');
    const ano = dataAtual.getFullYear();

    const data = document.querySelector('#data');
    data.innerHTML = `${dia}/${mes}/${ano}`;
    
    const hora = String(dataAtual.getHours()).padStart(2, '0');
    const minuto = String(dataAtual.getMinutes()).padStart(2, '0')

    const horario = document.querySelector('#horario');
    horario.innerHTML = `${hora}:${minuto}`;
}

formatarHorario();

setInterval(formatarHorario, 1000);