// Current language state
let currentLanguage = 'ar';

// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
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

// WhatsApp Order Function - Simplified message
function orderCookie(cookieName, price) {
    const message = `راسلنا للطلبات`;
    const phoneNumber = "966537300127";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

// Smooth Scrolling for Navigation Links
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

// QR Code Generation using Google Charts API
function generateQR() {
    console.log('Generating QR code...');
    
    const qrImg = document.getElementById('qr-code-img');
    const qrFallback = document.getElementById('qr-fallback');
    const websiteUrlSpan = document.getElementById('website-url');
    
    // Get the website URL
    let websiteUrl = window.location.href;
    
    // Clean up URL for production
    if (websiteUrl.includes('localhost') || websiteUrl.includes('127.0.0.1')) {
        websiteUrl = 'https://milo-s-cookies.vercel.app'; // Updated with your actual Vercel URL
    }
    
    // Update URL display
    if (websiteUrlSpan) {
        websiteUrlSpan.textContent = websiteUrl;
    }
    
    // Generate QR using Google Charts API
    const qrApiUrl = `https://chart.googleapis.com/chart?chs=300x300&cht=qr&chl=${encodeURIComponent(websiteUrl)}&choe=UTF-8`;
    
    console.log('QR API URL:', qrApiUrl);
    
    // Create new image
    const newImg = new Image();
    newImg.crossOrigin = 'anonymous';
    
    newImg.onload = function() {
        console.log('QR code generated successfully!');
        qrImg.src = qrApiUrl;
        qrImg.style.display = 'block';
        qrFallback.style.display = 'none';
        
        // Store for download
        qrImg.setAttribute('data-url', qrApiUrl);
    };
    
    newImg.onerror = function() {
        console.error('Failed to generate QR code');
        showQRFallback();
    };
    
    newImg.src = qrApiUrl;
}

// Show fallback when QR fails
function showQRFallback() {
    const qrImg = document.getElementById('qr-code-img');
    const qrFallback = document.getElementById('qr-fallback');
    
    if (qrImg) qrImg.style.display = 'none';
    if (qrFallback) qrFallback.style.display = 'block';
    
    console.log('Showing QR fallback');
}

// Download QR Code
function downloadQR() {
    const qrImg = document.getElementById('qr-code-img');
    
    if (!qrImg || qrImg.style.display === 'none' || !qrImg.src) {
        // Try to generate first
        generateQR();
        setTimeout(() => {
            downloadQRActual();
        }, 2000);
        return;
    }
    
    downloadQRActual();
}

function downloadQRActual() {
    const qrImg = document.getElementById('qr-code-img');
    
    if (!qrImg || !qrImg.src) {
        alert(currentLanguage === 'ar' ? 
            'الرمز غير متاح للتحميل' : 
            'QR code not available for download'
        );
        return;
    }
    
    try {
        // Create canvas to convert image
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        canvas.width = 300;
        canvas.height = 300;
        
        // Create a new image for download
        const img = new Image();
        img.crossOrigin = 'anonymous';
        
        img.onload = function() {
            // Draw white background
            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Draw QR code
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            
            // Create download link
            canvas.toBlob(function(blob) {
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.download = 'milos-cookies-qr.png';
                link.href = url;
                
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                
                URL.revokeObjectURL(url);
                
                console.log('QR code downloaded successfully');
            });
        };
        
        img.onerror = function() {
            console.error('Error loading image for download');
            // Fallback: direct download
            const link = document.createElement('a');
            link.download = 'milos-cookies-qr.png';
            link.href = qrImg.src;
            link.target = '_blank';
            link.click();
        };
        
        img.src = qrImg.src;
        
    } catch (error) {
        console.error('Download error:', error);
        
        // Simple fallback - open in new tab
        window.open(qrImg.src, '_blank');
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('Page loaded, initializing...');
    
    // Generate QR code after a short delay
    setTimeout(() => {
        generateQR();
    }, 1500);
    
    // Add scroll effect to header
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(45, 27, 61, 0.98)';
        } else {
            header.style.background = 'rgba(45, 27, 61, 0.95)';
        }
    });
    
    // Enhanced image loading with better error handling
    const images = document.querySelectorAll('img:not(#qr-code-img)');
    images.forEach(img => {
        img.addEventListener('error', function() {
            console.warn(`Failed to load image: ${this.src}`);
            
            // Create a better placeholder
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
            
            // Replace image with placeholder
            this.parentNode.insertBefore(placeholder, this);
            this.style.display = 'none';
        });
        
        img.addEventListener('load', function() {
            console.log(`Successfully loaded image: ${this.src.split('/').pop()}`);
        });
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
document.addEventListener('DOMContentLoaded', function() {
    const animateElements = document.querySelectorAll('.cookie-card, .contact-card, .qr-card');
    
    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
});

// Eruda console for mobile debugging
if (typeof eruda !== 'undefined') {
    console.log('Eruda debugging tool loaded successfully');
    console.log('To access: Tap the floating eruda icon or shake your phone');
}