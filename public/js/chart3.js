const ctx3 = document.getElementById('barChart3');



var chart = {
    type: 'bar',
    data: {
        labels: ['Twilight', 'Goku'],
        datasets: [{
            label: '# of Votes',
            data: [],
            borderWidth: 1,
            backgroundColor: [
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgb(234, 238, 240, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                'rgba(255, 99, 132, 0.2)',
            ],
        }]
    },
    options: {
        scales: {
            y: {
            beginAtZero: true
            }
        }
    }
};



let chart3 = new Chart(ctx3, chart);


async function addData(chart){


    fetch(url)
        .then((response) => response.json())
        .then((stats) => {
        let twiVal = stats.data.question_3.twilight;
        let gokuVal = stats.data.question_3.goku;

        let dataArray = [];

        dataArray.push(twiVal);
        dataArray.push(gokuVal);
        

        chart.data.datasets[0].data.push(dataArray[0]);
        chart.data.datasets[0].data.push(dataArray[1]);

        chart.update();
        })

        
        

}

addData(chart3);