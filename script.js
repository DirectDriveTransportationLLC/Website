// Initialize Lucide Icons
lucide.createIcons();

// Mobile Menu Toggle
function toggleMenu() {
    const menu = document.getElementById('mobileMenu');
    menu.classList.toggle('open');
}

// Navbar Scroll Effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.remove('bg-transparent', 'border-transparent');
        navbar.classList.add('bg-black/90', 'backdrop-blur-md', 'border-zinc-800');
    } else {
        navbar.classList.add('bg-transparent', 'border-transparent');
        navbar.classList.remove('bg-black/90', 'backdrop-blur-md', 'border-zinc-800');
    }
});

// Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in, .fade-left, .fade-right').forEach(el => {
    observer.observe(el);
});

// Counter Animation
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('.stat-counter');
            counters.forEach(counter => {
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 2000;
                const step = target / (duration / 16);
                let current = 0;

                const updateCounter = () => {
                    current += step;
                    if (current < target) {
                        counter.textContent = Math.floor(current).toLocaleString();
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target.toLocaleString();
                        if (counter.closest('.text-center').querySelector('.text-xs').textContent.includes('%')) {
                            counter.textContent = target + '%';
                        }
                        if (counter.closest('.text-center').querySelector('.text-xs').textContent.includes('Fleet')) {
                            counter.textContent = target + '+';
                        }
                        if (counter.closest('.text-center').querySelector('.text-xs').textContent.includes('Delivered')) {
                            counter.textContent = target.toLocaleString() + '+';
                        }
                    }
                };
                updateCounter();
            });
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stat-counter')?.closest('section');
if (statsSection) counterObserver.observe(statsSection);

// Form Submission
function handleSubmit(e) {
    e.preventDefault();
    const toast = document.getElementById('toast');
    toast.classList.add('show');

    // Reset form
    e.target.reset();

    // Hide toast after 4 seconds
    setTimeout(() => {
        toast.classList.remove('show');
    }, 4000);
}

// Close mobile menu on outside click
document.addEventListener('click', (e) => {
    const menu = document.getElementById('mobileMenu');
    const menuBtn = document.getElementById('menuBtn');
    if (menu.classList.contains('open') && !menu.contains(e.target) && !menuBtn.contains(e.target)) {
        toggleMenu();
    }
});

// Active nav link highlight on scroll
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('nav a[href^="#"]').forEach(link => {
        link.classList.remove('text-white');
        link.classList.add('text-zinc-400');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('text-white');
            link.classList.remove('text-zinc-400');
        }
    });
});