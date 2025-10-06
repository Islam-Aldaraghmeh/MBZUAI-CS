//
// MBZUAI CS Department Website Interactivity
//
// This script adds a fade-in animation to elements as they enter the viewport.
//

document.addEventListener("DOMContentLoaded", () => {
    
    const fadeElems = document.querySelectorAll('.fade-in');

    const observerOptions = {
        root: null, // relative to the viewport
        rootMargin: '0px',
        threshold: 0.1 // 10% of the item must be visible to trigger
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: stop observing the element once it's visible
                // observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    fadeElems.forEach(elem => {
        observer.observe(elem);
    });

});