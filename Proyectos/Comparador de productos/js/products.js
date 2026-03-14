// products.js - Manejo de carga de productos desde JSON

let productsData = [];

/**
 * Carga los productos desde el archivo JSON
 * @returns {Promise<Array>} Array de productos
 */
async function loadProducts() {
  try {
    const response = await fetch('data/products.json');
    if (!response.ok) {
      throw new Error('Error al cargar productos');
    }
    productsData = await response.json();
    return productsData;
  } catch (error) {
    console.error('Error cargando productos:', error);
    return [];
  }
}

/**
 * Obtiene todos los productos
 * @returns {Array} Array de productos
 */
function getProducts() {
  return productsData;
}

/**
 * Obtiene un producto por su ID
 * @param {number} id - ID del producto
 * @returns {Object|null} Producto o null si no existe
 */
function getProductById(id) {
  return productsData.find(product => product.id === parseInt(id)) || null;
}

/**
 * Filtra productos por categoría
 * @param {string} category - Categoría a filtrar
 * @returns {Array} Productos filtrados
 */
function getProductsByCategory(category) {
  if (!category || category === 'all') {
    return productsData;
  }
  return productsData.filter(product => product.categoria === category);
}

/**
 * Obtiene las categorías únicas de productos
 * @returns {Array} Array de categorías
 */
function getCategories() {
  const categories = [...new Set(productsData.map(product => product.categoria))];
  return categories;
}

/**
 * Formatea el precio para mostrar
 * @param {number} price - Precio
 * @returns {string} Precio formateado
 */
function formatPrice(price) {
  return `$${price.toFixed(2)}`;
}

export {
  loadProducts,
  getProducts,
  getProductById,
  getProductsByCategory,
  getCategories,
  formatPrice
};
