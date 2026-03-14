// ============================================
// SEARCH MODULE
// Handles search functionality
// ============================================

const SearchModule = (function() {
    let searchTimeout = null;
    
    // Search articles by keyword
    function searchArticles(articles, keyword) {
        if (!keyword || keyword.trim() === '') {
            return articles;
        }
        
        const searchTerm = keyword.toLowerCase().trim();
        
        return articles.filter(article => {
            const titulo = article.titulo.toLowerCase();
            const descripcion = article.descripcion.toLowerCase();
            const contenido = article.contenido.toLowerCase();
            const categoria = article.categoria.toLowerCase();
            const autor = article.autor.toLowerCase();
            
            return titulo.includes(searchTerm) ||
                   descripcion.includes(searchTerm) ||
                   contenido.includes(searchTerm) ||
                   categoria.includes(searchTerm) ||
                   autor.includes(searchTerm);
        });
    }
    
    // Highlight search terms in text
    function highlightSearchTerm(text, searchTerm) {
        if (!searchTerm || searchTerm.trim() === '') {
            return text;
        }
        
        const regex = new RegExp(`(${escapeRegExp(searchTerm)})`, 'gi');
        return text.replace(regex, '<mark>$1</mark>');
    }
    
    // Escape special regex characters
    function escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }
    
    // Initialize search functionality
    function initSearch(callback) {
        const searchInput = document.getElementById('search-input');
        const searchBtn = document.getElementById('search-btn');
        
        if (!searchInput || !searchBtn) return;
        
        // Search on input with debounce
        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            const query = this.value;
            
            searchTimeout = setTimeout(() => {
                if (callback) callback(query);
            }, 300);
        });
        
        // Search on button click
        searchBtn.addEventListener('click', function() {
            const query = searchInput.value;
            if (callback) callback(query);
        });
        
        // Search on Enter key
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const query = this.value;
                if (callback) callback(query);
            }
        });
    }
    
    // Clear search
    function clearSearch() {
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            searchInput.value = '';
        }
    }
    
    // Get current search query
    function getSearchQuery() {
        const searchInput = document.getElementById('search-input');
        return searchInput ? searchInput.value : '';
    }
    
    // Public API
    return {
        searchArticles,
        highlightSearchTerm,
        initSearch,
        clearSearch,
        getSearchQuery
    };
})();
