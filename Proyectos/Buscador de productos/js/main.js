/**
 * Módulo Principal
 * Orquesta la carga de productos, búsqueda, filtros y renderizado
 */

const App = (function() {
  let allProducts = [];
  const productsGrid = document.getElementById('productsGrid');
  const resultsCount = document.getElementById('resultsCount');
  const noResults = document.getElementById('noResults');
  const clearFiltersBtn = document.getElementById('clearFilters');

  /**
   * Inicializa la aplicación
   */
  async function init() {
    try {
      // Cargar productos desde JSON
      await loadProducts();

      // Inicializar módulos
      SearchModule.init();
      FiltersModule.initCategoryFilters(allProducts);
      FiltersModule.initPriceFilters();

      // Configurar callbacks
      SearchModule.setOnSearch(updateResults);
      FiltersModule.setOnFilterChange(updateResults);

      // Event listener para limpiar filtros
      if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener('click', () => {
          FiltersModule.clearFilters();
          SearchModule.clearSearch();
        });
      }

      // Renderizar productos iniciales
      updateResults();
    } catch (error) {
      console.error('Error al inicializar la aplicación:', error);
      showError('Error al cargar los productos. Por favor, recarga la página.');
    }
  }

  /**
   * Carga los productos desde el archivo JSON
   */
  async function loadProducts() {
    const response = await fetch('data/products.json');
    if (!response.ok) {
      throw new Error('Error al cargar productos');
    }
    allProducts = await response.json();
  }

  /**
   * Actualiza los resultados basándose en búsqueda y filtros
   */
  function updateResults() {
    const searchQuery = SearchModule.getSearchQuery();
    
    // Aplicar búsqueda
    let results = SearchModule.searchProducts(allProducts, searchQuery);
    
    // Aplicar filtros
    results = FiltersModule.filterProducts(results);

    // Renderizar resultados
    renderProducts(results);
    updateResultsCount(results.length, searchQuery);
  }

  /**
   * Renderiza los productos en la grilla
   * @param {Array} products - Productos a renderizar
   */
  function renderProducts(products) {
    if (products.length === 0) {
      productsGrid.innerHTML = '';
      noResults.style.display = 'block';
      return;
    }

    noResults.style.display = 'none';
    
    productsGrid.innerHTML = products.map(product => createProductCard(product)).join('');
  }

  /**
   * Crea el HTML para una tarjeta de producto
   * @param {Object} product - Datos del producto
   * @returns {string} - HTML de la tarjeta
   */
  function createProductCard(product) {
    return `
      <article class="product-card" data-id="${product.id}">
        <div class="product-image">
          <img 
            src="${product.imagen}" 
            alt="${product.nombre}"
            loading="lazy"
            onerror="this.onerror=null; this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%22200%22 viewBox=%220 0 200 200%22%3E%3Crect fill=%22%23f2f1ed%22 width=%22200%22 height=%22200%22/%3E%3Ctext fill=%22%238a8a8a%22 font-family=%22sans-serif%22 font-size=%2214%22 x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22%3ESin imagen%3C/text%3E%3C/svg%3E';"
          >
        </div>
        <div class="product-info">
          <span class="product-category">${product.categoria}</span>
          <h3 class="product-name">${product.nombre}</h3>
          <p class="product-price">$${product.precio}</p>
        </div>
      </article>
    `;
  }

  /**
   * Actualiza el contador de resultados
   * @param {number} count - Número de resultados
   * @param {string} searchQuery - Término de búsqueda actual
   */
  function updateResultsCount(count, searchQuery) {
    const filters = FiltersModule.getActiveFilters();
    const hasFilters = filters.categories.length > 0 || filters.priceRanges.length > 0;
    
    let message = '';
    
    if (count === 0) {
      message = 'No se encontraron productos';
    } else if (count === 1) {
      message = '<span>1</span> producto encontrado';
    } else {
      message = `<span>${count}</span> productos encontrados`;
    }

    if (searchQuery || hasFilters) {
      message += ' con los filtros aplicados';
    }

    resultsCount.innerHTML = message;
  }

  /**
   * Muestra un mensaje de error
   * @param {string} message - Mensaje de error
   */
  function showError(message) {
    productsGrid.innerHTML = `
      <div class="no-results" style="display: block; grid-column: 1 / -1;">
        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="m15 9-6 6"></path>
          <path d="m9 9 6 6"></path>
        </svg>
        <h3>Error</h3>
        <p>${message}</p>
      </div>
    `;
  }

  // Inicializar cuando el DOM esté listo
  document.addEventListener('DOMContentLoaded', init);

  // API pública
  return {
    init,
    updateResults
  };
})();
