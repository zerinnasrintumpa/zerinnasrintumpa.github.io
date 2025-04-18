async function loadScholarData() {
    try {
        const res = await fetch('../resources/citations.json');
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        
        const profile_img = document.querySelector('.scholar-image');
        const total_citation = document.querySelector('.scholar .card-subtitle');
        const h_index = document.getElementById('hindex');
        const i_index = document.getElementById('index');
        const chart_space = document.getElementById('citationsChart')

        total_citation.textContent = "Total Citations: " + data['citedby'];
        h_index.textContent = "h-index: " + data['hindex'];
        i_index.textContent = "i-index: " + data['i10index'];
        profile_img.src = data['url_picture'];

        const per_year = Object
        .entries(data.cites_per_year)
        .map(([year, citations]) => ({
        year:   parseInt(year, 10),
        citations
        }))
        .sort((a, b) => a.year - b.year);

        // 2) Prepare labels & data arrays
        const labels = per_year.map(d => d.year);
        const values = per_year.map(d => d.citations);

        const maxVal = Math.max(...values);

        Chart.register(ChartDataLabels);

        const ctx = document
            .getElementById('citationsChart')
            .getContext('2d');

        new Chart(ctx, {
            type: 'bar',
            data: {
            labels,
            datasets: [{
                label: 'Citations per Year',
                data: values,
                backgroundColor: '#ffeaa7',
                borderColor: '#ffeaa7',
                borderWidth: 1
            }]
            },
            options: {
            responsive: true,
            plugins: {
                legend: { display: false },

                datalabels: {
                color: 'black',
                anchor: 'end',
                align: 'start',
                offset: -25,
                font: {size: 12 },
                formatter: value => value
                }
            },
            scales: {
                x: {
                title: { display: true, text: 'Year' },
                grid: { display: false }
                },
                y: {
                beginAtZero: true,
                title: { display: true, text: 'Citations' },
                    suggestedMax: maxVal * 1.05
                }
            }
            }
        }); 
    } catch (e) {
        console.error(e);
    }
}
loadScholarData();