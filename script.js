// ===================================
// Typing Animation
// ===================================
const typingText = document.getElementById('typingText');
const phrases = [
  'Computer Scientist',
  'Software Engineer',
  'Prompt Engineer',
  'NLP Data Scientist',
  'AI Enthusiast'
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeAnimation() {
  const currentPhrase = phrases[phraseIndex];

  if (isDeleting) {
    typingText.textContent = currentPhrase.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingText.textContent = currentPhrase.substring(0, charIndex + 1);
    charIndex++;
  }

  let typeSpeed = isDeleting ? 50 : 100;

  if (!isDeleting && charIndex === currentPhrase.length) {
    typeSpeed = 2000; // Pause at end
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    typeSpeed = 500; // Pause before next phrase
  }

  setTimeout(typeAnimation, typeSpeed);
}

// Start typing animation when page loads
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(typeAnimation, 500);
});

// ===================================
// Navigation
// ===================================
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Navbar scroll effect
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Mobile menu toggle
navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
  });
});

// Active navigation link based on scroll position
const sections = document.querySelectorAll('.section, .hero');

function updateActiveNav() {
  let current = 'home';

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;

    if (window.scrollY >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', updateActiveNav);

// ===================================
// Smooth Scroll
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));

    if (target) {
      const offsetTop = target.offsetTop - 70; // Account for navbar height
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// ===================================
// Scroll Animations
// ===================================
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

// Observe elements for animation
const animateOnScroll = document.querySelectorAll(
  '.about-text, .about-image, .skill-card, .project-card'
);

animateOnScroll.forEach(el => observer.observe(el));

// Stagger animation for skill cards
const skillCards = document.querySelectorAll('.skill-card');
skillCards.forEach((card, index) => {
  card.style.transitionDelay = `${index * 0.1}s`;
});

// Stagger animation for project cards
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach((card, index) => {
  card.style.transitionDelay = `${index * 0.15}s`;
});

// ===================================
// Contact Form
// ===================================
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Get form values
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;

  // Simple validation
  if (name && email && message) {
    // In a real application, you would send this data to a server
    console.log('Form submitted:', { name, email, message });

    // Show success message (you can customize this)
    alert('Thank you for your message! I\'ll get back to you soon.');

    // Reset form
    contactForm.reset();
  }
});

// Form field focus effects
const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');

formInputs.forEach(input => {
  input.addEventListener('focus', () => {
    input.parentElement.classList.add('focused');
  });

  input.addEventListener('blur', () => {
    if (!input.value) {
      input.parentElement.classList.remove('focused');
    }
  });
});

// ===================================
// Project Links (Placeholder behavior)
// ===================================
document.querySelectorAll('.project-links a').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const linkText = link.textContent;
    console.log(`${linkText} clicked for project`);
    alert(`${linkText} - This would navigate to the actual project in a real portfolio.`);
  });
});

// Social links (Placeholder behavior)
document.querySelectorAll('.social-link').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const platform = link.getAttribute('aria-label');
    console.log(`${platform} link clicked`);
    alert(`This would navigate to your ${platform} profile.`);
  });
});

// ===================================
// Performance Optimization
// ===================================
// Debounce scroll events
let scrollTimeout;
window.addEventListener('scroll', () => {
  if (scrollTimeout) {
    window.cancelAnimationFrame(scrollTimeout);
  }

  scrollTimeout = window.requestAnimationFrame(() => {
    updateActiveNav();
  });
});

// ===================================
// Initialize
// ===================================
console.log('Portfolio website loaded successfully! 🚀');
