//
// MBZUAI CS Department: Dynamic Research Dossier
// This script generates a personalized reading list for prospective students.
//
document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generate-dossier-btn');
    const selector = document.getElementById('interest-selector');
    const modal = document.getElementById('dossier-modal');
    const closeModalBtn = document.getElementById('close-dossier-btn');
    const resultsContainer = document.getElementById('dossier-results');

    if (!generateBtn) return; // Exit if the element isn't on this page

    const dossierData = {
        hardware: {
            title: "AI Hardware & Systems",
            faculty: ["Abdulrahman Mahmoud", "Chun Jason Xue"],
            publications: [
                "A Novel Approach to Fault Tolerance in AI Accelerators",
                "Calibrating Write Intensity for Next-Generation Non-Volatile Memories"
            ],
            concepts: ["AI Accelerators", "NVM", "High-Performance Computing"]
        },
        graphics: {
            title: "Computer Graphics & Vision",
            faculty: ["Lingqi Yan"],
            publications: ["Neural BRDFs for Real-Time Ray Tracing"],
            concepts: ["Neural Rendering", "Photorealism", "Real-Time Ray Tracing"]
        },
        security: {
            title: "Information Security",
            faculty: ["David Basin"],
            publications: ["Formal Methods for Secure System Design"],
            concepts: ["Verification", "Authentication", "Secure Systems"]
        }
    };

    const generateHTML = (key) => {
        const data = dossierData[key];
        if (!data) return `<p>Please select a valid interest.</p>`;

        let html = `<h2>Your Personalized Dossier: ${data.title}</h2>`;
        html += `<p>Here is a recommended starting point for exploring our work in this area.</p>`;
        
        html += `<h3>Key Faculty</h3><ul>${data.faculty.map(f => `<li>${f}</li>`).join('')}</ul>`;
        html += `<h3>Seminal Publications</h3><ul>${data.publications.map(p => `<li><em>${p}</em></li>`).join('')}</ul>`;
        html += `<h3>Related Concepts</h3><div class="dossier-tags">${data.concepts.map(c => `<span class="tag">${c}</span>`).join('')}</div>`;

        return html;
    };

    generateBtn.addEventListener('click', () => {
        const selectedInterest = selector.value;
        if (selectedInterest) {
            resultsContainer.innerHTML = generateHTML(selectedInterest);
            modal.removeAttribute('hidden');
        }
    });

    closeModalBtn.addEventListener('click', () => {
        modal.setAttribute('hidden', 'true');
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) { // Close if clicking on the background overlay
            modal.setAttribute('hidden', 'true');
        }
    });
});

// We need a tiny bit of extra CSS for the dossier content itself
const dossierStyles = `
    #dossier-results h2 { font-size: 1.8rem; color: var(--primary-color); }
    #dossier-results h3 { font-size: 1.3rem; color: var(--secondary-color); margin-top: 25px; border-bottom: 1px solid #eee; padding-bottom: 5px;}
    #dossier-results ul { list-style: none; padding-left: 0; }
    #dossier-results li { background: #f9f9f9; border-radius: 4px; padding: 10px; margin-bottom: 8px; }
    .dossier-tags { display: flex; flex-wrap: wrap; gap: 8px; }
    .tag { background: var(--secondary-color); color: #fff; padding: 5px 10px; border-radius: 20px; font-size: 0.9rem; }
`;
const styleSheet = document.createElement("style");
styleSheet.innerText = dossierStyles;
document.head.appendChild(styleSheet);