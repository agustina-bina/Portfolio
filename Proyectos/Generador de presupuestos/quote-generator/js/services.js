/**
 * Módulo de servicios
 * Maneja la carga y visualización de servicios desde JSON
 */

// Estado de los servicios
let serviciosDisponibles = [];

/**
 * Carga los servicios desde el archivo JSON
 * @returns {Promise<Array>} Lista de servicios
 */
async function cargarServicios() {
  try {
    const response = await fetch('./quote-generator/data/services.json');
    if (!response.ok) {
      throw new Error('Error al cargar los servicios');
    }
    serviciosDisponibles = await response.json();
    return serviciosDisponibles;
  } catch (error) {
    console.error('Error cargando servicios:', error);
    mostrarErrorServicios();
    return [];
  }
}

/**
 * Muestra un mensaje de error si no se pueden cargar los servicios
 */
function mostrarErrorServicios() {
  const grid = document.getElementById('services-grid');
  if (grid) {
    grid.innerHTML = `
      <div class="error-message" style="grid-column: 1 / -1; text-align: center; padding: 2rem; color: #864e3e;">
        <p>No se pudieron cargar los servicios. Por favor, recarga la página.</p>
      </div>
    `;
  }
}

/**
 * Genera el HTML para las opciones de un servicio
 * @param {Object} servicio - Servicio con opciones
 * @returns {string} HTML de las opciones
 */
function generarOpcionesHTML(servicio) {
  if (!servicio.tieneOpciones || !servicio.opciones) return '';

  const { tipo, valores, etiquetas } = servicio.opciones;
  
  let botonesHTML = etiquetas.map((etiqueta, index) => `
    <button type="button" 
            class="option-btn ${index === 0 ? 'active' : ''}" 
            data-servicio-id="${servicio.id}"
            data-opcion-index="${index}"
            data-valor="${valores[index]}">
      ${etiqueta}
    </button>
  `).join('');

  const labelTexto = tipo === 'paginas' ? 'Cantidad de páginas:' : 
                     tipo === 'nivel' ? 'Nivel del servicio:' : 'Opciones:';

  return `
    <div class="service-options">
      <p class="options-label">${labelTexto}</p>
      <div class="options-buttons">
        ${botonesHTML}
      </div>
    </div>
  `;
}

/**
 * Renderiza todos los servicios en el grid
 * @param {Array} servicios - Lista de servicios a mostrar
 */
function renderizarServicios(servicios) {
  const grid = document.getElementById('services-grid');
  if (!grid) return;

  grid.innerHTML = servicios.map((servicio, index) => `
    <div class="service-card" data-servicio-id="${servicio.id}" style="animation-delay: ${index * 0.1}s">
      <div class="service-card-header">
        <h3 class="service-name">${servicio.nombre}</h3>
        <span class="service-price">$${servicio.precio.toLocaleString()}</span>
      </div>
      <p class="service-description">${servicio.descripcion}</p>
      <label class="service-checkbox">
        <input type="checkbox" id="servicio-${servicio.id}" data-servicio-id="${servicio.id}">
        <span>Seleccionar servicio</span>
      </label>
      ${generarOpcionesHTML(servicio)}
    </div>
  `).join('');

  // Agregar event listeners después de renderizar
  agregarEventListenersServicios();
}

/**
 * Agrega los event listeners a los servicios
 */
function agregarEventListenersServicios() {
  // Event listeners para checkboxes
  document.querySelectorAll('.service-card input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', manejarSeleccionServicio);
  });

  // Event listeners para tarjetas (click en cualquier parte)
  document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('click', (e) => {
      // No hacer nada si se hizo click en un botón de opción o en el checkbox directamente
      if (e.target.classList.contains('option-btn') || e.target.type === 'checkbox') {
        return;
      }
      const checkbox = card.querySelector('input[type="checkbox"]');
      if (checkbox) {
        checkbox.checked = !checkbox.checked;
        checkbox.dispatchEvent(new Event('change'));
      }
    });
  });

  // Event listeners para botones de opciones
  document.querySelectorAll('.option-btn').forEach(btn => {
    btn.addEventListener('click', manejarCambioOpcion);
  });
}

/**
 * Maneja la selección/deselección de un servicio
 * @param {Event} e - Evento del checkbox
 */
function manejarSeleccionServicio(e) {
  const checkbox = e.target;
  const servicioId = parseInt(checkbox.dataset.servicioId);
  const card = checkbox.closest('.service-card');

  if (checkbox.checked) {
    card.classList.add('selected');
    agregarServicioAlPresupuesto(servicioId);
  } else {
    card.classList.remove('selected');
    removerServicioDelPresupuesto(servicioId);
  }
}

/**
 * Maneja el cambio de opción en un servicio
 * @param {Event} e - Evento del botón
 */
function manejarCambioOpcion(e) {
  e.stopPropagation();
  const btn = e.target;
  const servicioId = parseInt(btn.dataset.servicioId);
  const opcionIndex = parseInt(btn.dataset.opcionIndex);

  // Actualizar botones activos
  const container = btn.closest('.options-buttons');
  container.querySelectorAll('.option-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  // Actualizar el presupuesto si el servicio está seleccionado
  actualizarOpcionServicio(servicioId, opcionIndex);
}

/**
 * Obtiene un servicio por su ID
 * @param {number} id - ID del servicio
 * @returns {Object|null} Servicio encontrado o null
 */
function obtenerServicioPorId(id) {
  return serviciosDisponibles.find(s => s.id === id) || null;
}

/**
 * Obtiene todos los servicios disponibles
 * @returns {Array} Lista de servicios
 */
function obtenerTodosLosServicios() {
  return serviciosDisponibles;
}

// Exportar funciones para uso en otros módulos
window.ServicesModule = {
  cargarServicios,
  renderizarServicios,
  obtenerServicioPorId,
  obtenerTodosLosServicios
};
