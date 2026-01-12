// ===================================
// Mobile Menu Toggle
// ===================================
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (mobileMenuToggle && navMenu) {
    mobileMenuToggle.addEventListener('click', () => {
        mobileMenuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking on a nav link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!mobileMenuToggle.contains(e.target) && !navMenu.contains(e.target)) {
            mobileMenuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// ===================================
// Smooth Scrolling for Navigation Links
// ===================================
const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');

smoothScrollLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');

        // Don't prevent default for links that just have "#"
        if (href === '#') return;

        e.preventDefault();

        const targetId = href.substring(1);
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetSection.offsetTop - navbarHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// Navbar Background on Scroll
// ===================================
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Add shadow when scrolled
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
});

// ===================================
// Intersection Observer for Fade-in Animations
// ===================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply fade-in animation to sections
const sections = document.querySelectorAll('.section');
sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    fadeInObserver.observe(section);
});

// ===================================
// Animated Cards on Scroll
// ===================================
const cards = document.querySelectorAll('.project-card, .blog-card, .timeline-item');

const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100); // Stagger the animation
        }
    });
}, observerOptions);

cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    cardObserver.observe(card);
});

// ===================================
// Active Navigation Link on Scroll
// ===================================
const navLinksForActive = document.querySelectorAll('.nav-link');
const sectionsForActive = document.querySelectorAll('.section, .hero');

window.addEventListener('scroll', () => {
    let current = '';
    const navbarHeight = navbar.offsetHeight;

    sectionsForActive.forEach(section => {
        const sectionTop = section.offsetTop - navbarHeight - 100;
        const sectionHeight = section.offsetHeight;

        if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinksForActive.forEach(link => {
        link.style.color = '';
        const href = link.getAttribute('href');
        if (href === `#${current}`) {
            link.style.color = 'var(--accent-primary)';
        }
    });
});

// ===================================
// Terminal Typing Effect for Hero Section
// ===================================
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    element.style.borderRight = '2px solid var(--terminal-green)';

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            // Keep the cursor blinking after typing is done
            setTimeout(() => {
                element.style.animation = 'blink-caret 0.75s step-end infinite';
            }, 500);
        }
    }

    type();
}

// Check if hero section is visible and start typing animation
const heroSection = document.querySelector('.hero');
const typingElement = document.querySelector('.typing-animation');

if (typingElement && heroSection) {
    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const text = typingElement.textContent;
                typeWriter(typingElement, text, 50);
                heroObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    heroObserver.observe(heroSection);
}

// ===================================
// Glitch Effect on Hero Title
// ===================================
const glitchTitle = document.querySelector('.glitch');

if (glitchTitle) {
    glitchTitle.addEventListener('mouseenter', () => {
        const text = glitchTitle.getAttribute('data-text');
        let iterations = 0;
        const maxIterations = 10;

        const interval = setInterval(() => {
            glitchTitle.textContent = text
                .split('')
                .map((char, index) => {
                    if (index < iterations) {
                        return text[index];
                    }
                    return String.fromCharCode(33 + Math.floor(Math.random() * 94));
                })
                .join('');

            iterations++;

            if (iterations > maxIterations) {
                clearInterval(interval);
                glitchTitle.textContent = text;
            }
        }, 50);
    });
}

// ===================================
// Dynamic Year in Footer
// ===================================
const currentYear = new Date().getFullYear();
const footerText = document.querySelector('.footer p');
if (footerText) {
    footerText.textContent = footerText.textContent.replace('2026', currentYear);
}

// ===================================
// Add Cursor Trail Effect (Optional Easter Egg)
// ===================================
let cursorTrail = [];
const maxTrailLength = 20;

document.addEventListener('mousemove', (e) => {
    // Only add trail on larger screens
    if (window.innerWidth > 768) {
        cursorTrail.push({ x: e.clientX, y: e.clientY, time: Date.now() });

        // Remove old trail points
        cursorTrail = cursorTrail.filter(point => Date.now() - point.time < 500);

        if (cursorTrail.length > maxTrailLength) {
            cursorTrail.shift();
        }
    }
});

// ===================================
// Keyboard Navigation Shortcuts
// ===================================
document.addEventListener('keydown', (e) => {
    // Press 'h' to go to home
    if (e.key === 'h' && !e.ctrlKey && !e.metaKey) {
        const target = document.querySelector('#home, .hero');
        if (target && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    }

    // Press 'c' to go to contact
    if (e.key === 'c' && !e.ctrlKey && !e.metaKey) {
        const target = document.querySelector('#contact');
        if (target && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    }
});

// ===================================
// Project Card Tilt Effect on Mouse Move
// ===================================
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

// ===================================
// Console Easter Egg
// ===================================
console.log('%c👨‍💻 Hello Developer!', 'font-size: 20px; font-weight: bold; color: #58a6ff;');
console.log('%cLooking to hire? Let\'s chat!', 'font-size: 14px; color: #3fb950;');
console.log('%cEmail: your.email@example.com', 'font-size: 12px; color: #8b949e;');

// ===================================
// Performance: Lazy Load Images (if any images are added later)
// ===================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => imageObserver.observe(img));
}

// ===================================
// Konami Code Easter Egg
// ===================================
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            activateEasterEgg();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

function activateEasterEgg() {
    // Add fun effect when Konami code is entered
    document.body.style.animation = 'rainbow 2s linear infinite';

    const style = document.createElement('style');
    style.textContent = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(style);

    setTimeout(() => {
        document.body.style.animation = '';
        style.remove();
    }, 5000);

    console.log('%c🎮 KONAMI CODE ACTIVATED! 🎮', 'font-size: 24px; font-weight: bold; color: #ff79c6;');
}

// ===================================
// Blog Posts Loader
// ===================================
async function loadBlogPosts() {
    const container = document.getElementById('blog-posts-container');

    if (!container) return;

    try {
        const response = await fetch('blog/posts.json');

        if (!response.ok) {
            throw new Error('Failed to load blog posts');
        }

        const posts = await response.json();

        // Clear loading message
        container.innerHTML = '';

        // If no posts, show a message
        if (posts.length === 0) {
            container.innerHTML = '<p style="grid-column: 1 / -1; text-align: center; color: var(--text-secondary);">No blog posts yet. Check back soon!</p>';
            return;
        }

        // Sort posts by date (newest first)
        posts.sort((a, b) => new Date(b.date) - new Date(a.date));

        // Render each post
        posts.forEach(post => {
            const article = document.createElement('article');
            article.className = 'blog-card';

            // Format date
            const date = new Date(post.date);
            const formattedDate = date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long'
            });

            // Get the first tag or default
            const primaryTag = post.tags && post.tags.length > 0 ? post.tags[0] : 'Article';

            article.innerHTML = `
                <div class="blog-meta">
                    <span class="blog-date">${formattedDate}</span>
                    <span class="blog-tag">${primaryTag}</span>
                </div>
                <h3 class="blog-title">${post.title}</h3>
                <p class="blog-excerpt">${post.excerpt}</p>
                <a href="blog/posts/${post.slug}.html" class="blog-link">Read more →</a>
            `;

            container.appendChild(article);
        });

        // Apply fade-in animation to newly created cards
        const newCards = container.querySelectorAll('.blog-card');
        newCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';

            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });

    } catch (error) {
        console.error('Error loading blog posts:', error);
        container.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; color: var(--text-secondary);">
                <p>Unable to load blog posts at the moment.</p>
                <p style="font-size: 0.9rem; margin-top: 0.5rem;">Please try again later.</p>
            </div>
        `;
    }
}

// Load blog posts when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadBlogPosts);
} else {
    loadBlogPosts();
}

// ===================================
// Initialize
// ===================================
console.log('%c✅ Portfolio initialized successfully!', 'font-size: 12px; color: #3fb950;');
