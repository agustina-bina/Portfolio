/**
 * Módulo principal
 * Control general de la aplicación
 */

// Elementos del DOM
let modal;
let modalOverlay;

/**
 * Inicializa la aplicación
 */
async function inicializarApp() {
  console.log('Iniciando QuoteBuilder...');
  
  // Obtener referencias al modal
  modalOverlay = document.getElementById('modal-overlay');
  modal = document.getElementById('quote-modal');
  
  // Cargar y renderizar servicios
  const servicios = await window.ServicesModule.cargarServicios();
  window.ServicesModule.renderizarServicios(servicios);
  
  // Configurar event listeners
  configurarEventListeners();
  
  console.log('QuoteBuilder inicializado correctamente');
}

/**
 * Configura los event listeners principales
 */
function configurarEventListeners() {
  // Botón generar presupuesto
  const generateBtn = document.getElementById('generate-btn');
  if (generateBtn) {
    generateBtn.addEventListener('click', generarPresupuesto);
  }

  // Cerrar modal con el botón X
  const closeBtn = document.getElementById('modal-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', cerrarModal);
  }

  // Cerrar modal haciendo click fuera
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        cerrarModal();
      }
    });
  }

  // Botón nuevo presupuesto
  const newQuoteBtn = document.getElementById('new-quote-btn');
  if (newQuoteBtn) {
    newQuoteBtn.addEventListener('click', () => {
      cerrarModal();
      window.CalculatorModule.reiniciarPresupuesto();
    });
  }

  // Botón imprimir
  const printBtn = document.getElementById('print-btn');
  if (printBtn) {
    printBtn.addEventListener('click', imprimirPresupuesto);
  }

  // Cerrar modal con tecla Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('active')) {
      cerrarModal();
    }
  });
}

/**
 * Genera y muestra el presupuesto final
 */
function generarPresupuesto() {
  const presupuesto = window.CalculatorModule.obtenerPresupuestoActual();
  
  if (presupuesto.servicios.length === 0) {
    alert('Por favor, selecciona al menos un servicio.');
    return;
  }

  // Generar datos del presupuesto
  const numeroPresupuesto = window.CalculatorModule.generarNumeroPresupuesto();
  const fechaPresupuesto = window.CalculatorModule.obtenerFechaActual();

  // Actualizar información del presupuesto en el modal
  document.getElementById('quote-number').textContent = numeroPresupuesto;
  document.getElementById('quote-date').textContent = fechaPresupuesto;

  // Renderizar servicios en el modal
  const servicesContainer = document.getElementById('quote-services');
  servicesContainer.innerHTML = presupuesto.servicios.map(servicio => `
    <div class="quote-service-item">
      <div>
        <div class="quote-service-name">${servicio.nombre}</div>
        ${servicio.opcionEtiqueta ? `<div class="quote-service-option">${servicio.opcionEtiqueta}</div>` : ''}
      </div>
      <div class="quote-service-price">$${servicio.precioFinal.toLocaleString()}</div>
    </div>
  `).join('');

  // Actualizar totales en el modal
  document.getElementById('quote-subtotal').textContent = `$${presupuesto.subtotal.toLocaleString()}`;
  document.getElementById('quote-tax').textContent = `$${presupuesto.impuestos.toLocaleString()}`;
  document.getElementById('quote-total').textContent = `$${presupuesto.total.toLocaleString()}`;

  // Mostrar modal
  abrirModal();
}

/**
 * Abre el modal del presupuesto
 */
function abrirModal() {
  if (modalOverlay) {
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

/**
 * Cierra el modal del presupuesto
 */
function cerrarModal() {
  if (modalOverlay) {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }
}

/**
 * Imprime el presupuesto
 */
function imprimirPresupuesto() {
  window.print();
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', inicializarApp);
