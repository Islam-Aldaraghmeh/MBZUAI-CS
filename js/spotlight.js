//
// MBZUAI CS Department: Publication Spotlight Accordion
//
// This script handles the interactive expand/collapse functionality
// for the "Key Insights" section on the Research page.
//
document.addEventListener('DOMContentLoaded', () => {
    const publicationList = document.querySelector('.publications-list');
    
    // Use event delegation for efficiency
    if (publicationList) {
        publicationList.addEventListener('click', (event) => {
            const toggleButton = event.target.closest('.spotlight-toggle');
            
            if (!toggleButton) return; // Exit if the click was not on a button

            const publicationEntry = toggleButton.closest('.publication-entry');
            const spotlightPanel = publicationEntry.querySelector('.publication-spotlight');
            const isExpanded = toggleButton.getAttribute('aria-expanded') === 'true';

            // --- Toggle the state ---
            toggleButton.setAttribute('aria-expanded', !isExpanded);
            spotlightPanel.toggleAttribute('hidden');
            
            const icon = toggleButton.querySelector('.icon');

            if (!isExpanded) {
                // To open
                icon.textContent = '-';
                // Set max-height to the scrollHeight to trigger the CSS transition
                spotlightPanel.style.maxHeight = spotlightPanel.scrollHeight + 'px';
            } else {
                // To close
                icon.textContent = '+';
                spotlightPanel.style.maxHeight = '0px';
            }
        });
    }
});