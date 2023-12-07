const ctx3 = document.getElementById('barChart3');

new Chart(ctx3, {
    type: 'bar',
    data: {
        labels: ['Twilight', 'Goku'],
        datasets: [{
            label: '# of Votes',
            data: [12, 3],
            borderWidth: 1,
            backgroundColor: [
                'rgba(153, 102, 255, 0.2)',
                'rgba(10, 19, 27, 0.2)',
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