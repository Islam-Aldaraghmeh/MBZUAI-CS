//
// MBZUAI CS Department: People Page Nexus Integration (FINAL Version with LABELS)
// This script creates a balanced, symmetrical graph with connections AND clear text labels.
//
document.addEventListener('DOMContentLoaded', () => {
    // --- Global Data (Single Source of Truth) ---
    const allNodes = {
        'A. Mahmoud': { r: 20, type: 1, fullName: 'Abdulrahman Mahmoud' }, 'Hao Li': { r: 20, type: 1, fullName: 'Hao Li' }, 'C. J. Xue': { r: 20, type: 1, fullName: 'Chun Jason Xue' }, 'J. Bakita': { r: 20, type: 1, fullName: 'Joshua Bakita' }, 'D. Basin': { r: 20, type: 1, fullName: 'David Basin' }, 'L. Yan': { r: 20, type: 1, fullName: 'Lingqi Yan' }, 'Martin Takac': { r: 20, type: 1, fullName: 'Martin Takac' }, 'Kun Zhang': { r: 20, type: 1, fullName: 'Kun Zhang' },
        'Systems': { r: 15, type: 2 }, 'Hardware': { r: 15, type: 2 }, 'Graphics & Vision': { r: 15, type: 2 }, 'Security': { r: 15, type: 2 }, 'Machine Learning': { r: 15, type: 2 }, 'Theory & Foundations': { r: 15, type: 2 },
        'LLMs': { r: 10, type: 3 }, 'NVM': { r: 10, type: 3 }, 'Real-Time Systems': { r: 10, type: 3 }, 'Neural Rendering': { r: 10, type: 3 }, 'Optimization': { r: 10, type: 3 }, 'Causal Discovery': { r: 10, type: 3 },
    };
    const connections = [
        ['A. Mahmoud', 'Systems'], ['A. Mahmoud', 'Hardware'], ['A. Mahmoud', 'LLMs'],
        ['Hao Li', 'Graphics & Vision'], ['Hao Li', 'Neural Rendering'], ['Hao Li', 'Machine Learning'],
        ['C. J. Xue', 'Systems'], ['C. J. Xue', 'NVM'],
        ['J. Bakita', 'Systems'], ['J. Bakita', 'Real-Time Systems'],
        ['D. Basin', 'Security'], ['D. Basin', 'Systems'], ['D. Basin', 'Theory & Foundations'],
        ['L. Yan', 'Graphics & Vision'], ['L. Yan', 'Neural Rendering'],
        ['Martin Takac', 'Machine Learning'], ['Martin Takac', 'Optimization'],
        ['Kun Zhang', 'Machine Learning'], ['Kun Zhang', 'Causal Discovery'], ['Kun Zhang', 'Theory & Foundations'],
        ['Hardware', 'Systems'], ['Graphics & Vision', 'Hardware'], ['Security', 'Systems'],
        ['Machine Learning', 'Systems'], ['Machine Learning', 'Graphics & Vision'], ['Optimization', 'LLMs']
    ];

    const modal = document.getElementById('nexus-modal');
    if (!modal) return;

    const closeModalBtn = modal.querySelector('.nexus-modal-close');
    const titleElement = document.getElementById('nexus-modal-title');
    const canvas = document.getElementById('nexus-graph-modal');
    const triggerButtons = document.querySelectorAll('.nexus-trigger-btn');
    let nexusChartInstance = null;

    // --- Plugin 1: Draws the connection lines in the background ---
    const nexusLinesPlugin = {
        id: 'nexusLines',
        beforeDatasetsDraw: (chart) => {
            const ctx = chart.ctx;
            const pointMap = new Map();
            for (let i = 0; i < chart.data.datasets.length; i++) {
                const meta = chart.getDatasetMeta(i);
                for (let j = 0; j < meta.data.length; j++) {
                    pointMap.set(chart.data.datasets[i].data[j].name, meta.data[j]);
                }
            }
            ctx.save();
            ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)';
            ctx.lineWidth = 1.5;
            connections.forEach(([from, to]) => {
                const fromPoint = pointMap.get(from);
                const toPoint = pointMap.get(to);
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

    // --- **NEW** Plugin 2: Draws the text labels on top ---
    const nexusLabelsPlugin = {
        id: 'nexusLabels',
        afterDatasetsDraw: (chart) => {
            const ctx = chart.ctx;
            ctx.save();
            ctx.font = '12px "Inter", sans-serif';
            ctx.fillStyle = '#333';
            ctx.textAlign = 'center';

            for (let i = 0; i < chart.data.datasets.length; i++) {
                const meta = chart.getDatasetMeta(i);
                for (let j = 0; j < meta.data.length; j++) {
                    const node = chart.data.datasets[i].data[j];
                    const element = meta.data[j];
                    const yOffset = node.r + 14; // Offset text based on circle radius
                    ctx.fillText(node.name, element.x, element.y + yOffset);
                }
            }
            ctx.restore();
        }
    };

    const generateSymmetricalLayout = (focusId, neighbors) => {
        // ... (Layout engine is unchanged) ...
        const nodes = [];
        const angleStep = (2 * Math.PI) / neighbors.length;
        const radius = 3.5;
        nodes.push({ ...allNodes[focusId], name: focusId, x: 5, y: 5 });
        neighbors.forEach((id, index) => {
            const angle = angleStep * index;
            const x = 5 + radius * Math.cos(angle);
            const y = 5 + radius * Math.sin(angle);
            nodes.push({ ...allNodes[id], name: id, x, y });
        });
        return nodes;
    };
    
    const getNodeColor = (type, isFocus) => {
        // ... (Color function is unchanged) ...
        if (isFocus) return '#ff4500';
        if (type === 1) return '#0281fb';
        if (type === 2) return '#445c64';
        return '#888888';
    };

    const openModalWithGraph = (facultyId) => {
        // ... (Data generation logic is unchanged) ...
        const neighborIds = new Set();
        connections.forEach(([from, to]) => { if (from === facultyId) neighborIds.add(to); if (to === facultyId) neighborIds.add(from); });
        const layoutNodes = generateSymmetricalLayout(facultyId, Array.from(neighborIds));
        const datasets = [{ data: [] }, { data: [] }, { data: [] }];
        layoutNodes.forEach(node => { datasets[node.type - 1].data.push(node); });
        datasets.forEach((ds, i) => { ds.backgroundColor = ds.data.map(node => getNodeColor(i + 1, node.name === facultyId)); });

        const facultyFullName = allNodes[facultyId]?.fullName || facultyId;
        titleElement.textContent = `Collaboration Nexus for ${facultyFullName}`;

        if (nexusChartInstance) {
            nexusChartInstance.data.datasets = datasets;
            nexusChartInstance.update();
        } else {
            const config = {
                type: 'bubble',
                data: { datasets },
                options: {
                    responsive: true, maintainAspectRatio: false, layout: { padding: 40 }, // Increased padding for labels
                    plugins: { legend: { display: false }, tooltip: { enabled: false } }, // Disable tooltip as labels are now permanent
                    scales: { x: { min: 0, max: 10, display: false }, y: { min: 0, max: 10, display: false } },
                    animation: { duration: 0 }
                },
                // **REGISTER BOTH PLUGINS**
                plugins: [nexusLinesPlugin, nexusLabelsPlugin]
            };
            nexusChartInstance = new Chart(canvas, config);
        }
        modal.removeAttribute('hidden');
    };

    triggerButtons.forEach(button => button.addEventListener('click', () => openModalWithGraph(button.dataset.facultyId)));
    closeModalBtn.addEventListener('click', () => modal.setAttribute('hidden', 'true'));
    modal.addEventListener('click', (e) => { if (e.target === modal) modal.setAttribute('hidden', 'true'); });
});