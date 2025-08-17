// Current language state
let currentLanguage = 'ar';

// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });
    }

    // Add scroll effect to header
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (header) {
            if (window.scrollY > 100) {
                header.style.background = 'rgba(45, 27, 61, 0.98)';
            } else {
                header.style.background = 'rgba(45, 27, 61, 0.95)';
            }
        }
    });

    // Enhanced image loading with better error handling
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            console.warn(`Failed to load image: ${this.src}`);
            
            const placeholder = document.createElement('div');
            placeholder.style.cssText = `
                width: ${this.offsetWidth || 200}px;
                height: ${this.offsetHeight || 200}px;
                background: rgba(219, 112, 147, 0.2);
                border: 2px dashed #db7093;
                border-radius: 15px;
                display: flex;
                align-items: center;
                justify-content: center;
                color: #db7093;
                font-size: 14px;
                text-align: center;
                padding: 10px;
                flex-direction: column;
                gap: 5px;
            `;
            placeholder.innerHTML = currentLanguage === 'ar' ? 
                '<i class="fas fa-image" style="font-size: 24px;"></i><br>الصورة غير متاحة' : 
                '<i class="fas fa-image" style="font-size: 24px;"></i><br>Image not available';
            
            this.parentNode.insertBefore(placeholder, this);
            this.style.display = 'none';
        });
        
        img.addEventListener('load', function() {
            console.log(`Successfully loaded image: ${this.src.split('/').pop()}`);
        });
    });

    // Add animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.cookie-card, .contact-card');
    
    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
});

// Language Toggle Function
function toggleLanguage() {
    const body = document.body;
    const langText = document.getElementById('lang-text');
    const html = document.documentElement;
    
    if (currentLanguage === 'ar') {
        // Switch to English
        currentLanguage = 'en';
        body.classList.add('english');
        html.setAttribute('lang', 'en');
        html.setAttribute('dir', 'ltr');
        langText.textContent = 'عر';
        
        // Update all text content
        updateTextContent('en');
    } else {
        // Switch to Arabic
        currentLanguage = 'ar';
        body.classList.remove('english');
        html.setAttribute('lang', 'ar');
        html.setAttribute('dir', 'rtl');
        langText.textContent = 'EN';
        
        // Update all text content
        updateTextContent('ar');
    }
}

// Update text content based on language
function updateTextContent(lang) {
    const elements = document.querySelectorAll('[data-ar][data-en]');
    elements.forEach(element => {
        if (lang === 'ar') {
            element.textContent = element.getAttribute('data-ar');
        } else {
            element.textContent = element.getAttribute('data-en');
        }
    });
}

// Tab Functionality
function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    
    // Hide all tab contents
    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].classList.remove("active");
    }
    
    // Remove active class from all tab buttons
    tablinks = document.getElementsByClassName("tab-button");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove("active");
    }
    
    // Show the selected tab content and mark button as active
    document.getElementById(tabName).classList.add("active");
    evt.currentTarget.classList.add("active");
}

// WhatsApp Order Function
function orderCookie(cookieName, price) {
    const message = `راسلنا للطلبات`;
    const phoneNumber = "966537300127";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

// Smooth Scrolling for Navigation Links
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});