// main.js - Lógica principal de la aplicación

import { loadProducts, getProducts, getProductById, formatPrice } from './products.js';
import { generateComparisonTable, generateDifferences } from './compare.js';

// Estado de la aplicación
let selectedProduct1 = null;
let selectedProduct2 = null;

// Elementos del DOM
const selector1 = document.getElementById('product-selector-1');
const selector2 = document.getElementById('product-selector-2');
const preview1 = document.getElementById('preview-1');
const preview2 = document.getElementById('preview-2');
const compareBtn = document.getElementById('compare-btn');
const comparisonSection = document.getElementById('comparison-section');

/**
 * Inicializa la aplicación
 */
async function init() {
  showLoading();
  
  const products = await loadProducts();
  
  if (products.length === 0) {
    showError('No se pudieron cargar los productos');
    return;
  }
  
  populateSelectors(products);
  setupEventListeners();
  hideLoading();
}

/**
 * Muestra el estado de carga
 */
function showLoading() {
  const container = document.querySelector('.container');
  const loadingEl = document.createElement('div');
  loadingEl.className = 'loading';
  loadingEl.id = 'loading';
  loadingEl.innerHTML = '<div class="spinner"></div>';
  container.prepend(loadingEl);
}

/**
 * Oculta el estado de carga
 */
function hideLoading() {
  const loadingEl = document.getElementById('loading');
  if (loadingEl) {
    loadingEl.remove();
  }
}

/**
 * Muestra un error
 */
function showError(message) {
  const container = document.querySelector('.container');
  container.innerHTML = `
    <div class="empty-state">
      <div class="icon">⚠️</div>
      <h3>Error</h3>
      <p>${message}</p>
    </div>
  `;
}

/**
 * Llena los selectores con los productos
 */
function populateSelectors(products) {
  const categories = [...new Set(products.map(p => p.categoria))];
  
  [selector1, selector2].forEach(selector => {
    selector.innerHTML = '<option value="">Selecciona un producto...</option>';
    
    categories.forEach(category => {
      const categoryProducts = products.filter(p => p.categoria === category);
      const optgroup = document.createElement('optgroup');
      optgroup.label = capitalizeCategory(category);
      
      categoryProducts.forEach(product => {
        const option = document.createElement('option');
        option.value = product.id;
        option.textContent = `${product.nombre} - ${formatPrice(product.precio)}`;
        optgroup.appendChild(option);
      });
      
      selector.appendChild(optgroup);
    });
  });
}

/**
 * Capitaliza el nombre de la categoría
 */
function capitalizeCategory(category) {
  const names = {
    'auriculares': '🎧 Auriculares',
    'teclados': '⌨️ Teclados',
    'mouse': '🖱️ Mouse'
  };
  return names[category] || category.charAt(0).toUpperCase() + category.slice(1);
}

/**
 * Configura los event listeners
 */
function setupEventListeners() {
  selector1.addEventListener('change', (e) => handleProductSelection(1, e.target.value));
  selector2.addEventListener('change', (e) => handleProductSelection(2, e.target.value));
  compareBtn.addEventListener('click', handleCompare);
}

/**
 * Maneja la selección de un producto
 */
function handleProductSelection(selectorNum, productId) {
  const product = getProductById(productId);
  const previewEl = selectorNum === 1 ? preview1 : preview2;
  
  if (selectorNum === 1) {
    selectedProduct1 = product;
  } else {
    selectedProduct2 = product;
  }
  
  updatePreview(previewEl, product);
  updateCompareButton();
  
  // Ocultar comparación anterior si hay cambios
  comparisonSection.classList.remove('active');
}

/**
 * Actualiza la vista previa del producto
 */
function updatePreview(previewEl, product) {
  if (!product) {
    previewEl.classList.remove('active');
    return;
  }
  
  previewEl.classList.add('active');
  previewEl.innerHTML = `
    <div class="preview-content">
      <div class="preview-image">
        <img src="${product.imagen}" alt="${product.nombre}" onerror="this.parentElement.innerHTML='<span class=\\'placeholder-icon\\'>📦</span>'">
      </div>
      <div class="preview-info">
        <span class="preview-category">${product.categoria}</span>
        <h3>${product.nombre}</h3>
        <span class="preview-price">${formatPrice(product.precio)}</span>
      </div>
    </div>
  `;
}

/**
 * Actualiza el estado del botón de comparar
 */
function updateCompareButton() {
  compareBtn.disabled = !(selectedProduct1 && selectedProduct2);
}

/**
 * Maneja la acción de comparar
 */
function handleCompare() {
  if (!selectedProduct1 || !selectedProduct2) return;
  
  // Generar encabezado de productos comparados
  const comparedProductsHTML = `
    <div class="compared-label">Características</div>
    <div class="compared-product">
      <img src="${selectedProduct1.imagen}" alt="${selectedProduct1.nombre}" onerror="this.style.display='none'">
      <span class="product-name">${selectedProduct1.nombre}</span>
      <span class="product-price">${formatPrice(selectedProduct1.precio)}</span>
    </div>
    <div class="compared-product">
      <img src="${selectedProduct2.imagen}" alt="${selectedProduct2.nombre}" onerror="this.style.display='none'">
      <span class="product-name">${selectedProduct2.nombre}</span>
      <span class="product-price">${formatPrice(selectedProduct2.precio)}</span>
    </div>
  `;
  
  // Generar tabla de especificaciones
  const tableHTML = generateComparisonTable(selectedProduct1, selectedProduct2);
  
  // Generar diferencias
  const differences = generateDifferences(selectedProduct1, selectedProduct2);
  let differencesHTML = '';
  
  if (differences.length > 0) {
    differencesHTML = `
      <div class="differences-section">
        <h3>Diferencias destacadas</h3>
        <ul class="differences-list">
          ${differences.map(diff => `
            <li class="diff-product-${diff.product}">
              <span class="diff-icon">${diff.icon}</span>
              <span>${diff.text}</span>
            </li>
          `).join('')}
        </ul>
      </div>
    `;
  }
  
  // Actualizar el DOM
  comparisonSection.innerHTML = `
    <div class="comparison-header">
      <h2>Comparación de productos</h2>
      <p>Analizando ${selectedProduct1.nombre} vs ${selectedProduct2.nombre}</p>
    </div>
    <div class="compared-products">
      ${comparedProductsHTML}
    </div>
    <table class="specs-table">
      <tbody>
        ${tableHTML}
      </tbody>
    </table>
    ${differencesHTML}
  `;
  
  comparisonSection.classList.add('active');
  
  // Scroll suave hacia la comparación
  comparisonSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Iniciar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', init);
