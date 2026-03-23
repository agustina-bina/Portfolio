/**
 * Módulo de cálculo
 * Maneja la lógica de cálculo del presupuesto
 */

// Estado del presupuesto
let presupuestoActual = {
  servicios: [],
  subtotal: 0,
  impuestos: 0,
  total: 0
};

// Tasa de impuestos (10%)
const TASA_IMPUESTOS = 0.10;

/**
 * Agrega un servicio al presupuesto
 * @param {number} servicioId - ID del servicio a agregar
 */
function agregarServicioAlPresupuesto(servicioId) {
  const servicio = window.ServicesModule.obtenerServicioPorId(servicioId);
  if (!servicio) return;

  // Verificar si ya está en el presupuesto
  const existente = presupuestoActual.servicios.find(s => s.id === servicioId);
  if (existente) return;

  // Agregar con opción por defecto (índice 0)
  const nuevoItem = {
    id: servicio.id,
    nombre: servicio.nombre,
    precioBase: servicio.precio,
    tieneOpciones: servicio.tieneOpciones,
    opcionSeleccionada: 0,
    opcionEtiqueta: servicio.tieneOpciones ? servicio.opciones.etiquetas[0] : null,
    multiplicador: servicio.tieneOpciones ? servicio.opciones.multiplicadores[0] : 1,
    precioFinal: servicio.precio * (servicio.tieneOpciones ? servicio.opciones.multiplicadores[0] : 1)
  };

  presupuestoActual.servicios.push(nuevoItem);
  recalcularTotales();
  actualizarVistaResumen();
}

/**
 * Remueve un servicio del presupuesto
 * @param {number} servicioId - ID del servicio a remover
 */
function removerServicioDelPresupuesto(servicioId) {
  presupuestoActual.servicios = presupuestoActual.servicios.filter(s => s.id !== servicioId);
  recalcularTotales();
  actualizarVistaResumen();
}

/**
 * Actualiza la opción seleccionada de un servicio
 * @param {number} servicioId - ID del servicio
 * @param {number} opcionIndex - Índice de la opción seleccionada
 */
function actualizarOpcionServicio(servicioId, opcionIndex) {
  const itemPresupuesto = presupuestoActual.servicios.find(s => s.id === servicioId);
  if (!itemPresupuesto) return;

  const servicio = window.ServicesModule.obtenerServicioPorId(servicioId);
  if (!servicio || !servicio.tieneOpciones) return;

  itemPresupuesto.opcionSeleccionada = opcionIndex;
  itemPresupuesto.opcionEtiqueta = servicio.opciones.etiquetas[opcionIndex];
  itemPresupuesto.multiplicador = servicio.opciones.multiplicadores[opcionIndex];
  itemPresupuesto.precioFinal = servicio.precio * servicio.opciones.multiplicadores[opcionIndex];

  recalcularTotales();
  actualizarVistaResumen();
}

/**
 * Recalcula los totales del presupuesto
 */
function recalcularTotales() {
  presupuestoActual.subtotal = presupuestoActual.servicios.reduce(
    (total, servicio) => total + servicio.precioFinal, 
    0
  );
  presupuestoActual.impuestos = presupuestoActual.subtotal * TASA_IMPUESTOS;
  presupuestoActual.total = presupuestoActual.subtotal + presupuestoActual.impuestos;
}

/**
 * Actualiza la vista del resumen
 */
function actualizarVistaResumen() {
  const itemsContainer = document.getElementById('summary-items');
  const emptyState = document.getElementById('summary-empty');
  const totalsContainer = document.getElementById('summary-totals');
  const generateBtn = document.getElementById('generate-btn');

  if (presupuestoActual.servicios.length === 0) {
    // Mostrar estado vacío
    if (itemsContainer) itemsContainer.style.display = 'none';
    if (emptyState) emptyState.style.display = 'block';
    if (totalsContainer) totalsContainer.style.display = 'none';
    if (generateBtn) generateBtn.disabled = true;
    return;
  }

  // Ocultar estado vacío
  if (emptyState) emptyState.style.display = 'none';
  if (itemsContainer) itemsContainer.style.display = 'block';
  if (totalsContainer) totalsContainer.style.display = 'block';
  if (generateBtn) generateBtn.disabled = false;

  // Renderizar items
  if (itemsContainer) {
    itemsContainer.innerHTML = presupuestoActual.servicios.map(servicio => `
      <div class="summary-item">
        <div>
          <div class="summary-item-name">${servicio.nombre}</div>
          ${servicio.opcionEtiqueta ? `<div class="summary-item-option">${servicio.opcionEtiqueta}</div>` : ''}
        </div>
        <div class="summary-item-price">$${servicio.precioFinal.toLocaleString()}</div>
      </div>
    `).join('');
  }

  // Actualizar totales
  document.getElementById('subtotal-value').textContent = `$${presupuestoActual.subtotal.toLocaleString()}`;
  document.getElementById('tax-value').textContent = `$${presupuestoActual.impuestos.toLocaleString()}`;
  document.getElementById('total-value').textContent = `$${presupuestoActual.total.toLocaleString()}`;
}

/**
 * Obtiene el presupuesto actual
 * @returns {Object} Estado actual del presupuesto
 */
function obtenerPresupuestoActual() {
  return { ...presupuestoActual };
}

/**
 * Reinicia el presupuesto
 */
function reiniciarPresupuesto() {
  presupuestoActual = {
    servicios: [],
    subtotal: 0,
    impuestos: 0,
    total: 0
  };

  // Desmarcar todos los checkboxes
  document.querySelectorAll('.service-card input[type="checkbox"]').forEach(checkbox => {
    checkbox.checked = false;
  });

  // Remover clase selected de todas las tarjetas
  document.querySelectorAll('.service-card').forEach(card => {
    card.classList.remove('selected');
  });

  // Resetear opciones a la primera opción
  document.querySelectorAll('.options-buttons').forEach(container => {
    container.querySelectorAll('.option-btn').forEach((btn, index) => {
      btn.classList.toggle('active', index === 0);
    });
  });

  actualizarVistaResumen();
}

/**
 * Genera el número de presupuesto
 * @returns {string} Número de presupuesto formateado
 */
function generarNumeroPresupuesto() {
  const fecha = new Date();
  const year = fecha.getFullYear();
  const month = String(fecha.getMonth() + 1).padStart(2, '0');
  const random = Math.floor(Math.random() * 9000) + 1000;
  return `QB-${year}${month}-${random}`;
}

/**
 * Obtiene la fecha actual formateada
 * @returns {string} Fecha formateada
 */
function obtenerFechaActual() {
  const opciones = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date().toLocaleDateString('es-ES', opciones);
}

// Exportar funciones para uso en otros módulos
window.CalculatorModule = {
  agregarServicioAlPresupuesto,
  removerServicioDelPresupuesto,
  actualizarOpcionServicio,
  obtenerPresupuestoActual,
  reiniciarPresupuesto,
  generarNumeroPresupuesto,
  obtenerFechaActual
};

// Hacer disponibles globalmente las funciones que necesita services.js
window.agregarServicioAlPresupuesto = agregarServicioAlPresupuesto;
window.removerServicioDelPresupuesto = removerServicioDelPresupuesto;
window.actualizarOpcionServicio = actualizarOpcionServicio;
