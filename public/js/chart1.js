console.log("chart1.js is connected");

const ctx = document.getElementById('barChart');

new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Twilight', 'Applejack', 'Rainbowdash', 'Rarity', 'Fluttershy', 'Pinkie Pie'],
        datasets: [{
            label: '# of Votes',
            data: [{twiVal}, {appVal}, {rainbVal}, {rarVal}, {flutterVal}, {pinkVal}],
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
});

