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
});
