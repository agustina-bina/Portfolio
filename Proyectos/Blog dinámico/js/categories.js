// ============================================
// CATEGORIES MODULE
// Handles category filtering functionality
// ============================================

const CategoriesModule = (function() {
    let currentCategory = 'all';
    
    // Filter articles by category
    function filterByCategory(articles, category) {
        if (category === 'all') {
            return articles;
        }
        return articles.filter(article => article.categoria === category);
    }
    
    // Get current category
    function getCurrentCategory() {
        return currentCategory;
    }
    
    // Set current category
    function setCurrentCategory(category) {
        currentCategory = category;
    }
    
    // Update active button state
    function updateActiveButton(buttons, activeCategory) {
        buttons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.category === activeCategory) {
                btn.classList.add('active');
            }
        });
    }
    
    // Initialize category filter buttons
    function initCategoryFilters(callback) {
        const categoryButtons = document.querySelectorAll('.category-btn');
        const navLinks = document.querySelectorAll('.nav-link[data-category]');
        const footerLinks = document.querySelectorAll('.footer-links a[data-category]');
        
        // Category filter buttons
        categoryButtons.forEach(button => {
            button.addEventListener('click', function() {
                const category = this.dataset.category;
                setCurrentCategory(category);
                updateActiveButton(categoryButtons, category);
                
                // Also update nav links
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.dataset.category === category) {
                        link.classList.add('active');
                    }
                });
                
                if (callback) callback(category);
            });
        });
        
        // Navigation links with categories
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                if (this.dataset.category) {
                    e.preventDefault();
                    const category = this.dataset.category;
                    setCurrentCategory(category);
                    
                    // Update both nav links and category buttons
                    navLinks.forEach(l => l.classList.remove('active'));
                    this.classList.add('active');
                    updateActiveButton(categoryButtons, category);
                    
                    // Close mobile menu if open
                    const navMenu = document.querySelector('.nav-menu');
                    navMenu.classList.remove('active');
                    
                    // Scroll to articles section
                    document.querySelector('.main-content').scrollIntoView({ 
                        behavior: 'smooth' 
                    });
                    
                    if (callback) callback(category);
                }
            });
        });
        
        // Footer links with categories
        footerLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const category = this.dataset.category;
                setCurrentCategory(category);
                
                updateActiveButton(categoryButtons, category);
                navLinks.forEach(l => {
                    l.classList.remove('active');
                    if (l.dataset.category === category) {
                        l.classList.add('active');
                    }
                });
                
                // Scroll to articles section
                document.querySelector('.main-content').scrollIntoView({ 
                    behavior: 'smooth' 
                });
                
                if (callback) callback(category);
            });
        });
    }
    
    // Public API
    return {
        filterByCategory,
        getCurrentCategory,
        setCurrentCategory,
        updateActiveButton,
        initCategoryFilters
    };
})();
