// Navigation Toggle
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

// Scroll Navigation Active Link Highlight
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                document.querySelector(`header nav a[href*="${id}"]`).classList.add('active');
            });
        }
    });

    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
};

// Typed Text
const typed = new Typed('.multiple-text', {
    strings: ['Web Developer', 'Frontend Developer', 'Backend Developer', 'Content Creator', 'Photographer'],
    typeSpeed: 60,
    backSpeed: 60,
    backDelay: 1000,
    loop: true
});

// ScrollReveal Animations
ScrollReveal({
    distance: '80px',
    duration: 2000,
    delay: 200
});

// Animations for header logo and navbar links
ScrollReveal().reveal('.header .logo', { origin: 'top', delay: 300 });
ScrollReveal().reveal('.navbar a', { origin: 'top', delay: 400, interval: 100 }); // Staggered animation for nav links

// Existing animations for other sections
ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
ScrollReveal().reveal('.home-img, .services-container, .skills-container, .contact form', { origin: 'bottom' });
ScrollReveal().reveal('.home-content h1, .about-img', { origin: 'left' });
ScrollReveal().reveal('.home-content p, .about-content', { origin: 'right' });
ScrollReveal().reveal('.reveal-left', { origin: 'left', distance: '50px', duration: 1500, delay: 200 });
ScrollReveal().reveal('.reveal-right', { origin: 'right', distance: '50px', duration: 1500, delay: 200 });

// Animate Skills on Scroll
document.addEventListener('DOMContentLoaded', () => {
    const skillsSection = document.querySelector('.skills');
    if (!skillsSection) return;

    const linearBars = document.querySelectorAll('.skill-progress');
    const circularBars = document.querySelectorAll('.circle-progress');

    // Set up initial widths for linear bars
    linearBars.forEach(bar => {
        const computedWidth = window.getComputedStyle(bar).width;
        bar.style.setProperty('--target-width', computedWidth);
        bar.style.width = '0';
    });

    // Set up observer
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate linear bars
                linearBars.forEach(bar => {
                    bar.classList.add('animate-linear');
                });

                // Animate circular progress (fill effect)
                circularBars.forEach(circle => {
                    const value = parseInt(circle.getAttribute('data-value'));
                    let current = 0;
                    const speed = 15; // adjust for animation speed

                    const interval = setInterval(() => {
                        const angle = (current / 100) * 360;
                        circle.style.background = `conic-gradient(var(--main-color) ${angle}deg, var(--snd-bg-color) 0deg)`;
                        circle.querySelector('.circle-value').textContent = `${current}%`;
                        current++;
                        if (current > value) clearInterval(interval);
                    }, speed);
                });

                observer.unobserve(skillsSection); // only animate once
            }
        });
    }, { threshold: 0.4 });

    observer.observe(skillsSection);
});