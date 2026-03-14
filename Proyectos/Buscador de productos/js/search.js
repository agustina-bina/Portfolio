/**
 * Módulo de Búsqueda
 * Maneja la lógica de búsqueda de productos por nombre
 */

const SearchModule = (function() {
  let searchInput = null;
  let clearBtn = null;
  let onSearchCallback = null;
  let debounceTimer = null;

  /**
   * Inicializa el módulo de búsqueda
   */
  function init() {
    searchInput = document.getElementById('searchInput');
    clearBtn = document.getElementById('clearSearch');

    if (!searchInput || !clearBtn) {
      console.error('Elementos de búsqueda no encontrados');
      return;
    }

    // Event listener para input con debounce
    searchInput.addEventListener('input', handleInput);

    // Event listener para limpiar búsqueda
    clearBtn.addEventListener('click', clearSearch);

    // Event listener para tecla Enter
    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        triggerSearch();
      }
    });
  }

  /**
   * Maneja el evento de input con debounce
   * @param {Event} event - Evento de input
   */
  function handleInput(event) {
    const value = event.target.value;
    
    // Mostrar/ocultar botón de limpiar
    if (value.length > 0) {
      clearBtn.classList.add('visible');
    } else {
      clearBtn.classList.remove('visible');
    }

    // Debounce para evitar búsquedas excesivas
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      triggerSearch();
    }, 200);
  }

  /**
   * Busca productos por nombre
   * @param {Array} products - Lista de productos
   * @param {string} query - Término de búsqueda
   * @returns {Array} - Productos que coinciden con la búsqueda
   */
  function searchProducts(products, query) {
    if (!query || query.trim() === '') {
      return products;
    }

    const normalizedQuery = normalizeString(query.trim());

    return products.filter(product => {
      const normalizedName = normalizeString(product.nombre);
      const normalizedCategory = normalizeString(product.categoria);
      
      return normalizedName.includes(normalizedQuery) || 
             normalizedCategory.includes(normalizedQuery);
    });
  }

  /**
   * Normaliza un string para búsqueda (quita acentos y pasa a minúsculas)
   * @param {string} str - String a normalizar
   * @returns {string} - String normalizado
   */
  function normalizeString(str) {
    return str
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }

  /**
   * Obtiene el término de búsqueda actual
   * @returns {string} - Término de búsqueda
   */
  function getSearchQuery() {
    return searchInput ? searchInput.value.trim() : '';
  }

  /**
   * Limpia el campo de búsqueda
   */
  function clearSearch() {
    if (searchInput) {
      searchInput.value = '';
      clearBtn.classList.remove('visible');
      triggerSearch();
      searchInput.focus();
    }
  }

  /**
   * Dispara el callback de búsqueda
   */
  function triggerSearch() {
    if (typeof onSearchCallback === 'function') {
      onSearchCallback();
    }
  }

  /**
   * Establece el callback para cuando se realiza una búsqueda
   * @param {Function} callback - Función a ejecutar
   */
  function setOnSearch(callback) {
    onSearchCallback = callback;
  }

  /**
   * Establece el valor del campo de búsqueda
   * @param {string} value - Valor a establecer
   */
  function setSearchValue(value) {
    if (searchInput) {
      searchInput.value = value;
      if (value.length > 0) {
        clearBtn.classList.add('visible');
      } else {
        clearBtn.classList.remove('visible');
      }
    }
  }

  // API pública del módulo
  return {
    init,
    searchProducts,
    getSearchQuery,
    clearSearch,
    setOnSearch,
    setSearchValue
  };
})();
