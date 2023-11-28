(function (window, document, $, undefined) {
    "use strict";
    $(async function () {

        const response = await axios.get(`http://localhost:3000/count-tipos`)
        if ($('#chartjs_pie').length) {
            var ctx = document.getElementById("chartjs_pie").getContext('2d');
            var myChart = new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: ["Comum", "Estudante", "Idoso",],
                    datasets: [{
                        backgroundColor: [
                            "#5969ff",
                            "#ff407b",
                            "#25d5f2"
                        ],
                        data: response.data.tipos
                    }]
                },
                options: {
                    legend: {
                        display: true,
                        position: 'bottom',

                        labels: {
                            fontColor: '#71748d',
                            fontFamily: 'Circular Std Book',
                            fontSize: 14,
                        }
                    },


                }
            });
        }

    });

})(window, document, window.jQuery);