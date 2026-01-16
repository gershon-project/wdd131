// temples.js - JavaScript for Temple Album Page

// Footer copyright year and last modified date
const currentYearSpan = document.getElementById('currentyear');
const lastModifiedParagraph = document.getElementById('lastModified');

if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
}

if (lastModifiedParagraph) {
    lastModifiedParagraph.textContent = `Last Modified: ${document.lastModified}`;
}

// Hamburger menu functionality
const menuButton = document.getElementById('menu-button');
const nav = document.querySelector('nav');

if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
        nav.classList.toggle('open');
        
        // Toggle between hamburger and X
        if (nav.classList.contains('open')) {
            menuButton.textContent = '✕';
        } else {
            menuButton.textContent = '☰';
        }
    });
}

// Temple filtering functionality
const navLinks = document.querySelectorAll('nav a');
const figures = document.querySelectorAll('figure');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Remove active class from all links
        navLinks.forEach(l => l.classList.remove('active'));
        
        // Add active class to clicked link
        link.classList.add('active');
        
        const filter = link.getAttribute('data-filter');
        
        // Show all temples if Home is clicked
        if (!filter) {
            figures.forEach(figure => {
                figure.classList.remove('hidden');
            });
            return;
        }
        
        // Filter temples based on criteria
        figures.forEach(figure => {
            const year = parseInt(figure.getAttribute('data-year'));
            const size = figure.getAttribute('data-size');
            
            let shouldShow = false;
            
            if (filter === 'old' && year < 1900) {
                shouldShow = true;
            } else if (filter === 'new' && year > 2000) {
                shouldShow = true;
            } else if (filter === 'large' && size === 'large') {
                shouldShow = true;
            } else if (filter === 'small' && size === 'small') {
                shouldShow = true;
            }
            
            if (shouldShow) {
                figure.classList.remove('hidden');
            } else {
                figure.classList.add('hidden');
            }
        });
        
        // Close mobile menu after selection
        if (nav.classList.contains('open')) {
            nav.classList.remove('open');
            menuButton.textContent = '☰';
        }
    });
});