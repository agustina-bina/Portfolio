// ============================================
// MAIN MODULE
// Main application logic and initialization
// ============================================

(function() {
    'use strict';
    
    // DOM Elements
    const articlesGrid = document.getElementById('articles-grid');
    const articleModal = document.getElementById('article-modal');
    const modalClose = document.getElementById('modal-close');
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const contactForm = document.getElementById('contact-form');
    
    // Application state
    let currentSearchQuery = '';
    
    // Initialize the application
    async function init() {
        // Show loading state
        articlesGrid.innerHTML = '<div class="loading"></div>';
        
        // Fetch articles
        const articles = await ArticlesModule.fetchArticles();
        
        // Initial render
        ArticlesModule.renderArticles(articles, articlesGrid);
        
        // Initialize modules
        initializeModules();
        
        // Setup event listeners
        setupEventListeners();
    }
    
    // Initialize all modules
    function initializeModules() {
        // Initialize category filters
        CategoriesModule.initCategoryFilters((category) => {
            updateArticlesList();
        });
        
        // Initialize search
        SearchModule.initSearch((query) => {
            currentSearchQuery = query;
            updateArticlesList();
        });
    }
    
    // Update articles list based on filters and search
    function updateArticlesList() {
        let articles = ArticlesModule.getArticles();
        
        // Apply category filter
        const currentCategory = CategoriesModule.getCurrentCategory();
        articles = CategoriesModule.filterByCategory(articles, currentCategory);
        
        // Apply search filter
        if (currentSearchQuery) {
            articles = SearchModule.searchArticles(articles, currentSearchQuery);
        }
        
        // Render filtered articles
        ArticlesModule.renderArticles(articles, articlesGrid);
        
        // Re-attach click handlers for read more buttons
        attachReadMoreHandlers();
    }
    
    // Attach click handlers to read more buttons
    function attachReadMoreHandlers() {
        const readMoreButtons = document.querySelectorAll('.read-more-btn');
        readMoreButtons.forEach(button => {
            button.addEventListener('click', function() {
                const articleId = this.dataset.id;
                ArticlesModule.openArticle(articleId);
            });
        });
        
        // Also allow clicking on article cards
        const articleCards = document.querySelectorAll('.article-card');
        articleCards.forEach(card => {
            card.style.cursor = 'pointer';
            card.addEventListener('click', function(e) {
                // Don't trigger if clicking the button
                if (e.target.classList.contains('read-more-btn')) return;
                
                const articleId = this.dataset.id;
                ArticlesModule.openArticle(articleId);
            });
        });
    }
    
    // Setup event listeners
    function setupEventListeners() {
        // Modal close button
        if (modalClose) {
            modalClose.addEventListener('click', () => {
                ArticlesModule.closeArticle();
            });
        }
        
        // Close modal on backdrop click
        if (articleModal) {
            articleModal.addEventListener('click', (e) => {
                if (e.target === articleModal) {
                    ArticlesModule.closeArticle();
                }
            });
        }
        
        // Close modal on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                ArticlesModule.closeArticle();
            }
        });
        
        // Mobile menu toggle
        if (menuToggle) {
            menuToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
            });
        }
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!menuToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
            }
        });
        
        // Contact form submission
        if (contactForm) {
            contactForm.addEventListener('submit', handleContactForm);
        }
        
        // Initial attachment of read more handlers
        attachReadMoreHandlers();
        
        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href !== '#') {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
    }
    
    // Handle contact form submission
    function handleContactForm(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Here you would typically send this data to a server
        console.log('Contact form submitted:', { name, email, message });
        
        // Show success message
        alert('¡Gracias por tu mensaje! Te contactaremos pronto.');
        
        // Reset form
        contactForm.reset();
    }
    
    // Header scroll effect
    function handleHeaderScroll() {
        const header = document.querySelector('.header');
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
            } else {
                header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
            }
        });
    }
    
    // Initialize on DOM ready
    document.addEventListener('DOMContentLoaded', () => {
        init();
        handleHeaderScroll();
    });
})();
