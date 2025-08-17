/**
 * Bluespek Company Limited Website
 * JavaScript functionality for enhanced user experience
 */

document.addEventListener('DOMContentLoaded', function() {
    // Variables
    const header = document.querySelector('.header');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const backToTopButton = document.querySelector('.back-to-top');
    const navLinks = document.querySelectorAll('.nav-menu a');
    const contactForm = document.getElementById('contactForm');
    
    // Function to handle header scroll effect
    function handleHeaderScroll() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
            backToTopButton.classList.add('active');
        } else {
            header.classList.remove('scrolled');
            backToTopButton.classList.remove('active');
        }
    }
    
    // Function to toggle mobile menu
    function toggleMobileMenu() {
        navMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
        
        // Toggle icon between bars and times
        const icon = mobileMenuToggle.querySelector('i');
        if (icon.classList.contains('fa-bars')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    }
    
    // Function to close mobile menu
    function closeMobileMenu() {
        navMenu.classList.remove('active');
        document.body.classList.remove('menu-open');
        const icon = mobileMenuToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
    
    // Function to handle smooth scrolling for anchor links
    function handleSmoothScroll(e) {
        const targetId = this.getAttribute('href');
        
        // Only process if it's an anchor link
        if (targetId.startsWith('#') && targetId !== '#') {
            e.preventDefault();
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                closeMobileMenu();
                
                // Calculate offset for fixed header
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL without page reload
                history.pushState(null, null, targetId);
            }
        }
    }
    
    // Function to handle form submission
    function handleFormSubmit(e) {
        e.preventDefault();
        
        // Get form data
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Basic form validation
        if (!name || !email || !message) {
            alert('Please fill in all required fields.');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        // In a real implementation, you would send this data to a server
        // For demo purposes, we'll just show a success message
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    }
    
    // Function to handle scroll animations
    function handleScrollAnimations() {
        const elements = document.querySelectorAll('.benefit-card, .service-card, .category-card, .about-image, .contact-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('animate-fade-in');
            }
        });
    }
    
    // Function to set active nav link based on scroll position
    function setActiveNavLink() {
        const sections = document.querySelectorAll('section');
        const scrollPosition = window.scrollY + header.offsetHeight + 20;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (sectionId && scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
        
        // Handle case when at the top of the page
        if (scrollPosition < 200) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#home') {
                    link.classList.add('active');
                }
            });
        }
    }
    
    // Event Listeners
    window.addEventListener('scroll', handleHeaderScroll);
    window.addEventListener('scroll', handleScrollAnimations);
    window.addEventListener('scroll', setActiveNavLink);
    mobileMenuToggle.addEventListener('click', toggleMobileMenu);
    
    navLinks.forEach(link => {
        link.addEventListener('click', handleSmoothScroll);
    });
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
    
    // Initialize
    handleHeaderScroll();
    handleScrollAnimations();
    setActiveNavLink();
    
    // Add animation classes to hero elements
    const heroElements = document.querySelectorAll('.hero h1, .hero p, .hero-buttons');
    heroElements.forEach((element, index) => {
        element.classList.add('animate-fade-in');
        element.style.animationDelay = `${0.3 + (index * 0.2)}s`;
    });
});