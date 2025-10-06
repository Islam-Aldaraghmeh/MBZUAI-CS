//
// MBZUAI CS Department: Collaboration Nexus Graph (DATA-RICH Version)
// using Chart.js
//
document.addEventListener('DOMContentLoaded', () => {
    const ctx = document.getElementById('research-graph');
    if (!ctx) return;

    // --- NEW: High-Fidelity Data Model ---
    const data = {
        datasets: [
            { // Type 1: Faculty
                label: 'Faculty',
                data: [
                    { x: 4, y: 14, r: 20, name: 'A. Mahmoud' },
                    { x: 1, y: 5, r: 20, name: 'Hao Li' },
                    { x: 13, y: 13, r: 20, name: 'C. J. Xue' },
                    { x: 18, y: 9, r: 20, name: 'J. Bakita' },
                    { x: 17, y: 3, r: 20, name: 'D. Basin' },
                    { x: 4, y: 2, r: 20, name: 'L. Yan' },
                    { x: 9, y: 16, r: 20, name: 'Martin Takac' },
                    { x: 10, y: 1, r: 20, name: 'Kun Zhang' }
                ],
                backgroundColor: '#0281fb'
            },
            { // Type 2: Research Areas
                label: 'Research Areas',
                data: [
                    { x: 8, y: 11, r: 15, name: 'Systems' },
                    { x: 5, y: 7, r: 15, name: 'Hardware' },
                    { x: 4, y: 4, r: 15, name: 'Graphics & Vision' },
                    { x: 14, y: 6, r: 15, name: 'Security' },
                    { x: 9, y: 8, r: 15, name: 'Machine Learning' },
                    { x: 13, y: 1, r: 15, name: 'Theory & Foundations' }
                ],
                backgroundColor: '#445c64'
            },
            { // Type 3: Key Concepts
                label: 'Key Concepts',
                data: [
                    { x: 1, y: 12, r: 10, name: 'LLMs' }, { x: 16, y: 12, r: 10, name: 'NVM' },
                    { x: 19, y: 6, r: 10, name: 'Real-Time Systems' }, { x: 1, y: 2, r: 10, name: 'Neural Rendering' },
                    { x: 12, y: 17, r: 10, name: 'Optimization' }, { x: 7, y: 3, r: 10, name: 'Causal Discovery' }
                ],
                backgroundColor: '#888888'
            }
        ]
    };
    // --- NEW: Comprehensive Connections ---
    const connections = [
        ['A. Mahmoud', 'Systems'], ['A. Mahmoud', 'Hardware'], ['A. Mahmoud', 'LLMs'],
        ['Hao Li', 'Graphics & Vision'], ['Hao Li', 'Neural Rendering'], ['Hao Li', 'Machine Learning'],
        ['C. J. Xue', 'Systems'], ['C. J. Xue', 'NVM'],
        ['J. Bakita', 'Systems'], ['J. Bakita', 'Real-Time Systems'],
        ['D. Basin', 'Security'], ['D. Basin', 'Systems'], ['D. Basin', 'Theory & Foundations'],
        ['L. Yan', 'Graphics & Vision'], ['L. Yan', 'Neural Rendering'],
        ['Martin Takac', 'Machine Learning'], ['Martin Takac', 'Optimization'],
        ['Kun Zhang', 'Machine Learning'], ['Kun Zhang', 'Causal Discovery'], ['Kun Zhang', 'Theory & Foundations'],
        // Inter-area connections
        ['Hardware', 'Systems'], ['Graphics & Vision', 'Hardware'], ['Security', 'Systems'],
        ['Machine Learning', 'Systems'], ['Machine Learning', 'Graphics & Vision'], ['Optimization', 'LLMs']
    ];
    
    // The rest of the code (plugin and config) remains the same
    const nexusLinesPlugin = { /* ... as before ... */ }; // Placeholder, full code below
    const config = { /* ... as before ... */ }; // Placeholder, full code below

    // --- The code from here down is the same, but included for completeness ---
    const nexusLinesPluginImpl = {
        id: 'nexusLines',
        beforeDraw: (chart) => {
            const ctx = chart.ctx;
            ctx.save();
            const points = {};
            chart.data.datasets.forEach((dataset, i) => {
                const meta = chart.getDatasetMeta(i);
                meta.data.forEach((element, index) => {
                    const pointData = dataset.data[index];
                    points[pointData.name] = { x: element.x, y: element.y };
                });
            });

            ctx.strokeStyle = '#e0e0e0';
            ctx.lineWidth = 1.5;
            connections.forEach(([from, to]) => {
                const fromPoint = points[from];
                const toPoint = points[to];
                if (fromPoint && toPoint) {
                    ctx.beginPath();
                    ctx.moveTo(fromPoint.x, fromPoint.y);
                    ctx.lineTo(toPoint.x, toPoint.y);
                    ctx.stroke();
                }
            });
            ctx.restore();
        }
    };
    const finalConfig = {
        type: 'bubble', data: data,
        options: {
            responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false }, tooltip: { callbacks: { label: (c) => c.raw.name } } },
            scales: { x: { display: false, min: 0, max: 20 }, y: { display: false, min: 0, max: 18 } }, // Adjusted for new layout
            onHover: (event, chartElement) => { event.native.target.style.cursor = chartElement[0] ? 'pointer' : 'default'; }
        },
        plugins: [nexusLinesPluginImpl]
    };
    new Chart(ctx, finalConfig);
});