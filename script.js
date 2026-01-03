document.addEventListener('DOMContentLoaded', () => {
    // Fade-in animation observer
    const fadeElements = document.querySelectorAll('.fade-in');

    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => observer.observe(el));

    // Dynamic background cursor movement for a subtle interactive effect
    const cursorGlow = document.querySelector('.cursor-glow');
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX;
        const y = e.clientY;

        // Use requestAnimationFrame for performance
        requestAnimationFrame(() => {
            cursorGlow.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(197, 164, 91, 0.08) 0%, transparent 50%)`;
        });
    });

    // Carousel Logic
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    const nextButton = document.querySelector('.next-btn');
    const prevButton = document.querySelector('.prev-btn');

    let currentSlideIndex = 0;

    const updateSlide = (index) => {
        // Hide all slides
        slides.forEach(slide => {
            slide.classList.remove('current-slide');
            slide.style.opacity = '0';
            slide.style.zIndex = '0';
        });

        // Show current slide
        slides[index].classList.add('current-slide');
        slides[index].style.opacity = '1';
        slides[index].style.zIndex = '1';
    };

    nextButton.addEventListener('click', () => {
        currentSlideIndex = (currentSlideIndex + 1) % slides.length;
        updateSlide(currentSlideIndex);
    });

    prevButton.addEventListener('click', () => {
        currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
        updateSlide(currentSlideIndex);
    });
    // Active Navigation Scroll Spy
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links li a');

    const scrollObserverOptions = {
        threshold: 0.3, // Trigger when 30% of target is visible
        rootMargin: "-100px 0px -50px 0px" // Adjust for navbar height
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                
                // Special case for split grid sections sharing the same viewport area
                // We trust the structure that 'skills' come before 'certificates', etc.
                // But generally, the ID maps directly.
                
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, scrollObserverOptions);

    sections.forEach(section => {
        scrollObserver.observe(section);
    });

    // Also observe the split-grid parts if they are targeted by nav
    // Looking at HTML, "Key Skills" -> #skills (inside split-grid)
    // "Certificates" -> #certificates (inside split-grid)
    // We should observe these specific IDs as well if they aren't 'sections'
    const subSections = document.querySelectorAll('.split-grid > div[id]');
    subSections.forEach(el => scrollObserver.observe(el));
});
