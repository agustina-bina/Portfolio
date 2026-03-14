// ============================================
// ARTICLES MODULE
// Handles loading and rendering of articles
// ============================================

const ArticlesModule = (function() {
    let allArticles = [];
    
    // Fetch articles from JSON file
    async function fetchArticles() {
        try {
            const response = await fetch('data/articles.json');
            if (!response.ok) {
                throw new Error('Error loading articles');
            }
            allArticles = await response.json();
            return allArticles;
        } catch (error) {
            console.error('Error fetching articles:', error);
            return [];
        }
    }
    
    // Get all articles
    function getArticles() {
        return allArticles;
    }
    
    // Get article by ID
    function getArticleById(id) {
        return allArticles.find(article => article.id === parseInt(id));
    }
    
    // Format date to Spanish format
    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', options);
    }
    
    // Get category display name
    function getCategoryName(category) {
        const categoryNames = {
            'tendencias': 'Tendencias',
            'outfits': 'Outfits',
            'guias': 'Guías de Estilo',
            'casual': 'Ropa Casual',
            'formal': 'Ropa Formal',
            'temporada': 'Temporada'
        };
        return categoryNames[category] || category;
    }
    
    // Create article card HTML
    function createArticleCard(article) {
        const card = document.createElement('article');
        card.className = 'article-card';
        card.dataset.id = article.id;
        card.dataset.category = article.categoria;
        
        card.innerHTML = `
            <div class="article-image">
                <img src="${article.imagen}" alt="${article.titulo}" loading="lazy">
                <span class="article-category">${getCategoryName(article.categoria)}</span>
            </div>
            <div class="article-content">
                <span class="article-date">${formatDate(article.fecha)}</span>
                <h3 class="article-title">${article.titulo}</h3>
                <p class="article-description">${article.descripcion}</p>
                <button class="read-more-btn" data-id="${article.id}">Leer Artículo</button>
            </div>
        `;
        
        return card;
    }
    
    // Render articles to the grid
    function renderArticles(articles, container) {
        container.innerHTML = '';
        
        if (articles.length === 0) {
            document.getElementById('no-results').style.display = 'block';
            return;
        }
        
        document.getElementById('no-results').style.display = 'none';
        
        articles.forEach(article => {
            const card = createArticleCard(article);
            container.appendChild(card);
        });
    }
    
    // Create full article HTML for modal
    function createFullArticle(article) {
        return `
            <img class="full-article-image" src="${article.imagen}" alt="${article.titulo}">
            <div class="full-article-content">
                <div class="full-article-meta">
                    <span class="full-article-category">${getCategoryName(article.categoria)}</span>
                    <span class="full-article-author">${article.autor}</span>
                    <span class="full-article-date">${formatDate(article.fecha)}</span>
                </div>
                <h1 class="full-article-title">${article.titulo}</h1>
                <div class="full-article-body">
                    ${article.contenido}
                </div>
            </div>
        `;
    }
    
    // Open article modal
    function openArticle(articleId) {
        const article = getArticleById(articleId);
        if (!article) return;
        
        const modal = document.getElementById('article-modal');
        const fullArticle = document.getElementById('full-article');
        
        fullArticle.innerHTML = createFullArticle(article);
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    // Close article modal
    function closeArticle() {
        const modal = document.getElementById('article-modal');
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Public API
    return {
        fetchArticles,
        getArticles,
        getArticleById,
        renderArticles,
        openArticle,
        closeArticle,
        getCategoryName,
        formatDate
    };
})();
