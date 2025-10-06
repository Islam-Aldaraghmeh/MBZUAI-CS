//
// js/home.js
// Dynamically populates the homepage content from the central database.
//
document.addEventListener('DOMContentLoaded', () => {
    const researchContainer = document.getElementById('research-grid-container');
    const facultyContainer = document.getElementById('faculty-grid-container');

    // --- Populate Research Areas ---
    if (researchContainer && DB.researchAreas) {
        let researchHTML = '';
        DB.researchAreas.forEach(area => {
            const facultyNames = area.faculty.map(fid => {
                const fac = DB.faculty.find(f => f.id === fid);
                return fac ? fac.name.split(' ')[0] : ''; // Get first name
            }).join(', ');

            researchHTML += `
                <article class="research-card-enhanced">
                    <div class="research-card__content">
                        <h4>${area.name}</h4>
                        <div class="research-card__details">
                            <p>${area.description}</p>
                            <span class="research-card__faculty">Key Faculty: ${facultyNames}</span>
                        </div>
                    </div>
                </article>
            `;
        });
        researchContainer.innerHTML = researchHTML;
    }

    // --- Populate Faculty Preview (show first 5) ---
    if (facultyContainer && DB.faculty) {
        let facultyHTML = '';
        const facultySubset = DB.faculty.slice(0, 5); // Show a preview
        facultySubset.forEach(person => {
            facultyHTML += `
                <article class="faculty-card">
                    <img src="https://placehold.co/200x200/cccccc/ffffff?text=${person.img_slug}" alt="Portrait of ${person.name}">
                    <h3>${person.name}</h3>
                    <p>${person.title}</p>
                    <span>${person.focus.split(',')[0]}</span>
                </article>
            `;
        });
        facultyContainer.innerHTML = facultyHTML;
    }
});