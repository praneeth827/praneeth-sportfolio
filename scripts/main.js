// Initialize GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu after clicking
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
});

// Active navigation link on scroll
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - sectionHeight / 3) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').slice(1) === current) {
            item.classList.add('active');
        }
    });
});

// GSAP Animations
// Hero Section
gsap.from('.hero-content', {
    duration: 1,
    y: 100,
    opacity: 0,
    ease: 'power4.out'
});

// About Section
gsap.from('.about-content', {
    scrollTrigger: {
        trigger: '.about',
        start: 'top center',
        toggleActions: 'play none none reverse'
    },
    duration: 1,
    y: 50,
    opacity: 0,
    ease: 'power3.out'
});

// Skills Section
gsap.from('.skill-item', {
    scrollTrigger: {
        trigger: '.skills',
        start: 'top center',
        toggleActions: 'play none none reverse'
    },
    duration: 0.8,
    y: 30,
    opacity: 0,
    stagger: 0.2,
    ease: 'power3.out'
});

// Projects Section
gsap.from('.project-card', {
    scrollTrigger: {
        trigger: '.projects',
        start: 'top center',
        toggleActions: 'play none none reverse'
    },
    duration: 0.8,
    y: 50,
    opacity: 0,
    stagger: 0.2,
    ease: 'power3.out'
});

// Contact Section
gsap.from('.contact-content', {
    scrollTrigger: {
        trigger: '.contact',
        start: 'top center',
        toggleActions: 'play none none reverse'
    },
    duration: 1,
    y: 50,
    opacity: 0,
    ease: 'power3.out'
});

// Form Submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Add your form submission logic here
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
    });
}

// Typing Animation for Hero Section
const subtitle = document.querySelector('.subtitle');
if (subtitle) {
    const text = subtitle.textContent;
    subtitle.textContent = '';
    let i = 0;

    function typeWriter() {
        if (i < text.length) {
            subtitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }

    typeWriter();
}

// Parallax Effect for Hero Section
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const scrolled = window.pageYOffset;
    hero.style.backgroundPositionY = -(scrolled * 0.5) + 'px';
});

// Project Data Template
const projects = [
    // {
    //     title: "Your Project Title",
    //     description: "Detailed description of your project. Explain what problem it solves, what technologies you used, and what you achieved.",
    //     image: "assets/images/your-project-image.jpg", // Add your project image in assets/images folder
    //     technologies: ["Technology1", "Technology2", "Technology3"], // List the technologies used
    //     link: "https://github.com/yourusername/project-repo" // Link to your project (GitHub, live demo, etc.)
    // },
    
    // Example of how to add your project:
    /*
    {
        title: "Sentiment Analysis Model",
        description: "Developed a sentiment analysis model using BERT to analyze customer reviews. Achieved 95% accuracy on test data and deployed using Flask API.",
        image: "assets/images/sentiment-analysis.jpg",
        technologies: ["Python", "BERT", "Flask", "Docker"],
        link: "https://github.com/yourusername/sentiment-analysis"
    },
    */
];

// Function to create project cards
function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card';
    
    card.innerHTML = `
        <div class="project-image">
            <img src="${project.image}" alt="${project.title}" onerror="this.src='assets/images/default-project.jpg'">
        </div>
        <div class="project-content">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="technologies">
                ${project.technologies.map(tech => `
                    <span class="tech-tag">${tech}</span>
                `).join('')}
            </div>
            <div class="project-links">
                ${project.link ? `
                    <a href="${project.link}" class="btn primary" target="_blank">View Project</a>
                ` : ''}
                ${project.demo ? `
                    <a href="${project.demo}" class="btn secondary" target="_blank">Live Demo</a>
                ` : ''}
            </div>
        </div>
    `;
    
    return card;
}

// Populate projects
const projectsGrid = document.querySelector('.projects-grid');
if (projectsGrid) {
    if (projects.length === 0) {
        projectsGrid.innerHTML = `
            <div class="no-projects">
                <p>Projects will be added soon!</p>
            </div>
        `;
    } else {
        projects.forEach(project => {
            projectsGrid.appendChild(createProjectCard(project));
        });
    }
}

// Intersection Observer for section reveal
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

sections.forEach(section => {
    observer.observe(section);
}); 