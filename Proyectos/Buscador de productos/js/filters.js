/**
 * Módulo de Filtros
 * Maneja la lógica de filtrado de productos por categoría y precio
 */

const FiltersModule = (function() {
  let activeCategories = [];
  let activePriceRanges = [];
  let onFilterChangeCallback = null;

  /**
   * Inicializa los filtros de categoría basándose en los productos disponibles
   * @param {Array} products - Lista de productos
   */
  function initCategoryFilters(products) {
    const categoryContainer = document.getElementById('categoryFilters');
    if (!categoryContainer) return;

    // Obtener categorías únicas
    const categories = [...new Set(products.map(p => p.categoria))];
    
    // Generar HTML para cada categoría
    categoryContainer.innerHTML = categories.map(category => `
      <label class="filter-option">
        <input type="checkbox" name="category" value="${category}">
        <span class="checkmark"></span>
        <span class="filter-label">${capitalizeFirst(category)}</span>
      </label>
    `).join('');

    // Agregar event listeners
    const checkboxes = categoryContainer.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
      checkbox.addEventListener('change', handleCategoryChange);
    });
  }

  /**
   * Inicializa los event listeners para los filtros de precio
   */
  function initPriceFilters() {
    const priceContainer = document.getElementById('priceFilters');
    if (!priceContainer) return;

    const checkboxes = priceContainer.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
      checkbox.addEventListener('change', handlePriceChange);
    });
  }

  /**
   * Maneja cambios en los filtros de categoría
   * @param {Event} event - Evento de cambio
   */
  function handleCategoryChange(event) {
    const value = event.target.value;
    
    if (event.target.checked) {
      if (!activeCategories.includes(value)) {
        activeCategories.push(value);
      }
    } else {
      activeCategories = activeCategories.filter(cat => cat !== value);
    }

    triggerFilterChange();
  }

  /**
   * Maneja cambios en los filtros de precio
   * @param {Event} event - Evento de cambio
   */
  function handlePriceChange(event) {
    const value = event.target.value;
    
    if (event.target.checked) {
      if (!activePriceRanges.includes(value)) {
        activePriceRanges.push(value);
      }
    } else {
      activePriceRanges = activePriceRanges.filter(range => range !== value);
    }

    triggerFilterChange();
  }

  /**
   * Filtra productos basándose en los filtros activos
   * @param {Array} products - Lista de productos a filtrar
   * @returns {Array} - Productos filtrados
   */
  function filterProducts(products) {
    return products.filter(product => {
      const matchesCategory = activeCategories.length === 0 || 
                              activeCategories.includes(product.categoria);
      
      const matchesPrice = activePriceRanges.length === 0 || 
                           checkPriceRange(product.precio);
      
      return matchesCategory && matchesPrice;
    });
  }

  /**
   * Verifica si un precio está dentro de los rangos seleccionados
   * @param {number} price - Precio del producto
   * @returns {boolean} - true si está dentro de algún rango activo
   */
  function checkPriceRange(price) {
    return activePriceRanges.some(range => {
      switch(range) {
        case '0-50':
          return price < 50;
        case '50-100':
          return price >= 50 && price <= 100;
        case '100+':
          return price > 100;
        default:
          return false;
      }
    });
  }

  /**
   * Limpia todos los filtros activos
   */
  function clearFilters() {
    activeCategories = [];
    activePriceRanges = [];

    // Desmarcar todos los checkboxes
    const allCheckboxes = document.querySelectorAll('.filter-option input[type="checkbox"]');
    allCheckboxes.forEach(checkbox => {
      checkbox.checked = false;
    });

    triggerFilterChange();
  }

  /**
   * Dispara el callback de cambio de filtro
   */
  function triggerFilterChange() {
    if (typeof onFilterChangeCallback === 'function') {
      onFilterChangeCallback();
    }
  }

  /**
   * Establece el callback para cuando cambian los filtros
   * @param {Function} callback - Función a ejecutar
   */
  function setOnFilterChange(callback) {
    onFilterChangeCallback = callback;
  }

  /**
   * Capitaliza la primera letra de un string
   * @param {string} str - String a capitalizar
   * @returns {string} - String capitalizado
   */
  function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  /**
   * Obtiene los filtros activos actuales
   * @returns {Object} - Objeto con categorías y rangos de precio activos
   */
  function getActiveFilters() {
    return {
      categories: [...activeCategories],
      priceRanges: [...activePriceRanges]
    };
  }

  // API pública del módulo
  return {
    initCategoryFilters,
    initPriceFilters,
    filterProducts,
    clearFilters,
    setOnFilterChange,
    getActiveFilters
  };
})();
