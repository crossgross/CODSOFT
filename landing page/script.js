const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

const aboutSection = document.querySelector('.about-us');

// Function to check if an element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Function to handle scroll event
function onScroll() {
    if (!isInViewport(aboutSection)) {
        aboutSection.classList.add('fade-background'); // Add fade-background class when section is not in viewport
    } else {
        aboutSection.classList.remove('fade-background'); // Remove fade-background class when section is in viewport
    }
}

// Add scroll event listener
window.addEventListener('scroll', onScroll);