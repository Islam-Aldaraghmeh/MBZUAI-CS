//
// MBZUAI CS Department: Semantic Search Hub Simulation
//
// This script simulates an AI-powered search for the design competition.
// It listens for user input and injects pre-defined, relevant HTML results.
//

document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById('semantic-search-input');
    const searchButton = document.getElementById('semantic-search-button');
    const resultsContainer = document.getElementById('semantic-search-results');

    // --- The "AI" Brain: A map of keywords to results ---
    const knowledgeBase = {
        // Keyword: "hardware"
        hardware: {
            query: "robust AI hardware",
            results: [
                {
                    type: 'person',
                    title: 'Abdulrahman Mahmoud',
                    description: 'Assistant Professor focusing on reliable and high-performance computing systems for AI.',
                },
                {
                    type: 'publication',
                    title: 'A Novel Approach to Fault Tolerance in AI Accelerators',
                    description: 'Published in ISCA 2024. Explores new methods for ensuring hardware robustness.'
                }
            ]
        },
        // Keyword: "graphics"
        graphics: {
            query: "photorealistic rendering",
            results: [
                 {
                    type: 'person',
                    title: 'Lingqi Yan',
                    description: 'Associate Professor specializing in computer graphics, light transport algorithms, and neural-aided rendering.',
                },
                 {
                    type: 'publication',
                    title: 'Neural BRDFs for Real-Time Ray Tracing',
                    description: 'Published in SIGGRAPH 2024. Leverages AI for unprecedented visual fidelity.'
                }
            ]
        },
        // Default catch-all
        default: {
            query: "our work",
            results: [
                {
                    type: 'person',
                    title: 'David Basin',
                    description: 'Affiliated Professor working on the foundations of information security and reliable systems.',
                },
                 {
                    type: 'person',
                    title: 'Joshua Bakita',
                    description: 'Assistant Professor with impactful research in GPU Scheduling and Real-Time Systems.',
                }
            ]
        }
    };

    const performSearch = () => {
        const query = searchInput.value.toLowerCase().trim();
        if (!query) return;

        let resultData;
        if (query.includes('hardware') || query.includes('robust')) {
            resultData = knowledgeBase.hardware;
        } else if (query.includes('graphics') || query.includes('rendering')) {
            resultData = knowledgeBase.graphics;
        } else {
            resultData = knowledgeBase.default;
        }
        
        displayResults(resultData);
    };

    const displayResults = (data) => {
        // Clear previous results
        resultsContainer.innerHTML = '';
        resultsContainer.classList.remove('visible');

        // Build new results
        let resultsHTML = `<h3 class="search-results__header">Relevant to "<strong>${data.query}</strong>":</h3>`;
        
        data.results.forEach(item => {
            const iconClass = item.type === 'person' ? 'person' : 'publication';
            const iconInitial = item.type === 'person' ? 'P' : 'D'; // Person / Document
            resultsHTML += `
                <div class="result-card">
                    <div class="result-card__icon result-card__icon--${iconClass}">
                        <span>${iconInitial}</span>
                    </div>
                    <div class="result-card__content">
                        <div class="result-card__tag">${item.type}</div>
                        <h4>${item.title}</h4>
                        <p>${item.description}</p>
                    </div>
                </div>
            `;
        });

        resultsContainer.innerHTML = resultsHTML;

        // Animate the results into view
        setTimeout(() => {
            resultsContainer.classList.add('visible');
        }, 100);
    };


    // Event Listeners
    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            performSearch();
        }
    });
});