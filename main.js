// Main JavaScript
import './style.css'

console.log('ZOZ Innovations Website Loaded');

// Smooth scroll for anchor links (if browser support needed, but CSS handles most)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
