// Initialize Feather icons (replaces data-feather elements)
// Guarded in case the CDN fails to load
if (window.feather) {
    feather.replace();
}

// Mobile Menu
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
let isMobileMenuOpen = false;
let menuOverlay = null;
let previouslyFocusedElement = null;

function setBackgroundInert(isInert) {
    document.querySelectorAll('body > header, body > main, body > footer').forEach((element) => {
        element.inert = isInert;
    });
}

function closeMobileMenu() {
    if (menuOverlay) {
        menuOverlay.remove();
        menuOverlay = null;
    }
    isMobileMenuOpen = false;
    document.body.classList.remove('sidebar-open');
    mobileMenuBtn.setAttribute('aria-expanded', 'false');
    setBackgroundInert(false);
    if (previouslyFocusedElement) {
        previouslyFocusedElement.focus();
        previouslyFocusedElement = null;
    }
}

mobileMenuBtn.addEventListener('click', () => {
    if (isMobileMenuOpen) {
        closeMobileMenu();
        return;
    }

    isMobileMenuOpen = true;
    previouslyFocusedElement = document.activeElement;
    document.body.classList.add('sidebar-open');
    mobileMenuBtn.setAttribute('aria-expanded', 'true');
    menuOverlay = document.createElement('div');
    menuOverlay.className = 'mobile-menu-overlay';
    menuOverlay.id = 'extras-drawer';
    menuOverlay.setAttribute('role', 'dialog');
    menuOverlay.setAttribute('aria-modal', 'true');
    menuOverlay.setAttribute('aria-label', 'Extras');

    const sidebarTemplate = document.getElementById('sidebar-template');
    const sidebarClone = sidebarTemplate && sidebarTemplate.content.firstElementChild
        ? sidebarTemplate.content.firstElementChild.cloneNode(true)
        : null;

    menuOverlay.innerHTML = `
        <div class="mobile-menu-content">
            <div class="mobile-menu-header">
                <span class="mobile-menu-kicker">Extras</span>
                <button type="button" class="mobile-menu-close" aria-label="Close Extras">
                    <i data-feather="x"></i>
                </button>
            </div>
            <div class="mobile-menu-sidebar-slot"></div>
        </div>
    `;

    if (sidebarClone) {
        sidebarClone.classList.add('sidebar-card--drawer');
        const sidebarSlot = menuOverlay.querySelector('.mobile-menu-sidebar-slot');
        sidebarSlot.appendChild(sidebarClone);

        const sidebarTabs = sidebarClone.querySelectorAll('[data-sidebar-tab]');
        const sidebarPanels = sidebarClone.querySelectorAll('[data-sidebar-panel]');

        const setActivePanel = (tabName) => {
            sidebarTabs.forEach((tab) => {
                const isActive = tab.dataset.sidebarTab === tabName;
                tab.classList.toggle('is-active', isActive);
                tab.setAttribute('aria-selected', String(isActive));
            });

            sidebarPanels.forEach((panel) => {
                const isActive = panel.dataset.sidebarPanel === tabName;
                panel.classList.toggle('is-active', isActive);
                panel.hidden = !isActive;
            });
        };

        sidebarTabs.forEach((tab) => {
            tab.addEventListener('click', () => {
                setActivePanel(tab.dataset.sidebarTab);
            });
        });

        setActivePanel('experience');
    }

    document.body.appendChild(menuOverlay);
    setBackgroundInert(true);

    if (window.feather) {
        feather.replace();
    }

    const closeButton = menuOverlay.querySelector('.mobile-menu-close');
    closeButton.addEventListener('click', closeMobileMenu);
    closeButton.focus();

    menuOverlay.addEventListener('keydown', (event) => {
        if (event.key !== 'Tab') return;

        const focusableElements = [...menuOverlay.querySelectorAll('button, a[href], [tabindex]:not([tabindex="-1"])')]
            .filter((element) => element.getClientRects().length > 0);
        if (!focusableElements.length) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        if (event.shiftKey && document.activeElement === firstElement) {
            event.preventDefault();
            lastElement.focus();
        } else if (!event.shiftKey && document.activeElement === lastElement) {
            event.preventDefault();
            firstElement.focus();
        }
    });

    menuOverlay.addEventListener('click', (event) => {
        if (event.target === menuOverlay) {
            closeMobileMenu();
        }
    });
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && isMobileMenuOpen) {
        closeMobileMenu();
    }
});

// Project details
const projectDetails = {
    'repo-analysis': {
        title: 'Repo Analysis',
        sections: [
            ['Overview', 'An analytics workflow that transforms GitHub repository data into an interactive Power BI dashboard.'],
            ['Goal', 'Explore repository data to identify trends and patterns in open-source activity.'],
            ['Approach', 'API extraction -> Power Query transformation -> star-schema data modeling -> DAX measures -> Power BI dashboard.'],
            ['Analysis', 'Repository activity, issues, pull requests, contributors, and development KPIs.'],
            ['Metrics', 'The dashboard covers Total Issues, Total Pull Requests, Total Commits, Total Contributors, Issue Closure Rate, Merge Rate, and average issue and pull request processing times.'],
            ['Current status', 'This is the current first iteration, focused on the core dashboard and analytics workflow.'],
            ['Stack', 'Power BI, Power Query, GitHub REST API, DAX, star-schema modeling']
        ],
        links: [
            ['Live Dashboard', 'https://app.powerbi.com/view?r=eyJrIjoiYWEyYTZiMjQtNjljMS00NzJmLTlmN2MtOTMzNWRmNGVkOWViIiwidCI6Ijg0MWU5OTFmLTE3MzAtNDMzZi04MmJhLWVhNzg5NTAwNGZmYSJ9'],
            ['GitHub Repo', 'https://github.com/steam-bell-92/open-source-repo-analysis']
        ]
    },
    'eshop-dashboard': {
        title: 'E-shop Dashboard',
        sections: [
            ['Overview', 'A business intelligence dashboard for exploring e-shop performance metrics.'],
            ['Goal', 'Turn e-shop data into a clearer view of performance and business metrics.'],
            ['Data', 'Sales, customers, products, stores, geographies, dates, and website sessions from CSV sources.'],
            ['Approach', 'Clean and transform the source data with Power Query, build a relational model, create DAX calculations, and develop the dashboard.'],
            ['Analysis', 'Sales performance, business KPIs, customer behavior, product and business dimensions, and drill-down analysis.'],
            ['Stack', 'Power BI, Power Query, DAX, CSV datasets']
        ],
        links: [
            ['Live Dashboard', 'https://app.powerbi.com/view?r=eyJrIjoiYTdkZTlkMDItZTc3Zi00N2ExLWEzYzItNTljN2U3MjFkMGM0IiwidCI6Ijg0MWU5OTFmLTE3MzAtNDMzZi04MmJhLWVhNzg5NTAwNGZmYSJ9'],
            ['GitHub Repo', 'https://github.com/steam-bell-92/e-shopp-dashboard']
        ]
    },
    'intel-sensors': {
        title: 'Intel Sensors',
        sections: [
            ['Overview', 'A room occupancy prediction project using Intel sensor data and complementary supervised and unsupervised learning.'],
            ['Problem', 'Predict room occupancy while paying attention to class imbalance and the cost of false negatives.'],
            ['Data', 'Temperature, humidity, light, and voltage readings from 54 Intel Berkeley Research Lab sensors.'],
            ['Approach', 'Use Random Forest with 10% bit-flip noise in a key feature, alongside K-Means on the clean features.'],
            ['Evaluation', 'Consider precision, recall, class imbalance, and false-negative tradeoffs rather than optimizing accuracy alone.'],
            ['Results', 'Random Forest: ~0.79 accuracy and ~0.78 ROC-AUC. K-Means: ~0.36 post-labeling accuracy, ~0.58 ROC-AUC, and ~0.85 silhouette score.'],
            ['Stack', 'Python, Scikit-Learn, Random Forest, K-Means']
        ],
        links: [
            ['Live Demo', 'https://intel-sensors.vercel.app/'],
            ['GitHub Repo', 'https://github.com/steam-bell-92/Intel_Sensors']
        ]
    },
    spotify: {
        title: 'Spotify',
        sections: [
            ['Overview', 'A music clustering project that explores a large Spotify dataset with unsupervised learning.'],
            ['Goal', 'Group tracks based on audio characteristics.'],
            ['Data', 'The Spotify Tracks Dataset from Kaggle, documented as a 12M-song dataset.'],
            ['Approach', 'Clean the data, select audio features, scale them with MinMaxScaler, apply K-Means, and use the Elbow Method to review cluster count.'],
            ['Evaluation', 'Calinski-Harabasz ~236753.94, Davies-Bouldin ~1.21, and Silhouette ~0.30.'],
            ['Stack', 'Python, pandas, NumPy, scikit-learn, K-Means, Matplotlib, Seaborn, Plotly']
        ],
        links: [
            ['GitHub Repo', 'https://github.com/steam-bell-92/Spotify']
        ]
    }
};

const projectDetailsDialog = document.getElementById('project-details-dialog');
const projectDetailsTitle = document.getElementById('project-details-title');
const projectDetailsContent = document.getElementById('project-details-content');
const projectDetailsClose = document.getElementById('project-details-close');
let isProjectDetailsOpen = false;
let projectDetailsTrigger = null;

function visibleDialogFocusables() {
    return [...projectDetailsDialog.querySelectorAll('button, a[href], [tabindex]:not([tabindex="-1"])')]
        .filter((element) => element.getClientRects().length > 0);
}

function closeProjectDetails() {
    if (!isProjectDetailsOpen) return;

    isProjectDetailsOpen = false;
    projectDetailsDialog.hidden = true;
    document.body.classList.remove('project-details-open');
    setBackgroundInert(false);
    if (projectDetailsTrigger) {
        projectDetailsTrigger.focus();
        projectDetailsTrigger = null;
    }
}

function openProjectDetails(projectId, trigger) {
    const project = projectDetails[projectId];
    if (!project) return;

    projectDetailsTrigger = trigger;
    projectDetailsTitle.textContent = project.title;
    projectDetailsContent.innerHTML = `
        <div class="project-details-sections">
            ${project.sections.map(([label, text]) => `
                <section class="project-details-section">
                    <h3>${label}</h3>
                    <p>${text}</p>
                </section>
            `).join('')}
        </div>
        <div class="project-details-links">
            <h3>Links</h3>
            <div class="project-actions">
                ${project.links.map(([label, url]) => `
                    <a href="${url}" target="_blank" rel="noopener noreferrer" class="project-link project-link-repo">${label}</a>
                `).join('')}
            </div>
        </div>
    `;

    isProjectDetailsOpen = true;
    document.body.classList.add('project-details-open');
    setBackgroundInert(true);
    projectDetailsDialog.hidden = false;
    projectDetailsClose.focus();
}

document.querySelectorAll('[data-project-details]').forEach((button) => {
    button.addEventListener('click', () => {
        openProjectDetails(button.dataset.projectDetails, button);
    });
});

projectDetailsClose.addEventListener('click', closeProjectDetails);
projectDetailsDialog.addEventListener('click', (event) => {
    if (event.target === projectDetailsDialog) {
        closeProjectDetails();
    }
});
projectDetailsDialog.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeProjectDetails();
        return;
    }

    if (event.key !== 'Tab') return;
    const focusableElements = visibleDialogFocusables();
    if (!focusableElements.length) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
    } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
    }
});

// Particles Canvas
const canvas = document.getElementById('particles-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');

    let particles = [];
    let mouseX = 0;
    let mouseY = 0;

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

            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

            this.x = Math.max(0, Math.min(this.x, canvas.width));
            this.y = Math.max(0, Math.min(this.y, canvas.height));
        }

        draw() {
            ctx.fillStyle = `rgba(45, 212, 191, ${this.opacity})`;
            ctx.fillRect(this.x, this.y, this.size, this.size);
        }
    }

    function initParticles() {
        particles = [];
        const particleCount = Math.floor((canvas.width * canvas.height) / 14000);
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }

    initParticles();

    function drawConnections() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 100) {
                    ctx.strokeStyle = `rgba(45, 212, 191, ${0.08 * (1 - distance / 100)})`;
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }

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

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

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

    window.addEventListener('resize', () => {
        resizeCanvas();
        initParticles();
    });
}

// Header scroll shadow effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
        navbar.style.borderBottomColor = 'rgba(45, 212, 191, 0.18)';
        navbar.style.boxShadow = '0 8px 30px rgba(2, 8, 23, 0.18)';
    } else {
        navbar.style.borderBottomColor = 'rgba(148, 163, 184, 0.14)';
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

// Ensure icons are rendered after dynamic content
if (window.feather) {
    feather.replace();
}