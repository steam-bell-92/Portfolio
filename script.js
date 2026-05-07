// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;

// Load saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    htmlElement.classList.add('light-mode');
}

// Theme toggle handler
themeToggle.addEventListener('click', () => {
    const isLight = htmlElement.classList.toggle('light-mode');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
});

// Mobile Menu
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const navMenu = document.querySelector('.nav-menu');
let isMobileMenuOpen = false;

mobileMenuBtn.addEventListener('click', () => {
    isMobileMenuOpen = !isMobileMenuOpen;
    if (isMobileMenuOpen) {
        // Create mobile menu overlay
        const menuOverlay = document.createElement('div');
        menuOverlay.className = 'mobile-menu-overlay';
        menuOverlay.innerHTML = `
            <div class="mobile-menu-content">
                <a href="#hero" class="nav-link">Home</a>
                <a href="#about" class="nav-link">About</a>
                <a href="#skills" class="nav-link">Skills</a>
                <a href="#blog" class="nav-link">Blog</a>
                <a href="#projects" class="nav-link">Projects</a>
            </div>
        `;
        document.body.appendChild(menuOverlay);
        
        // Close menu on link click
        menuOverlay.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                isMobileMenuOpen = false;
                menuOverlay.remove();
            });
        });
    }
});

// Particles Canvas
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');

let particles = [];
let mouseX = 0;
let mouseY = 0;

// Set canvas size
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 1.5;
        this.opacity = Math.random() * 0.5 + 0.2;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off walls
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

        // Keep particles in bounds
        this.x = Math.max(0, Math.min(this.x, canvas.width));
        this.y = Math.max(0, Math.min(this.y, canvas.height));
    }

    draw() {
        ctx.fillStyle = `rgba(99, 102, 241, ${this.opacity})`;
        ctx.fillRect(this.x, this.y, this.size, this.size);
    }
}

// Initialize particles
function initParticles() {
    particles = [];
    const particleCount = Math.floor((canvas.width * canvas.height) / 10000);
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
}
initParticles();

// Draw connections
function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
                ctx.strokeStyle = `rgba(99, 102, 241, ${0.1 * (1 - distance / 100)})`;
                ctx.lineWidth = 0.5;
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }
}

// Animation loop
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
    }
    
    drawConnections();
    requestAnimationFrame(animate);
}
animate();

// Mouse tracking for particle interaction
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // Repel particles from mouse
    particles.forEach(particle => {
        const dx = particle.x - mouseX;
        const dy = particle.y - mouseY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 150) {
            const angle = Math.atan2(dy, dx);
            const force = (150 - distance) / 150;
            particle.vx += Math.cos(angle) * force * 0.5;
            particle.vy += Math.sin(angle) * force * 0.5;
        }
    });
});

// Resize handler
window.addEventListener('resize', () => {
    resizeCanvas();
    initParticles();
});

// Header scroll shadow effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
        navbar.style.borderBottomColor = 'rgba(99, 102, 241, 0.2)';
        navbar.style.boxShadow = '0 4px 20px rgba(99, 102, 241, 0.1)';
    } else {
        navbar.style.borderBottomColor = 'rgba(255, 255, 255, 0.1)';
        navbar.style.boxShadow = 'none';
    }
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeIn 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    observer.observe(section);
});

// Contact Form Handler (guarded)
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    const formStatus = document.getElementById('form-status');

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        if (formStatus) {
            formStatus.textContent = 'Sending...';
            formStatus.style.color = '#cbd5e1';
        }

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                if (formStatus) {
                    formStatus.textContent = '✓ Message sent successfully!';
                    formStatus.style.color = '#10b981';
                }
                contactForm.reset();
                setTimeout(() => {
                    if (formStatus) formStatus.textContent = '';
                }, 5000);
            } else {
                if (formStatus) {
                    formStatus.textContent = '✗ Failed to send message. Try again.';
                    formStatus.style.color = '#ef4444';
                }
            }
        } catch (error) {
            if (formStatus) {
                formStatus.textContent = '✗ Error occurred. Please try again.';
                formStatus.style.color = '#ef4444';
            }
            console.error('Error:', error);
        }
    });
}

// Smooth scroll to sections
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Resume download: fetch the file and force a download (works around cross-origin download issues)
const resumeBtn = document.getElementById('download-resume');
if (resumeBtn) {
    resumeBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        const url = resumeBtn.href;
        try {
            const res = await fetch(url);
            if (!res.ok) throw new Error('Network response was not ok');
            const blob = await res.blob();
            const objectUrl = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = objectUrl;
            a.download = 'Anuj_Kulkarni_Resume.pdf';
            document.body.appendChild(a);
            a.click();
            a.remove();
            URL.revokeObjectURL(objectUrl);
        } catch (err) {
            // Fallback: navigate to the file (browser may handle download)
            window.location.href = url;
        }
    });
}