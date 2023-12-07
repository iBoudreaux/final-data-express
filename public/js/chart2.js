const ctx2 = document.getElementById('barChart2');

var chart = {
    type: 'bar',
    data: {
        labels: ["Twilight's", "Applejack's", "Rainbowdash's", "Rarity's", "Fluttershy's", "Pinkie's"],
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


let chart2 = new Chart(ctx2, chart);


async function addData(chart){


    fetch(url)
        .then((response) => response.json())
        .then((stats) => {
        let twiVal = stats.data.question_2.twilights;
        let appVal = stats.data.question_2.applejacks;
        let rainbVal = stats.data.question_2.rainbowdashs;
        let rarVal = stats.data.question_2.raritys;
        let flutterVal = stats.data.question_2.fluttershys;
        let pinkVal = stats.data.question_2.pinkiepies;

        let dataArray = [];

        dataArray.push(twiVal);
        dataArray.push(appVal);
        dataArray.push(rainbVal);
        dataArray.push(rarVal);
        dataArray.push(flutterVal);
        dataArray.push(pinkVal);

        chart.data.datasets[0].data.push(dataArray[0]);
        chart.data.datasets[0].data.push(dataArray[1]);
        chart.data.datasets[0].data.push(dataArray[2]);
        chart.data.datasets[0].data.push(dataArray[3]);
        chart.data.datasets[0].data.push(dataArray[4]);
        chart.data.datasets[0].data.push(dataArray[5]);


        chart.update();
        })

        
        

}

addData(chart2);